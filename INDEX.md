# Content Index

Quick navigation guide for the AI Agents Boilerplate.

## 🚀 Getting Started

- [README.md](README.md) - Main documentation
- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
- [MIGRATION-PLAN.md](docs/MIGRATION-PLAN.md) - Migration from old structure

## 📚 Core Content

### Universal Patterns
- [patterns/README.md](patterns/README.md) - Universal pattern overview
- [patterns/hook-patterns.md](patterns/hook-patterns.md) - Hook concepts
- [patterns/prompt-patterns.md](patterns/prompt-patterns.md) - Prompt structures
- [patterns/rule-patterns.md](patterns/rule-patterns.md) - Rule structures

### Prompts
- [prompts/README.md](prompts/README.md) - Prompt templates overview
- [prompts/code-guidelines.md](prompts/code-guidelines.md) - Code standards
- [prompts/code-review.md](prompts/code-review.md) - Code review prompts
- [prompts/debugging.md](prompts/debugging.md) - Debugging prompts

### Rules
- [rules/README.md](rules/README.md) - Rules overview
- [rules/communication.md](rules/communication.md) - Communication guidelines
- [rules/workflow.md](rules/workflow.md) - Workflow patterns

### Agents
- [agents/README.md](agents/README.md) - Agents overview
- [agents/session-logger.md](agents/session-logger.md) - Session logging agent

### Templates
- [templates/README.md](templates/README.md) - Templates overview
- [templates/daily-log.md](templates/daily-log.md) - Daily log template

## 🛠️ Tool-Specific

### Claude Code
- [tools/claude-code/adapter.md](tools/claude-code/adapter.md) - How to adapt patterns
- [tools/claude-code/hooks.md](tools/claude-code/hooks.md) - Hook implementation
- [tools/claude-code/settings.md](tools/claude-code/settings.md) - Settings configuration
- [tools/claude-code/adapter.md](tools/claude-code/adapter.md) - Claude Code setup guide

### Cursor
- Coming soon - See [tools/README.md](tools/README.md)

## 📖 Documentation

- [docs/HISTORY.md](docs/HISTORY.md) - Project history and learnings
- [docs/MIGRATION-PLAN.md](docs/MIGRATION-PLAN.md) - Migration guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute

## 🔧 Utilities

- `npm run validate` - Validation commands (see package.json)
- [VERSION](VERSION) - Current version
- [CHANGELOG.md](CHANGELOG.md) - Version history

## 🔍 Quick Reference

### By Use Case

**Setting up a new project:**
1. [QUICKSTART.md](QUICKSTART.md)
2. [tools/{your-tool}/adapter.md](tools/)

**Adding a new AI tool:**
1. [patterns/](patterns/) - Understand universal patterns
2. [tools/README.md](tools/README.md) - Create adapter
3. [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

**Customizing prompts:**
1. [prompts/](prompts/) - Browse templates
2. [patterns/prompt-patterns.md](patterns/prompt-patterns.md) - Understand structure

**Setting up hooks:**
1. [patterns/hook-patterns.md](patterns/hook-patterns.md) - Universal concepts
2. [tools/{your-tool}/adapter.md](tools/) - Tool-specific guide
3. [tools/{your-tool}/hooks.md](tools/) - Implementation

**Creating rules:**
1. [rules/](rules/) - Existing rules
2. [patterns/rule-patterns.md](patterns/rule-patterns.md) - Rule structure

### By Content Type

| Type | Location | Purpose |
|------|----------|---------|
| Universal Patterns | `patterns/` | Tool-agnostic concepts |
| Tool Adapters | `tools/` | Tool-specific implementations |
| Prompts | `prompts/` | Reusable prompt templates |
| Rules | `rules/` | Behavior guidelines |
| Agents | `agents/` | Autonomous AI agents |
| Templates | `templates/` | Document templates |
| Documentation | `docs/` | Project docs |

## 🔗 Related Links

- [README.md](README.md) - Main entry point
- [QUICKSTART.md](QUICKSTART.md) - Quick setup
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribute

---

**Last Updated**: 2026-01-23
