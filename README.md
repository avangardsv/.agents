# AI Agents Boilerplate

Reusable blueprints for AI assistant configurations. Documentation-only - no runtime files.

## Structure

```
.agents/
├── agents/       # Agent definitions
├── prompts/      # Prompt templates
├── rules/        # Behavior guidelines
├── hooks/        # Hook blueprints
├── settings/     # Config blueprints
├── templates/    # Doc templates
├── CLAUDE.md     # Claude Code instructions
├── HISTORY.md    # Project history
└── README.md
```

## Contents

| Folder | Purpose |
|--------|---------|
| `agents/` | AI subagent definitions |
| `prompts/` | Reusable prompts (code guidelines, review, debugging) |
| `rules/` | AI behavior rules (communication, workflow) |
| `hooks/` | Event hook implementation blueprints |
| `settings/` | AI tool configuration blueprints |
| `templates/` | Document templates |

## Usage

### Copy to Project
```bash
cp -r .agents/prompts /path/to/project/.agents/
cp -r .agents/rules /path/to/project/.agents/
```

### Set Up Claude Code Hooks
1. Read `settings/claude-code.md` for settings.json
2. Read `hooks/claude-code-hooks.md` for implementation
3. Create `.claude/` folder in your project
4. Copy code from blueprints

## Design Principles

- **Documentation-only** - No runtime configs, just blueprints
- **Tool-agnostic** - Reusable across AI tools
- **DRY** - Single source of truth for patterns
- **Flat structure** - Easy to navigate
