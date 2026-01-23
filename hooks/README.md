# Hooks

Blueprints for AI tool event hooks.

## ⚠️ Migration Notice

Hook implementations have been moved to `../tools/` directory for better organization:
- **Claude Code hooks**: See `../tools/claude-code/hooks.md`
- **Universal hook patterns**: See `../patterns/hook-patterns.md`

This directory is kept for backward compatibility but will be deprecated.

## New Structure

For new projects, use:
- `../patterns/hook-patterns.md` - Universal hook concepts
- `../tools/{tool}/hooks.md` - Tool-specific implementations

## Legacy Files

| File | New Location |
|------|--------------|
| `claude-code-hooks.md` | `../tools/claude-code/hooks.md` |

## Usage

1. Read universal patterns: `../patterns/hook-patterns.md`
2. Find your tool: `../tools/{your-tool}/adapter.md`
3. Implement: `../tools/{your-tool}/hooks.md`
