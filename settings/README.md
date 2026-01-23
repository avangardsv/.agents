# Settings

Blueprints for AI tool configuration files.

## ⚠️ Migration Notice

Settings have been moved to `../tools/` directory for better organization:
- **Claude Code settings**: See `../tools/claude-code/settings.md`

This directory is kept for backward compatibility but will be deprecated.

## New Structure

For new projects, use:
- `../tools/{tool}/settings.md` - Tool-specific settings
- `../tools/{tool}/adapter.md` - How to set up the tool

## Legacy Files

| File | New Location |
|------|--------------|
| `claude-code.md` | `../tools/claude-code/settings.md` |

## Usage

1. Find your tool: `../tools/{your-tool}/adapter.md`
2. Configure: `../tools/{your-tool}/settings.md`
3. Customize as needed for your project
