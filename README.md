# Hive

Hive is a standalone, stateful AI-agent platform. Disposable workers run one
Codex task at a time in Kata-isolated Kubernetes pods while Neo4j owns the
durable task graph, leases, attempts, and results. The read-only Control Center
provides an operator view of that graph.

It intentionally contains only Hive platform code and no credentials.

## Layout

- `worker/` — Rust worker, coordinator, dispatcher, observer, and lifecycle
  binaries plus behavior tests.
- `console/` — Svelte/Bun Control Center and Playwright journeys.
- `ci-agent/` — TypeScript automation for bounded CI repair, implementation,
  review, and pull-request readiness workflows.
- `infra/kubernetes/` — Hive deployments, policies, and RBAC.
- `infra/controller/` — lifecycle/reaper manifest generation and contracts.
- `docs/architecture.md` — detailed platform and trust-boundary design.

## Development

Required tools are Rust 1.97, Bun 1.3.14, Node.js 22.13 or newer, and
optionally Task 3.52.

```sh
task check
task test
task console:check
task console:build
task ci-agent:check
task ci-agent:test
```

Neo4j integration tests additionally require `HIVE_NEO4J_TEST_URI`,
`HIVE_NEO4J_TEST_USERNAME`, and `HIVE_NEO4J_TEST_PASSWORD`. CI starts a pinned
Neo4j service automatically. Build the production worker image with
`docker build -f worker/Dockerfile -t hive:local .`.

The CI agent is private repository tooling rather than a published package.
Install it with `task ci-agent:install` and invoke commands with
`node ci-agent/dist/main/main.js <command>`. Its authenticated operations use
`HIVE_GITHUB_PAT` (or `GITHUB_TOKEN`/`GH_TOKEN`) and its Cursor-backed commands
require `CURSOR_API_KEY`; never persist those values in the repository or logs.

Supported commands are `agent` and `fix` for CI repair, `plan` for producing a
validated plan, `implement` for edit-and-deliver, `edit` and `deliver` for the
split implementation phases, `pr-preflight` and `pr-ready` for PR audits, and
`pr-review` and `pr-review-stabilize` for exact-head review operations. The
agent automatically selects the repository prompt for each command. Set
`CI_AGENT_PROMPT_FILE` only to intentionally override that default. Planning and
implementation require `AGENT_PROMPT`; implementation also requires the
hash-bound `.hive-workbench-plan.md` metadata documented in the workflow
environment. `GITHUB_REPOSITORY`, `GITHUB_RUN_ID`, and `REPO_ROOT` identify the
target checkout. Authentication uses one precedence order everywhere:
`HIVE_GITHUB_PAT`, then `GITHUB_TOKEN`, then `GH_TOKEN`.

## Deployment

Manifests contain environment-specific references. Pin images by digest and
review namespaces, storage, network policy, runtime class, and secret names
before applying them. Never commit Codex, GitHub, Neo4j, registry, or cluster
credentials.

Hive is currently operationally paused. See the architecture document for the
single-incident/single-repair invariant required before enabling replicas.

## License

MIT; see [LICENSE](LICENSE).
