# Claude Code Settings

Blueprint for `.claude/settings.json` configuration.

## Setup

Create `.claude/settings.json` in your project root:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "bun .claude/hooks/index.ts Notification" }]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "bun .claude/hooks/index.ts Stop" }]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "bun .claude/hooks/index.ts PreToolUse" }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "bun .claude/hooks/index.ts PostToolUse" }]
      }
    ],
    "SubagentStop": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "bun .claude/hooks/index.ts SubagentStop" }]
      }
    ],
    "UserPromptSubmit": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "bun .claude/hooks/index.ts UserPromptSubmit" }]
      }
    ],
    "PreCompact": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "bun .claude/hooks/index.ts PreCompact" }]
      }
    ]
  }
}
```

## Hook Events

| Event | When Triggered |
|-------|----------------|
| `Notification` | Claude sends a notification |
| `Stop` | Session ends |
| `PreToolUse` | Before any tool executes |
| `PostToolUse` | After any tool executes |
| `SubagentStop` | Subagent completes |
| `UserPromptSubmit` | User sends a prompt |
| `PreCompact` | Before context compaction |

## Requirements

- Bun runtime installed
- Hooks code in `.claude/hooks/` (see `hooks/` folder for implementation)
