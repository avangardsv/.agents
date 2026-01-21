# Claude Code Hooks

Blueprint for implementing Claude Code event hooks.

## Overview

TypeScript hooks that intercept Claude Code pipeline events for:
- Session tracking
- Safety checks (block dangerous commands)
- Sound notifications
- Auto-context addition

## Directory Structure

```
.claude/hooks/
├── index.ts        # Main hook handlers
├── lib.ts          # Hook infrastructure & types
├── session.ts      # Session persistence
├── package.json    # Bun dependencies
├── tsconfig.json   # TypeScript config
└── sounds/
    └── completion.aiff  # Notification sound
```

## Implementation

### index.ts

```typescript
#!/usr/bin/env bun

import type {
  PreToolUseHandler,
  PostToolUseHandler,
  StopHandler,
  UserPromptSubmitHandler,
} from './lib';
import { runHook } from './lib';
import { saveSessionData } from './session';
import { $ } from "bun";

const DANGEROUS_COMMANDS = ['rm -rf /', 'rm -rf ~'];
const COMPLETION_SOUND_PATH = `${import.meta.dirname}/sounds/completion.aiff`;

// Block dangerous bash commands
const preToolUse: PreToolUseHandler = async (payload) => {
  await saveSessionData('PreToolUse', payload);

  if (payload.tool_name === 'Bash' && payload.tool_input?.command) {
    const command = payload.tool_input.command;
    const isDangerous = DANGEROUS_COMMANDS.some(cmd => command.includes(cmd));

    if (isDangerous) {
      return {
        permissionDecision: 'deny',
        permissionDecisionReason: `Dangerous command: ${command}`,
      };
    }
  }
  return {};
};

// Track tool usage
const postToolUse: PostToolUseHandler = async (payload) => {
  await saveSessionData('PostToolUse', payload);
  return {};
};

// Play sound on session end
const stop: StopHandler = async (payload) => {
  await saveSessionData('Stop', payload);
  try {
    await $`afplay ${COMPLETION_SOUND_PATH}`;
  } catch {}
  return {};
};

// Safety check prompts, auto-add context
const userPromptSubmit: UserPromptSubmitHandler = async (payload) => {
  await saveSessionData('UserPromptSubmit', payload);

  // Block dangerous prompts
  if (payload.prompt.includes('delete all')) {
    return { decision: 'block', reason: 'Dangerous keyword detected' };
  }

  // Auto-add test files when prompt mentions "test"
  const contextFiles = [];
  if (payload.prompt.toLowerCase().includes('test')) {
    contextFiles.push('**/*.test.ts');
  }

  return contextFiles.length ? { contextFiles } : {};
};

runHook({ preToolUse, postToolUse, stop, userPromptSubmit });
```

### lib.ts (Types)

```typescript
export interface PreToolUseHandler {
  (payload: { tool_name: string; tool_input: any }): Promise<{
    permissionDecision?: 'allow' | 'deny';
    permissionDecisionReason?: string;
  }>;
}

export interface PostToolUseHandler {
  (payload: { tool_name: string; tool_result: any }): Promise<{}>;
}

export interface StopHandler {
  (payload: { reason: string }): Promise<{}>;
}

export interface UserPromptSubmitHandler {
  (payload: { prompt: string }): Promise<{
    decision?: 'block';
    reason?: string;
    contextFiles?: string[];
    updatedPrompt?: string;
  }>;
}

export function runHook(handlers: Record<string, Function>) {
  const hookType = process.argv[2];
  const payload = JSON.parse(process.env.CLAUDE_HOOK_PAYLOAD || '{}');

  if (handlers[hookType]) {
    handlers[hookType](payload).then((result: any) => {
      console.log(JSON.stringify(result));
    });
  }
}
```

### session.ts

```typescript
import { mkdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const SESSION_DIR = '.claude/session';

export async function saveSessionData(hookType: string, data: any) {
  await mkdir(SESSION_DIR, { recursive: true });

  const sessionId = process.env.CLAUDE_SESSION_ID || 'default';
  const filePath = join(SESSION_DIR, `${sessionId}.json`);

  let existing = [];
  try {
    existing = JSON.parse(await readFile(filePath, 'utf-8'));
  } catch {}

  existing.push({
    timestamp: new Date().toISOString(),
    hookType,
    ...data,
  });

  await writeFile(filePath, JSON.stringify(existing, null, 2));
}
```

### package.json

```json
{
  "name": "claude-hooks",
  "type": "module",
  "devDependencies": {
    "@types/bun": "latest",
    "typescript": "^5.0.0"
  }
}
```

## Features

| Feature | Description |
|---------|-------------|
| **Safety** | Blocks `rm -rf /`, `rm -rf ~` commands |
| **Session tracking** | Saves all events to JSON |
| **Sound notification** | Plays sound when session ends |
| **Auto-context** | Adds test files when prompt mentions "test" |
| **Prompt filtering** | Blocks prompts with "delete all" |

## Setup Steps

1. Create `.claude/hooks/` directory
2. Copy implementation files
3. Install Bun: `curl -fsSL https://bun.sh/install | bash`
4. Create `.claude/settings.json` (see `settings/claude-code.md`)
5. Hooks activate automatically with Claude Code
