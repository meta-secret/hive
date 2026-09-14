You are applying bounded Rust dependency updates in the standalone Hive
repository.

## Context

- Repository: ${GITHUB_REPOSITORY}
- Dependency workflow run: ${GITHUB_RUN_ID}
- Fix branch: `${FIX_BRANCH}`

Use only this trusted dependency inventory:

```text
${RUST_DEPS_OUTDATED_REPORT}
```

Read `AGENTS.md` and `docs/architecture.md`. Update direct dependencies under
the root Cargo workspace, `worker/`, and `vendor/`, including only required Rust
compatibility changes and focused tests. Preserve standard crates.io sources;
do not introduce Git dependencies.

The editor has no Git, credentials, validation, containers, or network access.
Do not change workflows, Taskfiles, Dockerfiles, manifests, documentation, or
unrelated source. The trusted host validates the admitted change set and runs
`task check` before publication. Never include secrets, credentials, private
data, or raw logs.
