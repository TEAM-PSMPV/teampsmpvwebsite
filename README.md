# TEAM-PSMPV Website

[![CI](https://github.com/TEAM-PSMPV/teampsmpvwebsite/actions/workflows/ci.yml/badge.svg)](https://github.com/TEAM-PSMPV/teampsmpvwebsite/actions/workflows/ci.yml)
[![Deploy](https://github.com/TEAM-PSMPV/teampsmpvwebsite/actions/workflows/deploy-cloudflare.yml/badge.svg)](https://github.com/TEAM-PSMPV/teampsmpvwebsite/actions/workflows/deploy-cloudflare.yml)

Production: [teampsmpv.com](https://www.teampsmpv.com/)

A responsive, multi-route TEAM-PSMPV website built with React, TypeScript, the Next.js App Router, Vinext, Motion and Zod.

## Included routes

- `/`: company positioning, services, workflow, metrics, OfflineTTS and FAQ
- `/services`: interactive seven-service capability catalog
- `/about-us`: PSMPV name system and founder profile
- `/case-study`: approved under-development work status
- `/products`: active products catalog
- `/products/offlinetts`: OfflineTTS product page
- `/products/offlinetts/privacy-policy`: complete public privacy policy
- `/products/offlinetts/support`: support and troubleshooting
- `/contact-us`: validated project brief form
- `/api/contact`: Edge-compatible validation endpoint that prepares an email draft
- `/sitemap.xml` and `/robots.txt`

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The development server prints the local URL.

New contributors should start with [INSTRUCTIONS.md](INSTRUCTIONS.md). Project architecture and contribution rules are documented in [ARCHITECTURE.md](ARCHITECTURE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Production validation

```bash
npm run build
npm run validate:artifact
```

The build emits a Cloudflare-compatible ESM Worker under `dist/`.

## Deploy to Cloudflare

This is a dynamic Worker deployment, not a static drag-and-drop Pages upload. That is required for the validated `/api/contact` route and server-rendered route output.

1. Install Node.js 22.13 or newer and extract this project.
2. Open a terminal in the extracted directory.
3. Run `npm install`.
4. Authenticate once with `npx wrangler login`.
5. Run `npm run deploy:cloudflare`.
6. The Wrangler configuration attaches `teampsmpv.com` and `www.teampsmpv.com` as custom domains.

For CI, set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, then run `npm ci && npm run deploy:cloudflare`.

## Contact form behaviour

No third-party email provider credentials were supplied. The Edge endpoint therefore validates the form, rejects its honeypot field and creates a pre-filled message addressed to `support@teampsmpv.com`; the visitor reviews and sends that message in their own email app. This avoids falsely claiming that an enquiry was delivered to an unconfigured provider.

To add direct server-side delivery later, connect an approved transactional email or CRM adapter inside `app/api/contact/route.ts` and update the privacy disclosure before launch.

## Brand assets

The project uses the supplied monochrome TEAM-PSMPV wordmark, lockup, monogram, favicon and founder photograph. Do not recolor or distort the official logo files.

## Security and license

Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md). This repository is proprietary; see [LICENSE.md](LICENSE.md).
