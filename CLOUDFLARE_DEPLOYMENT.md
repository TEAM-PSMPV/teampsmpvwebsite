# Cloudflare deployment checklist

## First deployment

```bash
npm install
npx wrangler login
npm run deploy:cloudflare
```

The deployment command builds the Vinext application and publishes it as a Cloudflare Worker named `team-psmpv`.

## Clean redeployment with Wrangler

From PowerShell in the project directory:

```powershell
Remove-Item -Recurse -Force node_modules, dist -ErrorAction SilentlyContinue
npm ci
npx wrangler login
npx wrangler whoami
npm run build
npx wrangler deploy
npx wrangler deployments list --name team-psmpv
```

`npm run build` creates the validated Worker and static assets in `dist/`.
`npx wrangler deploy` then publishes that exact build using `wrangler.jsonc` to
the existing Worker named `team-psmpv`.

If Wrangler is already authenticated to the correct Cloudflare account, skip
`npx wrangler login` but keep `npx wrangler whoami` as the account check.

## Connect the domain

1. Open Cloudflare Dashboard.
2. Open **Workers & Pages** and select `team-psmpv`.
3. Open **Settings → Domains & Routes**.
4. Confirm `teampsmpv.com` and `www.teampsmpv.com` are attached. They are declared as custom domains in `wrangler.jsonc`.
5. Confirm that `/`, `/services`, `/about-us`, `/case-study`, `/products`, `/products/offlinetts`, `/contact-us`, `/sitemap.xml` and `/robots.txt` load.

## Pre-launch checks

- Confirm `support@teampsmpv.com` receives mail.
- Confirm the WhatsApp number `+91 8218501002` is active.
- Review the OfflineTTS privacy policy before every app release.
- Test navigation at 1440px, 768px and 390px widths.
- Test the mobile menu, service filters, FAQ and contact form using a keyboard.
- Verify the custom domain, HTTPS and canonical URLs.

## Automated deployment

Set the following protected CI variables:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Then use:

```bash
npm ci
npm run deploy:cloudflare
```

The repository workflow `.github/workflows/deploy-cloudflare.yml` performs linting, tests, artifact validation, and deployment on every push to `main`, and can also be started manually. It reads `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from GitHub Actions secrets and never writes them to the repository.

## Roll back

If a production release is unhealthy, open the Cloudflare dashboard, select the `team-psmpv` Worker, open **Deployments**, choose the last known-good version, and roll back. Then revert the faulty Git commit through a reviewed pull request so the next deployment does not reintroduce it. Verify both custom domains after rollback.
