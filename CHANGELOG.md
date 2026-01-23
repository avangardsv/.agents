# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note**: This changelog is auto-generated using [standard-version](https://github.com/conventional-changelog/standard-version).
Run `npm run version` to generate a new release.

## [1.0.0] - 2026-01-23

### Added

- **Universal Patterns** (`patterns/`)
  - Universal hook patterns (`hook-patterns.md`)
  - Universal prompt patterns (`prompt-patterns.md`)
  - Universal rule patterns (`rule-patterns.md`)

- **Tool Abstraction Layer** (`tools/`)
  - Tool-specific adapters directory
  - Claude Code adapter (`tools/claude-code/adapter.md`)
  - Moved Claude Code hooks to `tools/claude-code/hooks.md`
  - Moved Claude Code settings to `tools/claude-code/settings.md`

- **Documentation**
  - `MIGRATION-PLAN.md` - Migration guide from old structure
  - `INDEX.md` - Content navigation
  - `QUICKSTART.md` - Quick setup guide
  - `CONTRIBUTING.md` - Contribution guidelines

- **Versioning**
  - `VERSION` file for version tracking
  - `CHANGELOG.md` for change history

- **Validation**
  - npm-based validation using `markdown-link-check` and `markdownlint`
  - `.markdownlint.json` - Markdown linting configuration

### Changed

- **Structure Reorganization**
  - Moved tool-specific content to `tools/` directory
  - Created universal patterns in `patterns/` directory
  - Updated README to clarify `agents/` (repo) vs `.agents/` (project) naming

- **Documentation Updates**
  - Fixed broken references in `agents/README.md`
  - Updated hooks and settings READMEs to point to new locations
  - Added migration notices to legacy directories

### Fixed

- Fixed broken reference to `agent-development-roadmap.md` in `agents/README.md`
- Created missing `MIGRATION-PLAN.md` referenced in `HISTORY.md`

### Deprecated

- `hooks/claude-code-hooks.md` - Moved to `tools/claude-code/hooks.md`
- `settings/claude-code.md` - Moved to `tools/claude-code/settings.md`
- These files kept for backward compatibility but will be removed in v2.0.0

## [Unreleased]

### Planned

- Cursor adapter (`tools/cursor/`)
- Agent registry system
- Composition system for prompts/rules
- Multi-tool support guide
- Example projects in `examples/`

---

[1.0.0]: https://github.com/your-org/agents/releases/tag/v1.0.0
