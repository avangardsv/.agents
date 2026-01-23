# Quick Start Guide

Get started with the AI Agents Boilerplate in 5 minutes.

## Prerequisites

- An AI tool (Claude Code, Cursor, etc.)
- Basic familiarity with your project structure

## Step 1: Copy Boilerplate (1 minute)

Copy the boilerplate to your project:

```bash
# From this repo to your project
cp -r /path/to/agents /path/to/your-project/.agents
```

**Note**: The folder name changes from `agents/` (visible repo) to `.agents/` (hidden in your project).

## Step 2: Choose Your AI Tool (1 minute)

### Claude Code

```bash
# Set up hooks
mkdir -p .claude/hooks
# Copy implementation from tools/claude-code/hooks.md

# Set up settings
# Copy from tools/claude-code/settings.md to .claude/settings.json
```

See `tools/claude-code/adapter.md` for detailed Claude Code setup.

### Cursor

```bash
# Coming soon
# See tools/cursor/ when available
```

## Step 3: Customize Rules (2 minutes)

Review and customize universal rules:

```bash
# Edit communication style
vim .agents/rules/communication.md

# Edit workflow patterns
vim .agents/rules/workflow.md
```

## Step 4: Test (1 minute)

1. Start a conversation with your AI tool
2. Reference a prompt: "Use the code review prompt from `.agents/prompts/code-review.md`"
3. Verify rules are being applied
4. Test hooks (if configured)

## That's It! 🎉

You now have:
- ✅ Universal prompts and rules
- ✅ Tool-specific configuration
- ✅ Reusable templates

## Next Steps

- **Customize**: Adapt rules and prompts to your project
- **Add Agents**: See [agents/README.md](agents/README.md)
- **Explore Patterns**: See [patterns/README.md](patterns/README.md)
- **Read Full Docs**: See [README.md](README.md)

## Common Issues

### "Rules not being applied"

**Solution**: 
- Verify files are in `.agents/rules/`
- Check tool-specific adapter: `tools/{your-tool}/adapter.md`
- Ensure file names match tool expectations

### "Hooks not working"

**Solution**:
- Check hook implementation: `tools/{your-tool}/hooks.md`
- Verify settings configuration: `tools/{your-tool}/settings.md`
- Check tool logs for errors

### "Can't find prompts"

**Solution**:
- Prompts are in `.agents/prompts/`
- Reference them in conversations: "Use prompt from `.agents/prompts/code-review.md`"
- Or copy to your project's custom location

## Getting Help

- [INDEX.md](INDEX.md) - Content navigation
- [README.md](README.md) - Full documentation
- [MIGRATION-PLAN.md](docs/MIGRATION-PLAN.md) - Migration guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

---

**Time to Complete**: ~5 minutes  
**Difficulty**: Easy
