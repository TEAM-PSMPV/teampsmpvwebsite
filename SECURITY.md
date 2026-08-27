# Security policy

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Email `support@teampsmpv.com` with the subject `Security: teampsmpvwebsite` and include the affected URL, reproduction steps, impact, and any suggested remediation.

We aim to acknowledge reports within 3 business days and provide a status update within 10 business days. Please allow a reasonable remediation period before disclosure. Good-faith research that avoids privacy violations, service disruption, data destruction, and social engineering is welcome.

## Supported versions

Only the code currently deployed from the `main` branch is supported. Dependencies are monitored through Dependabot and CI.

## Secrets

Never commit API tokens, account IDs, `.env*`, `.dev.vars*`, Wrangler state, or `.openai/`. Use GitHub Actions secrets for deployment credentials and local untracked environment files for development.
