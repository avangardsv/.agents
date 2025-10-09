# Code Style and Standards
---
owner: @vadymsvyrydov
status: active
updated: 2025-10-07
tags: [standards, eslint, prettier, stylelint, testing]
---

This project uses TypeScript, Next.js, SCSS modules, and Jest/RTL. This guide summarizes the code style enforced by tooling in this repo and gives concise rules and examples for day‑to‑day development.

## Tooling Summary
- TypeScript: strict mode, path alias `@/*`
- ESLint (flat config): Next + TS + Prettier integration
- Prettier: opinionated formatting (see settings below)
- Stylelint: SCSS rules (order, nesting, pseudo‑classes)
- Jest + React Testing Library: `next/jest` setup

## TypeScript
- Strict on; no emit. Module resolution: `bundler`.
- JSX preserved for Next. Types globally include `jest` and `@testing-library/jest-dom`.
- Path alias: `@/*` → project root.

Quick patterns
- Prefer explicit types for function signatures and public exports.
- Avoid `any`; use `unknown` + narrowing or define interfaces.
- Centralize shared types under `types/` or alongside features.

## ESLint
Config: `eslint.config.mjs` (flat).
- Extends: `next/core-web-vitals`, `next/typescript`, `plugin:@typescript-eslint/recommended`, `plugin:prettier/recommended`
- Key rules:
  - `semi: "error"` → always use semicolons
  - `quotes: ["error", "double"]` → double quotes in TS/JS
  - `no-unused-vars: ["warn", { argsIgnorePattern: "^_" }]` → prefix unused args with `_`
  - `no-console: ["warn", { allow: ["error", "warn"] }]` → avoid stray logs
  - `react-hooks/rules-of-hooks: "error"`, `react-hooks/exhaustive-deps: "warn"`

Run
- `npm run lint` — check
- `npm run lint:fix` — fix

## Prettier
`.prettierrc`
- `singleQuote: false` → double quotes
- `semi: true`, `trailingComma: "all"`, `printWidth: 100`, `tabWidth: 2`

Run
- `npm run prettier` — check
- `npm run prettier:fix` — write
- `npm run format` — ESLint fix + Stylelint fix + Prettier write

## Stylelint (SCSS)
`stylelint.config.js` + `stylelint-order`, `stylelint-scss`
- Enforces SCSS syntax, property ordering, and allows `:global` pseudo‑class in modules
- Keep selectors simple; prefer module scoping over globals

Run
- `npm run stylelint` / `npm run stylelint:fix`

SCSS modules
- File names: `Component.module.scss`
- Import with `import styles from "./Component.module.scss";`
- Compose classes with `clsx`

## Testing
Jest config (`jest.config.js`) via `next/jest` with RTL setup in `jest.setup.js`.
- Test env: `jsdom`
- Paths: alias `^@/(.*)$ → <rootDir>/$1`
- CSS modules mocked with `identity-obj-proxy`
- Coverage collected from `features/**` and `shared/**` (with exclusions)

Run
- `npm run test` / `npm run test:watch`
- Coverage: `npm run test:cov` (writes to `test-reports/coverage`)

Testing guidelines
- Use RTL queries (`getByRole`, `getByText`, etc.).
- Avoid testing implementation details; prefer behavior.
- Mock external deps (e.g., IVS, Swiper) via `__mocks__` and Jest mappers.

## i18n
- `react-i18next` + `useTranslation`.
- Wrap literal UI strings with `t("namespace:key")`.
- Keep translation keys stable; prefer semantic names over full sentences.

## Data fetching / state
- `@tanstack/react-query` for async state; keep local UI state with React.
- Invalidate queries after impactful mutations/events (see IVS ended handler).
- Co-locate hooks next to features under `features/<domain>/hooks`.

## Components
- Function components with named exports; default exports for page‑level is acceptable per Next.
- Props interfaces above component; optional props with `?` and sensible defaults.
- Side effects inside `useEffect`; memoize callbacks/values when needed.

Example
```tsx
import clsx from "clsx";
import styles from "./Widget.module.scss";

interface WidgetProps { title: string; disabled?: boolean }

export function Widget({ title, disabled = false }: WidgetProps) {
  return (
    <div className={clsx(styles.root, disabled && styles.disabled)} aria-disabled={disabled}>
      {title}
    </div>
  );
}
```

## Commit and PR hygiene
- Prefer conventional commits (feat, fix, docs, refactor, test, chore).
- Keep scope narrow; include meaningful descriptions and links to tickets.

## Video.js / IVS specifics
- Use Video.js with Amazon IVS tech for live playback.
- Live UI: set `liveui: true`; ensure `vjs-live` state and include `liveDisplay` / `SeekToLive` if customizing `controlBar.children`.
- For debugging live UI, use the short runtime toggle in `IVSPlayer.tsx`:
  - Enable: `window.__PLAYER_DEBUG__ = true`
  - Disable: `window.__removeLiveDebug?.(); window.__PLAYER_DEBUG__ = false`

## Useful scripts
```bash
npm run format       # eslint + stylelint + prettier
npm run test:cov     # coverage
npm run lint         # eslint only
npm run stylelint    # stylelint only
```

---
If a new rule is added (ESLint, Prettier, Stylelint), update this document to keep it source‑of‑truth for contributors.
