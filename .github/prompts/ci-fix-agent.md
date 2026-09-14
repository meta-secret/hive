You are repairing a failed CI run for the standalone Hive repository.

## Context

- Repository: ${GITHUB_REPOSITORY}
- Failed workflow run: ${GITHUB_RUN_ID}
- Fix branch: `${FIX_BRANCH}`

Read `AGENTS.md` and `docs/architecture.md` before changing code. Inspect the
failed run, identify the smallest root-cause fix, and preserve Hive's worker
isolation, credential, Neo4j storage, and deployment boundaries. Keep changes
within this repository and add focused behavior tests for changed logic.

Do not weaken authentication, sandboxing, network policy, secret handling, or
exact-head publication checks. Do not persist credentials or sensitive agent
output. Do not create or merge pull requests; the trusted host owns commit and
publication after the editor exits.
