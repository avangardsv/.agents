# Project History & Learnings

## Overview
This repo started as an experiment to create AI-specific configurations under `.agents/` folder, with separate setups for each AI tool (Claude, Cursor, etc.).

## Timeline (Sep-Oct 2025)

### Sep 17 - Hook System Development
- Created TypeScript-based hooks for Claude Code
- Implemented dual logging (project + .claude/logs/)
- Added PostToolUse logging with tool-specific details

### Sep 21-25 - Infrastructure Setup
- Git remote configuration
- Hook README documentation
- Multi-project support testing

### Sep 29 - Agent Experiments
- Built `doc-updater` agent for auto-documentation
- Created `log-builder` agent for session logging
- Attempted automated documentation updates

### Sep 30 - Oct 3 - Refinement
- README updates for current state
- Logging system simplification
- Session tracking improvements

## What Worked
- **Hooks system** - Event interception works well
- **Session tracking** - JSON-based persistence useful for debugging
- **Sound notifications** - Good UX for long operations
- **Safety checks** - Blocking dangerous commands (rm -rf)

## What Didn't Work
- **Per-AI configs** - Too complex, slowed AI performance (large context)
- **Detailed logging** - Generated too much noise, hard to find useful info
- **Nested structure** - `.claude/agents/`, `.claude/rules/` buried content
- **Setup overhead** - Time-consuming to configure each AI tool separately

## Key Learnings

1. **Simpler is better** - Flat structure, less nesting
2. **AI-agnostic** - Don't separate by tool, create universal content
3. **Context matters** - Large CLAUDE.md files hurt AI performance
4. **Reusable prompts** - More valuable than complex automation

## Migration Decision (Jan 2026)
Consolidating to flat, universal structure:
- `agents/` - Agent definitions (top-level)
- `prompts/` - Reusable prompt templates
- `rules/` - Universal AI behavior guidelines
- `hooks/` - Event hooks (keep working system)
- `templates/` - Reusable templates

See `MIGRATION-PLAN.md` for details.
