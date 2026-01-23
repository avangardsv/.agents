# Claude Code Adapter

How to adapt universal patterns to Claude Code.

## Overview

Claude Code uses:
- **Rules**: `.agents/rules/*.md` files (automatically loaded)
- **Hooks**: `.claude/hooks/` TypeScript files
- **Settings**: `.claude/settings.json` configuration

## Adapting Universal Patterns

### Hook Patterns → Claude Code Hooks

**Universal Pattern**: Event interception, safety checks, session tracking

**Claude Code Implementation**: See `hooks.md` for full implementation

**Key Mapping**:
- Universal: Pre-event hooks → Claude Code: `PreToolUse`, `UserPromptSubmit`
- Universal: Post-event hooks → Claude Code: `PostToolUse`, `Stop`
- Universal: Safety checks → Claude Code: `permissionDecision: 'deny'`
- Universal: Session tracking → Claude Code: `saveSessionData()`

### Prompt Patterns → Claude Code Usage

**Universal Pattern**: Structured prompts with context

**Claude Code Implementation**:
- Reference prompts: "Use prompt from `.agents/prompts/code-review.md`"
- Include context: Files automatically included based on prompt
- Tool-specific: Claude Code reads `.agents/rules/` automatically

### Rule Patterns → Claude Code Rules

**Universal Pattern**: Behavior guidelines

**Claude Code Implementation**:
- Place rules in `.agents/rules/*.md`
- Claude Code automatically reads and applies
- Rules can reference each other
- User instructions override rules

## Setup

### 1. Copy Universal Content

```bash
# Copy universal patterns
cp -r /path/to/agents/patterns /path/to/project/.agents/

# Copy rules
cp -r /path/to/agents/rules /path/to/project/.agents/

# Copy prompts
cp -r /path/to/agents/prompts /path/to/project/.agents/
```

### 2. Set Up Claude Code Hooks

```bash
# Create hooks directory
mkdir -p .claude/hooks

# Copy hook implementation (see hooks.md)
# Copy from tools/claude-code/hooks.md
```

### 3. Configure Settings

```bash
# Create settings.json
# Copy from tools/claude-code/settings.md
```

## Implementation Examples

### Example: Safety Check Hook

**Universal Pattern** (from `../../patterns/hook-patterns.md`):
```typescript
if (isDangerous(action)) {
  return { decision: 'block', reason: '...' };
}
```

**Claude Code Implementation**:
```typescript
const preToolUse: PreToolUseHandler = async (payload) => {
  if (payload.tool_name === 'Bash' && isDangerous(payload.tool_input.command)) {
    return {
      permissionDecision: 'deny',
      permissionDecisionReason: 'Dangerous command detected'
    };
  }
  return {};
};
```

### Example: Using Prompt Patterns

**Universal Pattern** (from `../../patterns/prompt-patterns.md`):
```
Review code for: quality, correctness, performance, security
```

**Claude Code Usage**:
```
User: Review this code: [code]
AI: [Uses code-review pattern from .agents/prompts/code-review.md]
```

### Example: Applying Rule Patterns

**Universal Pattern** (from `../../patterns/rule-patterns.md`):
```
Communication: Be concise, code-first
```

**Claude Code Implementation**:
- Place in `.agents/rules/communication.md`
- Claude Code automatically applies
- No additional configuration needed

## File Locations

When using Claude Code:

```
your-project/
├── .agents/                    # Universal content
│   ├── rules/                  # Auto-loaded by Claude Code
│   ├── prompts/                # Reference in conversations
│   └── patterns/               # Reference for patterns
├── .claude/                    # Claude Code specific
│   ├── hooks/                   # Event hooks
│   └── settings.json            # Configuration
└── ...
```

## Best Practices

1. **Keep Universal Content Separate** - `.agents/` for universal, `.claude/` for Claude-specific
2. **Use Adapters** - Don't duplicate patterns, adapt them
3. **Document Customizations** - Note why you changed universal patterns
4. **Test Hooks** - Verify hooks work before deploying
5. **Version Control** - Track both universal and tool-specific configs

## Related

- [hooks.md](hooks.md) - Hook implementation details
- [settings.md](settings.md) - Settings configuration
- [../../patterns/](../../patterns/) - Universal patterns to adapt
