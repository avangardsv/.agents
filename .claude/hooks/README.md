# Hooks

This directory contains the TypeScript hooks system that integrates with Claude Code to provide automated logging, validation, and workflow automation.

## Purpose

The hooks system intercepts Claude Code events to provide:
- **Automatic logging** - Every user prompt is logged in structured format
- **Smart categorization** - Requests automatically titled based on content
- **Tool tracking** - Monitor which development tools are used
- **Session management** - Maintain context across interactions
- **Workflow automation** - Trigger custom actions based on events

## Core Files

### `index.ts` - Main Hook Configuration
- Primary hook implementations for all Claude Code events
- **userPromptSubmit** - Logs every user request automatically
- **preToolUse/postToolUse** - Monitors tool usage and file changes
- **sessionStart/stop** - Manages session lifecycle
- **notification** - Handles Claude's progress updates
- Extensible TypeScript system for custom logic

### `lib.ts` - Hook Infrastructure
- Core hook system functionality
- Event type definitions and interfaces
- Communication with Claude Code
- Error handling and validation

### `session.ts` - Session Persistence  
- Saves session data for analysis
- Maintains state between interactions
- Provides context for future sessions

### `package.json` - Dependencies
- Bun runtime configuration
- TypeScript support
- Node.js type definitions

## How It Works

### Event Interception
1. **User submits prompt** → `userPromptSubmit` hook triggers
2. **Log entry created** → Structured format in `../logs/YYYY-MM-DD.md`
3. **Smart title generated** → Based on prompt content analysis
4. **Tools monitored** → File changes and tool usage tracked
5. **Session updated** → Context maintained for future interactions

### Automatic Logging
```typescript
// When user submits: "create a new authentication component"
// Hook generates:
## 14:32 - Creation Task
**Request:** create a new authentication component
**Actions:** [To be filled by AI]
**Files:** [To be updated]
**Tools:** [To be logged]
```

### Smart Title Generation
- **"create/add/new"** → Creation Task
- **"fix/bug/error"** → Bug Fix
- **"update/modify"** → Update Task
- **"test/check"** → Testing Task
- **"logging/log"** → Logging System Task
- **"agent/workflow"** → Agent Configuration Task

## Usage

### Hook Activation
```bash
# Hooks start automatically with Claude Code
# No manual setup required
```

### Monitoring Output
```bash
🚀 New session started from: vscode
💬 User prompt: create logging system
✅ Logged: Creation Task at 14:32
🔧 Tool used: Write
📁 File change: create .claude/logs/2025-09-11.md
```

### Checking Generated Logs
```bash
# View today's automatically generated log
cat .claude/logs/$(date +%Y-%m-%d).md
```

## Customization

### Adding New Hook Types
```typescript
// Add to index.ts
const customHook: CustomHandler = async (payload) => {
  // Your custom logic here
  console.log('Custom hook triggered');
  return {};
}

// Register in runHook()
runHook({
  userPromptSubmit,
  customHook,
  // ... other hooks
})
```

### Modifying Log Format
```typescript
// Update logUserPrompt function in index.ts
const entry = [
  `## ${time} - ${title}`,
  `**Request:** ${prompt}`,
  `**Actions:** [Custom format]`,
  `**Files:** [Your format]`,
  `**Tools:** [Modified format]`,
].join('\n');
```

### Adding Validation Rules
```typescript
// In userPromptSubmit handler
if (payload.prompt.includes('dangerous-command')) {
  console.error('⚠️ Dangerous prompt detected!');
  return {decision: 'block', reason: 'Safety violation'};
}
```

## Integration

### With Logging System
- Hooks create entries in `../logs/` automatically
- Structured Variant B format for consistency
- Time-based organization for chronological tracking

### With Rules System
- Can enforce rules from `../rules/` directory
- Validate prompts against quality standards  
- Apply communication guidelines automatically

### With Future Agents
- Hooks provide foundation for autonomous agents
- Event interception enables agent triggering
- Session state supports agent context awareness

## Performance

### Lightweight Design
- **Bun runtime** - Fast JavaScript execution
- **Minimal processing** - Simple title generation and logging
- **Asynchronous** - Non-blocking hook execution
- **Error handling** - Graceful failure without disrupting Claude

### Resource Usage
- **Low memory** - Simple string processing
- **Fast I/O** - Efficient file operations
- **No external dependencies** - Self-contained system
- **Background processing** - Doesn't slow user interaction

## Troubleshooting

### Common Issues
```bash
# Hooks not triggering
# Ensure Claude Code has hooks support enabled

# Log files not created
mkdir -p .claude/logs  # Ensure directory exists
chmod 755 .claude/logs  # Check permissions
```

### Debug Mode
```typescript
// Add to index.ts for debugging
console.log('Hook payload:', JSON.stringify(payload, null, 2));
```

This hooks system provides the foundation for all automation in the AI agents boilerplate, enabling automatic logging and serving as the platform for future agent development.