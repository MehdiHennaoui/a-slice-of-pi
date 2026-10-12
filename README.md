# A Slice of Pi

Pizza shop analytics dashboard built with React. It turns order, pricing, and review data into a clear overview of revenue, store performance, and customer feedback.

## Table of contents

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Architecture (Feature-Sliced Design)](#architecture-feature-sliced-design)
  - [What FSD is](#what-fsd-is)
  - [How it’s used here](#how-its-used-here)
- [Scripts](#scripts)

## Stack

| Category | Tools |
| --- | --- |
| **Framework** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Bundler** | [Vite](https://vite.dev/) |
| **UI & styling** | [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **Charts** | [Shadcn Chart](https://ui.shadcn.com/docs/components/chart) on [Recharts](https://recharts.org/) |
| **Architecture** | [Feature-Sliced Design (FSD)](https://feature-sliced.design/) |
| **Quality** | [Biome](https://biomejs.dev/) (lint/format), [Vitest](https://vitest.dev/) (tests) |

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Getting started

```bash
pnpm install
pnpm dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Architecture (Feature-Sliced Design)

This project follows [Feature-Sliced Design (FSD)](https://feature-sliced.design/), a methodology for structuring frontend apps by **layers** and **slices**.

### What FSD is

FSD organizes code from high-level composition down to shared infrastructure:

```text
.
├── app/         # App bootstrap, providers, global styles
├── pages/       # Route-level screens and their local logic
├── widgets/     # Reusable UI blocks (discouraged; usually skipped)
├── features/    # Reusable user interactions (added only when needed)
├── entities/    # Reusable business domain models (added only when needed)
└── shared/      # UI kit, utils, config — no business logic
```

The main rule: **a module may only import from layers below it**, never sideways or upward. That keeps dependencies predictable and makes features easier to move or delete.

FSD also prefers starting simple: keep logic in the page until real reuse appears, then extract.

Docs: [feature-sliced.design](https://feature-sliced.design/)

### How it’s used here

This project is a single-screen dashboard, so FSD is applied in its lightweight form: only `app`, `pages`, and `shared`. Layers like `features` or `entities` are skipped until something is truly reused across screens.

```text
src/
├── app/                      # Application shell (boot, layout, global styles)
├── pages/
│   └── home/                 # Dashboard as one self-contained screen
│       ├── index.tsx         # Page composition — assembles the widgets
│       ├── ui/               # Presentation (cards & charts of prepared values)
│       └── model/            # Page domain (orders, pricing, reviews, revenue)
└── shared/                   # shadcn/ui primitives, config, helpers (no pizza domain)
```

In practice that means:

- `ui` asks `model` for numbers and shapes; it does not own business rules.
- `model` knows nothing about layout or chart components — only pizza analytics for this screen.
- Shared cards/charts stay in `shared` because they are UI primitives, not dashboard concepts.
- Dependencies only go downward (`app` → `pages` → `shared`), so the page can use shared UI, but shared code never knows about the dashboard.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server |
| `pnpm dev:host` | Start the Vite dev server exposed on the local network |
| `pnpm build` | Type-check and build for production |
| `pnpm lint` | Run Biome lint |
| `pnpm lint:fix` | Run Biome lint and auto-fix issues |
| `pnpm format` | Check formatting with Biome |
| `pnpm format:fix` | Format files with Biome |
| `pnpm check` | Run Biome lint + format checks |
| `pnpm check:fix` | Auto-fix Biome lint + format issues |
| `pnpm test` | Run unit tests once |
| `pnpm test:watch` | Run tests in watch mode |
