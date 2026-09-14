You are planning an implementation task for the standalone Hive repository.

## Task

${AGENT_TASK}

## Major-change authorization

Trusted authorization: `${MAJOR_CHANGE_AUTHORIZATION}`.

Read `AGENTS.md` and `docs/architecture.md`. Create
`.hive-workbench-plan.md` containing a bounded implementation plan, affected
paths, trust-boundary impact, focused tests, and acceptance evidence. A new
runtime, storage model, protocol, security boundary, or execution model requires
the trusted authorization value `authorized`; otherwise record the decision
needed in `.hive-workbench-worklog.md` and stop.

Do not change implementation files, run tests, use credentials, or publish Git
state during planning. Do not include the source prompt, secrets, private data,
raw logs, or host-specific paths in either artifact.
