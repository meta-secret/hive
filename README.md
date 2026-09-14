# Hive

Hive is a standalone, stateful AI-agent platform. Disposable workers run one
Codex task at a time in Kata-isolated Kubernetes pods while Neo4j owns the
durable task graph, leases, attempts, and results. The read-only Control Center
provides an operator view of that graph.

This repository was extracted from `meta-secret/nook`; it intentionally
contains no Nook application code or credentials.

## Layout

- `worker/` — Rust worker, coordinator, dispatcher, observer, and lifecycle
  binaries plus behavior tests.
- `console/` — Svelte/Bun Control Center and Playwright journeys.
- `infra/kubernetes/` — Hive deployments, policies, and RBAC.
- `infra/controller/` — lifecycle/reaper manifest generation and contracts.
- `docs/architecture.md` — detailed platform and trust-boundary design.

## Development

Required tools are Rust 1.97, Bun 1.3.14, and optionally Task 3.52.

```sh
task check
task test
task console:check
task console:build
```

Neo4j integration tests additionally require `HIVE_NEO4J_TEST_URI`,
`HIVE_NEO4J_TEST_USERNAME`, and `HIVE_NEO4J_TEST_PASSWORD`. CI starts a pinned
Neo4j service automatically. Build the production worker image with
`docker build -f worker/Dockerfile -t hive:local .`.

## Deployment

Manifests contain environment-specific references. Pin images by digest and
review namespaces, storage, network policy, runtime class, and secret names
before applying them. Never commit Codex, GitHub, Neo4j, registry, or cluster
credentials.

Hive is currently operationally paused. See the architecture document for the
single-incident/single-repair invariant required before enabling replicas.

## License

MIT; see [LICENSE](LICENSE).
