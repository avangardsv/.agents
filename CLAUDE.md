# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Hook System
```bash
# Hooks start automatically with Claude Code
# No manual setup or installation needed
```

### Session Data & Logs
```bash
# View session data (JSON format)
ls .claude/session/

# Check current session file
ls -la .claude/session/*.json | tail -1

# View today's daily log (user prompts)
cat logs/$(date +%Y-%m-%d).md
```

### Testing and Validation
```bash
# Validate YAML files
yamllint config.yml

# Validate JSON files  
jq empty config.json

# Validate shell scripts
shellcheck script.sh
bash -n script.sh
```

## Architecture Overview

This is an **AI Agents Boilerplate** repository designed to provide reusable Claude Code integration across projects. The core architecture centers around:

### Hook System (.claude/hooks/)
- **TypeScript-based hooks** that intercept Claude Code pipeline events
- **Session tracking** with JSON data stored in `.claude/session/`
- **Safety mechanisms** that block dangerous commands (rm -rf, etc.)
- **Auto-context addition** based on prompt keywords
- **Sound notifications** on session completion using local `sounds/completion.aiff`

### Key Files:
- `index.ts`: Main hook configuration with all event handlers
- `lib.ts`: Hook infrastructure and type definitions  
- `session.ts`: Session persistence and data management
- `sounds/`: Audio files for notifications

### Rules System (.claude/rules/)
- **Communication guidelines**: Concise responses (max 4 lines), direct implementation over explanation
- **Workflow patterns**: TodoWrite usage for complex tasks (3+ steps), parallel tool execution
- **Quality standards**: Security-first approach, follow existing code conventions

### Session Data Storage
- **All interaction data** stored in `.claude/session/[session-id].json`
- **Structured JSON format** with timestamps and hook type information
- **Git-ignored** for privacy while maintaining session continuity

### Daily Logs (logs/)
- **User prompts** automatically logged to `logs/YYYY-MM-DD.md`
- **Simple markdown format** with timestamps for easy reading
- **Git-tracked** for team visibility and history

## Runtime Environment

- **Bun runtime preferred** over Node.js (see .claude/hooks/CLAUDE.md for Bun-specific patterns)
- **TypeScript support** throughout hook system
- **Git repository** with main branch for PRs

## Integration Patterns

When working with this boilerplate:

1. **Hooks auto-start**: Automatically activate when Claude Code runs
2. **Use TodoWrite** for multi-step tasks to maintain visibility  
3. **Follow existing patterns** in rules/ for communication and workflow
4. **Leverage auto-logging** for session tracking and debugging
5. **Validate configurations** before marking tasks complete

## Safety Features

- Dangerous command blocking in hooks (rm -rf patterns)
- Session data persistence for debugging
- Structured logging for audit trails
- Sound notifications for workflow awareness