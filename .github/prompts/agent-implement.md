You are implementing a bounded task in the standalone Hive repository.

## Task

${AGENT_TASK}

## Trusted validated plan

${VALIDATED_PLAN}

## Context

- Repository: ${GITHUB_REPOSITORY}
- Workflow run: ${GITHUB_RUN_ID}
- Implementation branch: `${AGENT_BRANCH}`

Read `.hive-workbench-plan.md`, `AGENTS.md`, and `docs/architecture.md` before
editing. Implement only the validated plan. Preserve worker isolation,
credential separation, Neo4j durability, least-privilege manifests, and
exact-head publication boundaries. Add focused Rust or TypeScript tests for
changed behavior and keep console text in locale catalogs.

The bounded editor must not run Git, tests, Task, containers, or network tools.
It must not create or merge a pull request. The trusted host formats, validates,
commits, and publishes after the editor exits. Finish by writing
`.hive-workbench-worklog.md` with concise Outcome, Progress, Problems,
Decisions, Validation, and Remaining work sections. Never include secrets,
credentials, private data, prompts, transcripts, or raw logs.
