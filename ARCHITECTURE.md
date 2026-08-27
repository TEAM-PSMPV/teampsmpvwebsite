# Architecture

The website uses Next.js App Router conventions with React and TypeScript, built by Vinext/Vite into a Cloudflare Worker.

## Runtime flow

1. Cloudflare routes `teampsmpv.com` and `www.teampsmpv.com` to the `team-psmpv` Worker.
2. `worker/index.ts` handles the Worker entry point and serves built assets through the `ASSETS` binding.
3. Routes and layouts live in `app/`; interactive client behavior is isolated in `app/components/`.
4. The contact API validates requests with Zod and returns an email draft rather than storing or sending personal data.
5. `npm run build` emits `dist/`; validation scripts reject incomplete deployment artifacts.

## Important directories

- `app/`: pages, metadata routes, API routes, shared UI, and global styles
- `public/`: versioned static and brand assets
- `worker/`: Cloudflare Worker entry point
- `db/` and `drizzle/`: optional database schema and generated migration metadata
- `scripts/`: repeatable build and artifact checks
- `tests/`: Node test-runner integration checks
- `.github/`: CI, deployment automation, ownership, and collaboration templates

Keep server-only values out of client components. Treat `public/` as publicly downloadable. Any future persistence or email provider must include threat modeling, least-privilege secrets, error handling, tests, and corresponding privacy-policy updates.
