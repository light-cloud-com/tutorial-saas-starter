# Changelog

All notable changes to the Next.js SaaS Starter with PostgreSQL and Stripe are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-11-10

First release of the Next.js SaaS Starter with PostgreSQL and Stripe: Open-source Next.js 16 SaaS starter kit in TypeScript with PostgreSQL, Better Auth, Drizzle ORM, Stripe subscriptions, teams and roles, onboarding, an admin panel, API keys and a REST API, styled with Tailwind CSS and shadcn/ui. Deploy to Light Cloud with a PostgreSQL database in one click.

### Added

- Email and password sign-up, sign-in and password reset, plus GitHub and Google buttons once their keys are set.
- Workspaces with owner, admin and member roles, a workspace switcher and invitations by email or a copyable link.
- Onboarding stepper to name the workspace, invite teammates and pick a plan; /sign-up?plan=pro carries the choice.
- Stripe Checkout, the customer portal and a webhook keep each workspace's plan in sync; plans live in src/lib/plans.ts.
- Admin panel at /admin to search users and workspaces, disable a user or sign in as them; the first account is admin.
- Per-workspace API keys, stored as a SHA-256 hash, for a REST API at /api/v1/projects that answers 402 at the plan limit.
- SQL migrations run on each npm start under an advisory lock; GET /api/health answers 503 if the database is down.
- Vitest unit tests, an integration test that signs up two users and drives the API, and npm run smoke for a running app.
- A GitHub Codespaces dev container, CI on every push and pull request, dependency review, and AGENTS.md for coding agents.

[Unreleased]: https://github.com/light-cloud-templates/nextjs-saas-starter/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/light-cloud-templates/nextjs-saas-starter/releases/tag/v1.0.0
