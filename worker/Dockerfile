# syntax=docker/dockerfile:1.7
FROM rust:1.97-trixie AS builder
WORKDIR /build
COPY Cargo.toml Cargo.lock ./
COPY vendor vendor
COPY worker/Cargo.toml worker/Cargo.toml
RUN mkdir -p worker/src/bin \
    && printf 'fn main() {}\n' > worker/src/main.rs \
    && touch worker/src/lib.rs worker/src/bin/export_observer_contract.rs \
    && cargo build --locked --release -p hive
COPY worker/src worker/src
RUN touch worker/src/main.rs worker/src/lib.rs \
    && cargo build --locked --release -p hive

FROM debian:trixie-slim
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      bubblewrap ca-certificates git gh openssh-client ripgrep \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /build/target/release/hive /usr/local/bin/hive
USER 65532:65532
ENTRYPOINT ["/usr/local/bin/hive"]
