# Contributing

Thank you for improving the TEAM-PSMPV website. By contributing, you agree that your work may be used under the repository's license.

## Workflow

1. Read [INSTRUCTIONS.md](INSTRUCTIONS.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
2. Create a branch from the latest `main`: `feature/short-description`, `fix/short-description`, or `docs/short-description`.
3. Keep changes focused. Do not commit secrets, build output, or local tooling state.
4. Run `npm ci`, `npm run lint`, and `npm test`.
5. Open a pull request using the template and link its issue when applicable.
6. Obtain review from a code owner and wait for required checks before merging.

Use Conventional Commit-style subjects where practical, such as `feat: add service filter` or `fix: validate contact payload`. Include tests for behavioral changes and update documentation when commands, configuration, routes, or deployment behavior change.

For security issues, follow [SECURITY.md](SECURITY.md) instead of opening an issue.
