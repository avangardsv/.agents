# Documentation Optimization Plan (2025-10-07)

## Objectives
- Reduce overlap, increase clarity, and make docs scannable.
- Establish lightweight metadata (owner, status, updated, tags).
- Keep a single source of truth per topic; link instead of duplicate.

## Scope (this pass)
1) Group INDEX by topic (Player, Chat, Logging, Standards, Misc)
2) Add frontmatter to key docs (owner/status/updated/tags)
3) Mark deprecated/legacy docs clearly
4) Keep active player docs: native controls (recommended), JS extensions (proposed), Kick analysis, IVS known issues

## Changes Applied
- INDEX regrouped by topic with concise links
- Frontmatter added to: 
  - player-native-controls-approach.md (active)
  - videojs-controls-implementation-summary.md (proposed)
  - kick-player-analysis.md (active)
  - logging-guide.md (active)
  - code-style-and-standards.md (active)
  - ivs-web-player-known-issues.md (active)
- Deprecated banners added to:
  - player-controls-agnostic-solution.md
  - player-controls-css-implementation.md

## Follow‑ups (optional)
- Add markdownlint + link checker in CI
- Add short ivs-native-player.md (usage/props) if we adopt IVS‑only in UI
- Ensure each new doc ships with frontmatter

## Owner & Review
- Owner: @vadymsvyrydov
- Review cadence: monthly or on major player/logging changes
