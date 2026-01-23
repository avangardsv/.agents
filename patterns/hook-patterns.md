# Universal Hook Patterns

Universal concepts for AI tool event hooks that work across different tools.

## Overview

Hooks allow you to intercept and modify AI tool behavior at key points in the execution pipeline. While each tool has different hook mechanisms, the underlying patterns are universal.

## Universal Hook Concepts

### 1. Event Interception

**Concept**: Intercept events before or after they occur.

**Universal Pattern**:
- Pre-event hooks: Run before action (can block/modify)
- Post-event hooks: Run after action (can log/notify)

**Common Events**:
- Tool execution (before/after)
- User input (before processing)
- Session lifecycle (start/stop)
- Context changes (before compaction)

### 2. Safety Checks

**Concept**: Validate actions before execution to prevent dangerous operations.

**Universal Pattern**:
```typescript
// Pseudo-code pattern
if (isDangerous(action)) {
  return { decision: 'block', reason: '...' };
}
return { decision: 'allow' };
```

**Common Safety Checks**:
- Dangerous file operations (`rm -rf`, `format`)
- Network operations (external API calls)
- System modifications (install packages, change configs)
- Data deletion (drop database, clear cache)

### 3. Session Tracking

**Concept**: Persist session state and events for debugging and analysis.

**Universal Pattern**:
```typescript
// Pseudo-code pattern
saveEvent({
  timestamp: now(),
  eventType: 'ToolUse',
  tool: 'Bash',
  input: {...},
  result: {...}
});
```

**Common Tracking**:
- Tool usage statistics
- Error tracking
- Performance metrics
- User interaction patterns

### 4. Context Injection

**Concept**: Automatically add relevant files/context based on user input.

**Universal Pattern**:
```typescript
// Pseudo-code pattern
if (prompt.includes('test')) {
  contextFiles.push('**/*.test.ts');
}
if (prompt.includes('api')) {
  contextFiles.push('**/api/**');
}
return { contextFiles };
```

**Common Triggers**:
- Keywords in prompts
- File patterns
- Project structure
- Recent changes

### 5. Notifications

**Concept**: Notify user of important events or completion.

**Universal Pattern**:
- Sound notifications
- Desktop notifications
- Log messages
- Status updates

## Implementation Guide

### Step 1: Identify Your Tool's Hook System

Check `../tools/{your-tool}/adapter.md` for:
- Available hook events
- Hook registration method
- Hook payload structure
- Return value format

### Step 2: Map Universal Patterns

Match universal patterns to your tool's capabilities:

| Universal Pattern | Tool Implementation |
|------------------|-------------------|
| Pre-event hooks | `PreToolUse`, `PreCommand` |
| Post-event hooks | `PostToolUse`, `PostCommand` |
| Safety checks | Permission decisions |
| Session tracking | Event logging |
| Context injection | File inclusion |

### Step 3: Implement Pattern

Use the tool-specific adapter to implement:

```typescript
// Example: Safety check pattern
const preToolUse = async (payload) => {
  if (isDangerous(payload.tool_input)) {
    return { permissionDecision: 'deny' };
  }
  return {};
};
```

### Step 4: Test and Refine

- Test with safe operations
- Test with dangerous operations
- Verify notifications work
- Check session tracking

## Tool-Specific Adapters

- [Claude Code](../tools/claude-code/adapter.md) - TypeScript hooks
- Cursor - Coming soon (see [tools/README.md](../tools/README.md))
- Add your tool's adapter in `../tools/`

## Best Practices

1. **Fail Safe** - Default to allowing if unsure
2. **Log Everything** - Track all decisions for debugging
3. **User Feedback** - Notify when blocking actions
4. **Performance** - Keep hooks fast, async when possible
5. **Testing** - Test hooks thoroughly before deployment

## Examples

See tool-specific implementations:
- [Claude Code Hooks](../tools/claude-code/hooks.md) - Full implementation example
