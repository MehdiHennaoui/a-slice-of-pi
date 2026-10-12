# A Slice of Pi

Pizza shop analytics dashboard built with React. It turns order, pricing, and review data into a clear overview of revenue, store performance, and customer feedback.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/) for UI components and charts (charts use the [shadcn Chart](https://ui.shadcn.com/docs/components/chart) built on [Recharts](https://recharts.org/))
- [Feature-Sliced Design (FSD)](https://feature-sliced.design/) for project structure
- [Biome](https://biomejs.dev/) for lint/format
- [Vitest](https://vitest.dev/) for unit tests

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Getting started

```bash
pnpm install
pnpm dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## What’s on the dashboard

| Widget | Description |
| --- | --- |
| **Yearly revenue** | Total revenue for the current year |
| **Orders by store** | Bar chart of orders per store |
| **Reviews** | Pie chart of review distribution |
| **Monthly revenue** | Line chart of revenue over the year |

Data lives in JSON under `src/pages/home/model/` and is transformed in the page model layer before being rendered.

## Architecture (Feature-Sliced Design)

This project follows [Feature-Sliced Design (FSD)](https://feature-sliced.design/), a methodology for structuring frontend apps by **layers** and **slices**.

### What FSD is

FSD organizes code from high-level composition down to shared infrastructure:

| Layer | Role |
| --- | --- |
| `app` | App bootstrap, providers, global styles |
| `pages` | Route-level screens and their local logic |
| `features` / `entities` | Reusable user flows and domain models (added only when needed) |
| `shared` | UI kit, utils, config — no business logic |

The main rule: **a module may only import from layers below it**, never sideways or upward. That keeps dependencies predictable and makes features easier to move or delete.

FSD also prefers starting simple: keep logic in the page until real reuse appears, then extract.

Docs: [feature-sliced.design](https://feature-sliced.design/)

### How it’s used here

This app is a single dashboard, so only the layers that are needed are present — no empty `features/`, `entities/`, or `widgets/` folders:

```
src/
  app/           # Shell: entry point, header, global CSS
  pages/home/    # Dashboard page
    ui/          # Charts and revenue card
    model/       # Order / pricing / review / revenue logic + JSON data
  shared/        # shadcn/ui components, config, helpers
```

- **`app`** wires the shell and mounts `HomePage`.
- **`pages/home`** owns the dashboard: chart compositions in `ui/`, business transforms and fixtures in `model/`.
- **`shared`** holds [shadcn/ui](https://ui.shadcn.com/) primitives (`Card`, `Chart`, `Select`, …), config, and helpers — no pizza-domain rules. Dashboard charts are built with the shadcn Chart component on top of Recharts.

Import direction stays `app` → `pages` → `shared`. Page-specific revenue and review logic stays in `pages/home/model` instead of being pushed into `shared`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Type-check and build for production |
| `pnpm test` | Run unit tests once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm check` | Run Biome lint + format checks |
| `pnpm check:fix` | Auto-fix Biome issues |
