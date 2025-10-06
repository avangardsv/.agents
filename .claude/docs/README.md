# Documentation

Purpose
- Centralize feature, product, and technical docs for the `.agents/.claude` workspace.
- Explain how things work (architecture, flows, usage), not how we work.

Out of scope
- Assistant behavior/process rules — see `../rules/`.

Contents
- `ROADMAP.md` — High-level roadmap for agents and workflows.
- `IMPROVEMENTS.md` — Iteration notes and proposed enhancements.
- `rules.md` — Bridge doc explaining how rules differ from docs.
- `simplified-logging.md` — **CURRENT**: Simplified prompt-based logging (2025-10-06).
- `logging-system-fix-plan.md` — Original complex logging implementation plan (deprecated).
- `logging-system-implementation.md` — Bug fix documentation (deprecated approach).

Note: Logging template moved to `../hooks/LOGGING-TEMPLATE.md`

Contributing
- Keep docs practical and close to the implementation.
- Prefer short, example-driven sections over long prose.
- Update diagrams and links when changing code flows.
- If you’re documenting behavior/process for the assistant, move it to `../rules/`.

Conventions
- One topic per file; use lowercase-kebab-case where possible.
- Place assets under `docs/assets/` and use relative links.
