import { CiResultAssertions } from "./result-assertions.js";
import assert from "node:assert/strict";
import test from "node:test";

import { Octokit } from "@octokit/rest";

import {
  GitHubClient,
  PullRequestCheckSelection,
  PullRequestWorkflowSelection,
} from "../main/github.js";

const repoRef = { owner: "meta-secret", repo: "hive" };

void test("requiredPrCheckNames maps changed paths to repository-owned gates", () => {
  assert.deepEqual(
    new PullRequestCheckSelection(["README.md"]).names(),
    [],
  );
  assert.deepEqual(
    new PullRequestCheckSelection([
      "worker/src/lib.rs",
    ]).names(),
    ["CI"],
  );
  assert.deepEqual(
    new PullRequestCheckSelection([
      "worker/Cargo.toml",
    ]).names(),
    ["CI"],
  );
  assert.deepEqual(
    new PullRequestCheckSelection(["Cargo.lock"]).names(),
    ["CI"],
  );
  assert.deepEqual(
    new PullRequestCheckSelection([
      "console/src/App.svelte",
    ]).names(),
    ["CI"],
  );
  assert.deepEqual(
    new PullRequestCheckSelection([
      "worker/src/lib.rs",
      "console/src/App.svelte",
    ]).names(),
    ["CI"],
  );
  assert.deepEqual(
    new PullRequestWorkflowSelection([
      "worker/src/lib.rs",
    ]).names(),
    [
      {
        checkName: "CI",
        requiredJobs: ["Worker", "Console", "CI agent"],
        workflowFile: "ci.yml",
        workflowName: "CI",
      },
    ],
  );
});
void test("central CI requires every repository job for product changes", () => {
  const console = "console/src/App.svelte";
  assert.deepEqual(
    new PullRequestWorkflowSelection([console]).names()[0]?.requiredJobs,
    ["Worker", "Console", "CI agent"],
  );
  const mixed = new PullRequestWorkflowSelection([
    console,
    "worker/src/lib.rs",
  ]).names();
  assert.equal(mixed.length, 1);
  assert.equal(mixed[0]?.requiredJobs?.length, 3);
  assert.ok(mixed[0]?.requiredJobs?.includes("CI agent"));
});

void test("createFixPr leaves the PR body free of automatic merge control markers", async () => {
  let createdBody = "";
  let createdBase = "";
  const octokit = Object.assign(new Octokit(), {
    rest: {
      pulls: {
        create: async ({ base, body }: { base: string; body: string }) => {
          createdBase = base;
          createdBody = body;
          return { data: { number: 347 } };
        },
      },
    },
  });

  const priorBody = process.env.AGENT_PR_BODY;
  process.env.AGENT_PR_BODY = "## Summary\n\nOpen this PR for review.";
  try {
    const prNumber = await new GitHubClient(octokit)
      .createFixPr({
        repoRef: repoRef,
        headBranch: "agent/fix",
        runId: "run-42",
        fixLabel: "focused issue",
        baseBranch: "codex/predecessor",
      })
      .then(CiResultAssertions.assertSuccess);
    assert.equal(prNumber, 347);
    assert.equal(createdBase, "codex/predecessor");
    assert.equal(createdBody, "## Summary\n\nOpen this PR for review.");
    assert.doesNotMatch(
      createdBody,
      /hive-agent-managed|hive-agent-monitor-wake/,
    );
  } finally {
    if (!priorBody) {
      delete process.env.AGENT_PR_BODY;
    } else {
      process.env.AGENT_PR_BODY = priorBody;
    }
  }
});
