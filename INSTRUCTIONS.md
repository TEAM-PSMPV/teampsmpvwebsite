# Beginner developer instructions

This guide takes you from a new computer to a reviewed production deployment.

## 1. Install the tools

Install Git and Node.js 22.13 or newer. On Windows, use Git for Windows and either the official Node.js installer or a Node version manager. Confirm both tools:

```bash
git --version
node --version
npm --version
```

Create a GitHub account, enable two-factor authentication, and ask a TEAM-PSMPV administrator for repository access. Never share tokens in chat, issues, screenshots, or commits.

## 2. Download the project

```bash
git clone https://github.com/TEAM-PSMPV/teampsmpvwebsite.git
cd teampsmpvwebsite
npm ci
```

`npm ci` installs the exact dependency versions in `package-lock.json`. If it fails, verify the Node.js version and retry from a normal terminal with internet access.

## 3. Run locally

```bash
npm run dev
```

Open the URL printed in the terminal, normally `http://localhost:3000`. Stop the server with Ctrl+C. Source pages are under `app/`, reusable UI is under `app/components/`, and static images are under `public/`.

## 4. Make a safe change

Start from an up-to-date branch:

```bash
git switch main
git pull --ff-only
git switch -c feature/describe-your-change
```

Edit only the files needed. Check your work often:

```bash
git status
git diff
npm run lint
npm test
```

The test command performs a production build and rendered HTML checks. Do not add `.env`, `.dev.vars`, `.openai`, `dist`, `.next`, `node_modules`, account IDs, or API tokens.

## 5. Commit and open a pull request

```bash
git add path/to/changed-file
git commit -m "feat: briefly describe the change"
git push -u origin feature/describe-your-change
```

On GitHub, select **Compare & pull request**, complete the template, attach screenshots for visual changes, and request review. Address feedback with new commits. Do not force-push a branch another person is using.

## 6. Production deployment

Merging to `main` triggers `.github/workflows/deploy-cloudflare.yml`. The workflow installs locked dependencies, runs lint and tests, then deploys the `team-psmpv` Worker to `teampsmpv.com` and `www.teampsmpv.com`.

Repository administrators must create GitHub Actions secrets named `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The token should have only the permissions Wrangler needs for this Worker and its routes. Never place either value in source code.

To deploy manually from GitHub, open **Actions → Deploy to Cloudflare → Run workflow**. To deploy locally as an authorized maintainer:

```bash
npx wrangler login
npx wrangler whoami
npm run deploy:cloudflare
```

After deployment, check the home page, navigation, contact form, privacy policy, `sitemap.xml`, and `robots.txt`. See [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md) for the full checklist and rollback guidance.

## 7. Common problems

- Wrong Node version: install Node.js 22.13+ and reopen the terminal.
- Dependency errors: do not delete `package-lock.json`; run `npm ci`.
- Port already used: stop the other development server or follow Vite's alternate URL.
- CI fails: open the failed GitHub Actions job, expand the failing step, reproduce its command locally, then push a fix.
- Deployment authentication fails: ask an administrator to rotate or correct the GitHub Actions secrets; never print their values.
