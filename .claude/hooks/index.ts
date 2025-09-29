#!/usr/bin/env bun

import { logger } from '../services/logger';
import type {
  NotificationHandler,
  PostToolUseHandler,
  PreCompactHandler,
  PreToolUseHandler,
  SessionStartHandler,
  StopHandler,
  SubagentStopHandler,
  UserPromptSubmitHandler,
} from './lib';
import { runHook } from './lib';
import { saveSessionData } from './session';

const DANGEROUS_COMMANDS = ['rm -rf /', 'rm -rf ~'];
const COMPLETION_SOUND_PATH = `${import.meta.dir}/sounds/completion.aiff`;
const TEST_FILE_PATTERNS = ['**/*.test.ts', '**/*.test.js'];
const DANGEROUS_PROMPT_KEYWORDS = ['delete all'];

const sessionStart: SessionStartHandler = async (payload) => {
  await saveSessionData('SessionStart', { ...payload, hook_type: 'SessionStart' } as const);
  return {};
};

const preToolUse: PreToolUseHandler = async (payload) => {
  await saveSessionData('PreToolUse', { ...payload, hook_type: 'PreToolUse' } as const);

  if (payload.tool_name === 'Bash' && payload.tool_input && 'command' in payload.tool_input) {
    const command = (payload.tool_input as { command: string }).command;

    const isDangerousCommand = DANGEROUS_COMMANDS.some((dangerousCmd) =>
      command.includes(dangerousCmd)
    );
    if (isDangerousCommand) {
      return {
        permissionDecision: 'deny',
        permissionDecisionReason: `Dangerous command detected: ${command}`,
      };
    }
  }

  return {};
};

const postToolUse: PostToolUseHandler = async (payload) => {
  await saveSessionData('PostToolUse', { ...payload, hook_type: 'PostToolUse' } as const);
  await logger.logToolUsage(payload.tool_name, payload.tool_input, payload.tool_response);

  return {};
};

const notification: NotificationHandler = async (payload) => {
  await saveSessionData('Notification', { ...payload, hook_type: 'Notification' } as const);
  return {};
};

const stop: StopHandler = async (payload) => {
  await saveSessionData('Stop', { ...payload, hook_type: 'Stop' } as const);

  try {
    await Bun.$`afplay ${COMPLETION_SOUND_PATH}`;
  } catch (_error) {
    // Sound failed silently
  }

  return {};
};

const subagentStop: SubagentStopHandler = async (payload) => {
  await saveSessionData('SubagentStop', { ...payload, hook_type: 'SubagentStop' } as const);
  return {};
};

const userPromptSubmit: UserPromptSubmitHandler = async (payload) => {
  await saveSessionData('UserPromptSubmit', { ...payload, hook_type: 'UserPromptSubmit' } as const);
  await logger.logUserPrompt(payload.prompt);

  const contextFiles: string[] = [];
  const promptLowerCase = payload.prompt.toLowerCase();

  if (promptLowerCase.includes('test')) {
    contextFiles.push(...TEST_FILE_PATTERNS);
  }

  const hasDangerousKeyword = DANGEROUS_PROMPT_KEYWORDS.some((keyword) =>
    payload.prompt.includes(keyword)
  );

  if (hasDangerousKeyword) {
    return { decision: 'block', reason: 'Prompts containing dangerous keywords are not allowed' };
  }

  return contextFiles.length > 0 ? { contextFiles } : {};
};

const preCompact: PreCompactHandler = async (payload) => {
  await saveSessionData('PreCompact', { ...payload, hook_type: 'PreCompact' } as const);
  return {};
};

runHook({
  sessionStart,
  preToolUse,
  postToolUse,
  notification,
  stop,
  subagentStop,
  userPromptSubmit,
  preCompact,
});
