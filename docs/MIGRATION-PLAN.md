# Migration Plan

Migration guide for transitioning from old AI configuration structure to the new universal boilerplate structure.

## Overview

This migration plan documents the transition from tool-specific nested configurations to a flat, universal structure that works across multiple AI tools.

## Migration Goals

1. **Simplify structure** - Reduce nesting, improve discoverability
2. **Universal patterns** - Create tool-agnostic content
3. **Better organization** - Clear separation between patterns and tool-specific implementations
4. **Easier maintenance** - Single source of truth for common patterns

## Previous Structure (Deprecated)

```
.claude/
├── agents/          # Nested, hard to find
├── rules/           # Tool-specific
└── configs/          # Mixed concerns
```

**Problems:**
- Content buried in nested folders
- Tool-specific content mixed with universal patterns
- Hard to discover what's available
- Large context files hurt AI performance

## New Structure (Current)

```
agents/                    # Visible repo folder
├── agents/                # Agent definitions
├── prompts/               # Reusable prompt templates
├── rules/                 # Universal AI behavior guidelines
├── hooks/                 # Hook blueprints (tool-specific examples)
├── settings/              # Config blueprints (tool-specific examples)
├── templates/             # Reusable templates
├── patterns/              # Universal patterns (NEW)
├── tools/                 # Tool-specific adapters (NEW)
└── docs/                  # Project documentation
```

## Migration Steps

### Step 1: Review Current Setup

1. Identify which AI tools you're using
2. List current configuration files
3. Note any custom modifications

### Step 2: Copy Universal Content

Copy universal patterns that work across all tools:

```bash
# From this repo to your project
cp -r /path/to/agents/prompts /path/to/your-project/.agents/
cp -r /path/to/agents/rules /path/to/your-project/.agents/
cp -r /path/to/agents/templates /path/to/your-project/.agents/
```

### Step 3: Set Up Tool-Specific Content

For each AI tool you use, copy the relevant tool-specific content:

**Claude Code:**
```bash
# Copy hooks blueprint
cp -r /path/to/agents/tools/claude-code/hooks.md /path/to/your-project/.claude/hooks/

# Copy settings blueprint
cp /path/to/agents/tools/claude-code/settings.md /path/to/your-project/.claude/settings.json
```

**Cursor:**
```bash
# Copy Cursor-specific content when available
cp -r /path/to/agents/tools/cursor/* /path/to/your-project/.cursor/
```

### Step 4: Customize for Your Project

1. Review universal rules and prompts
2. Adapt to your project's needs
3. Add project-specific agents
4. Configure tool-specific settings

### Step 5: Clean Up Old Structure

After verifying everything works:

```bash
# Remove old nested structure if it exists
rm -rf .claude/agents/
rm -rf .claude/rules/
# Keep only what you need
```

## Migration Checklist

- [ ] Review current AI tool configurations
- [ ] Copy universal content (prompts, rules, templates)
- [ ] Set up tool-specific content for each tool
- [ ] Customize rules and prompts for your project
- [ ] Test configurations with your AI tools
- [ ] Remove old nested structure
- [ ] Update project documentation

## Common Issues

### Issue: "Where do I put tool-specific configs?"

**Solution**: Use the `tools/` directory structure:
- Universal patterns go in `patterns/`
- Tool-specific implementations go in `tools/{tool-name}/`
- Your project uses `.agents/` for universal content
- Your project uses `.{tool}/` for tool-specific configs

### Issue: "How do I use multiple AI tools?"

**Solution**: 
- Universal content (prompts, rules) goes in `.agents/`
- Each tool gets its own folder: `.claude/`, `.cursor/`, etc.
- Share universal patterns across tools
- Keep tool-specific configs separate

### Issue: "What if I need to customize?"

**Solution**:
- Copy patterns to your project
- Modify as needed
- Document your customizations
- Consider contributing back if it's universally useful

## Rollback Plan

If you need to rollback:

1. Keep backups of old structure
2. Restore from backup
3. Document what didn't work
4. Report issues for improvement

## Post-Migration

After migration:

1. ✅ Verify all AI tools work correctly
2. ✅ Test agent functionality
3. ✅ Validate hooks and settings
4. ✅ Update team documentation
5. ✅ Share learnings with community

## Questions?

See:
- [README.md](../README.md) - Main documentation
- [HISTORY.md](HISTORY.md) - What we learned
- [INDEX.md](../INDEX.md) - Content navigation
