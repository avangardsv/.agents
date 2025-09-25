# AI Agents Boilerplate

## Quick Setup

```bash
# Copy to your project
cp -r .claude/ /path/to/your/project/

# Hooks start automatically with Claude Code
```

## Structure

- `.claude/hooks/` - TypeScript hooks for Claude Code integration
- `.claude/rules/` - Communication, workflow, and coding standards
- `.claude/session/` - Session data (git-ignored)
- `logs/` - Daily logs in YYYY-MM-DD.md format

## Commands

```bash
# View today's log
cat logs/$(date +%F).md

# Validate configs
yamllint file.yml
jq empty file.json
shellcheck script.sh
```

## Logging Policy

- **Format**: See `.claude/rules/` for guidelines
- **Example**: See `logs/2025-09-15.md` for current format
- **Structure**: One file per day, timestamped entries with Problem/Investigation/Solution/Outcome/Files

## Development Rules

- **Coding Style**: See `.claude/rules/workflow.md`
- **Communication**: See `.claude/rules/communication.md`
- **Git Standards**: Conventional commits, narrow scope, comprehensive PRs

## Security

- Never commit secrets
- `.claude/session/` is git-ignored
- `logs/` are git-tracked for team visibility
