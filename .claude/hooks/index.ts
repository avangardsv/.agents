#!/usr/bin/env bun

/**
 * Simplified Hooks - Session tracking and safety only
 *
 * For logging: Use prompts to trigger Claude Code to document work
 * Example: "document today's work in logs" or "summarize what we did"
 */

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
import { $ } from "bun";

const DANGEROUS_COMMANDS = ['rm -rf /', 'rm -rf ~'];
const COMPLETION_SOUND_PATH = `${import.meta.dirname}/sounds/completion.aiff`;
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
  // Session data saved - use prompts for detailed logging
  return {};
};

const notification: NotificationHandler = async (payload) => {
  await saveSessionData('Notification', { ...payload, hook_type: 'Notification' } as const);
  return {};
};

const stop: StopHandler = async (payload) => {
  await saveSessionData('Stop', { ...payload, hook_type: 'Stop' } as const);

  // Play completion sound
  try {
    await $`afplay ${COMPLETION_SOUND_PATH}`;
  } catch (_error) {}

  return {};
};

const subagentStop: SubagentStopHandler = async (payload) => {
  await saveSessionData('SubagentStop', { ...payload, hook_type: 'SubagentStop' } as const);
  return {};
};

const userPromptSubmit: UserPromptSubmitHandler = async (payload) => {
  await saveSessionData('UserPromptSubmit', { ...payload, hook_type: 'UserPromptSubmit' } as const);

  const contextFiles: string[] = [];
  const promptLowerCase = payload.prompt.toLowerCase();

  // Auto-add test context when needed
  if (promptLowerCase.includes('test')) {
    contextFiles.push(...TEST_FILE_PATTERNS);
  }

  // Safety check
  const hasDangerousKeyword = DANGEROUS_PROMPT_KEYWORDS.some((keyword) =>
    payload.prompt.includes(keyword)
  );

  if (hasDangerousKeyword) {
    return { decision: 'block', reason: 'Prompts containing dangerous keywords are not allowed' };
  }

  // Append a lightweight logging note to the prompt unless the user already asked for logging
  const mentionsLogging = /\b(log|logging|log entry|summary)\b/i.test(promptLowerCase);
  const loggingNote = "\n\nAfter finishing, add a concise log entry to .claude/logs/YYYY-MM-DD.md using .claude/logs/TEMPLATE.md (What/Result/Files).";

  const response: any = {};
  if (contextFiles.length > 0) response.contextFiles = contextFiles;
  if (!mentionsLogging) response.updatedPrompt = payload.prompt + loggingNote;
  return response;
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
