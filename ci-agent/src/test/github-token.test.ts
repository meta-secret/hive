import assert from "node:assert/strict";
import test from "node:test";

import { GitHubTokenEnvironment } from "../main/github-token.js";
import { CiResultAssertions } from "./result-assertions.js";

void test("GitHub authentication uses one documented fallback order", () => {
  assert.equal(
    CiResultAssertions.assertSuccess(
      new GitHubTokenEnvironment({
        GH_TOKEN: " gh ",
        GITHUB_TOKEN: " actions ",
        HIVE_GITHUB_PAT: " hive ",
      }).resolve(),
    ),
    "hive",
  );
  assert.equal(
    CiResultAssertions.assertSuccess(
      new GitHubTokenEnvironment({
        GH_TOKEN: "gh",
        GITHUB_TOKEN: "actions",
      }).resolve(),
    ),
    "actions",
  );
  assert.equal(
    CiResultAssertions.assertSuccess(
      new GitHubTokenEnvironment({ GH_TOKEN: "gh" }).resolve(),
    ),
    "gh",
  );
  CiResultAssertions.assertFailure(
    new GitHubTokenEnvironment({}).resolve(),
    /is required/,
  );
});
