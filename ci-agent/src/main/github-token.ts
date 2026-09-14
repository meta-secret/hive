import { err, ok, type Result } from "neverthrow";
import { CiFailureKind, type CiFailure } from "./failure.js";

export class GitHubTokenEnvironment {
  constructor(private readonly environment: NodeJS.ProcessEnv) {}
  resolve(): Result<string, CiFailure> {
    const token =
      this.environment.HIVE_GITHUB_PAT?.trim() ||
      this.environment.GITHUB_TOKEN?.trim() ||
      this.environment.GH_TOKEN?.trim();
    if (!token)
      return err({
        kind: CiFailureKind.Github,
        message: "HIVE_GITHUB_PAT, GITHUB_TOKEN, or GH_TOKEN is required",
      });
    return ok(token);
  }
}
