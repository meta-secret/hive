# Hive Agent Guide

Read `docs/architecture.md` before changing runtime, identity, storage,
delivery, or deployment behavior.

- Preserve the worker/coordinator credential boundary and Neo4j as the only
  durable task store.
- Treat weakened authentication, authorization, sandboxing, secret handling,
  or graph-storage boundaries as release blockers.
- Never persist plaintext credentials or sensitive agent output in logs.
- Keep workers disposable: one pod handles at most one task.
- Add behavior-focused Rust tests for domain changes and focused web tests for
  operator-flow changes.
- Keep user-visible console text in the shared locale catalogs.
- Keep repository automation in `ci-agent/` standalone: use Hive root paths,
  `HIVE_*` environment names, and behavior-focused Node tests for changed
  automation.
- Preserve CI-agent credential isolation, authenticated publication, exact-head
  review, and change-budget boundaries.
- Document schema, storage, deployment, and credential migrations.
- CI and manifests must retain least privilege.
