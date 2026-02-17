# Learneum MVP (Watch. Learn. Earn.)

Find your path. Build real skills. Get rewarded for learning.

## Architecture choices

This MVP uses **NestJS + TypeScript** for the backend to satisfy strict typing, modular domain boundaries, built-in validation, and Swagger/OpenAPI support in one framework.

## Monorepo

- `apps/api` — NestJS API + AI onboarding (AILVA rules engine)
- `apps/mobile` — Expo React Native app (iOS/Android)
- `apps/admin` — Minimal React admin dashboard
- `db/migrations` — SQL schema and migration scripts
- `db/seeds` — seed script for starter data
- `docs` — product, risk, and compliance notes

## Quick start

```bash
npm install
cp apps/api/.env.example apps/api/.env
npm run dev:api
npm run dev:admin
npm run dev:mobile
```

or with Docker:

```bash
docker compose up --build
```

## API docs

Swagger is available at:

- `http://localhost:4000/docs`

## MVP assumptions

- Wallets are **custodial wallet-like accounts** with simulated addresses and balances.
- Learneum Credits are incentive points and **not guaranteed income**.
- Level 1-2 are fully implemented; Levels 3-5 are scaffolded with configurable gates and “locked/coming soon” UI copy.
- Level and reward configuration lives in DB tables:
  - `level_rules`
  - `reward_rules`

## Sample accounts

Created by seed SQL:

- Admin: `admin@learneum.dev` / `Admin123!`
- Learner: `learner1@learneum.dev` / `Learner123!`

## Test instructions

```bash
npm run test
npm run lint
```

## Security baseline

- JWT auth
- DTO validation
- Helmet + rate limiting
- immutable rewards ledger
- privacy-first profile defaults for minors

