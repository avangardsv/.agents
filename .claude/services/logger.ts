/**
 * Logger Service - Handles all logging functionality
 * Keeps hooks simple by centralizing logging logic
 */

import { appendFile, mkdir } from 'node:fs/promises';
import * as path from 'node:path';

export class Logger {
  private baseDir: string;
  private currentPrompt: string = '';
  private toolsUsed: Array<{ tool: string; details: string }> = [];
  private filesModified: Set<string> = new Set();

  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
  }

  /**
   * Log user prompt to daily markdown file - detailed format matching main project
   */
  async logUserPrompt(prompt: string): Promise<void> {
    // Reset tracking for new prompt
    this.currentPrompt = prompt;
    this.toolsUsed = [];
    this.filesModified.clear();

    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().slice(0, 5);
    const logsDir = path.join(this.baseDir, '.claude', 'logs');

    // Categorize the prompt for better context
    const category = this.categorizePrompt(prompt);

    // Generate detailed entry with What/Why/How/Result format
    const entry = `### ${time} - ${category}
**What**: ${prompt}
**Why**: User requested task execution
**How**: Processing via Claude Code hooks system
**Result**: Task logged, awaiting completion

**Context**:
- Session: Active
- Timestamp: ${new Date().toISOString()}
- Log file: .claude/logs/${today}.md

`;

    await this.writeToLogFile(logsDir, today, entry);
  }

  /**
   * Log tool usage for tracking what actions were taken
   */
  async logToolUsage(toolName: string, details: string, files?: string[]): Promise<void> {
    this.toolsUsed.push({ tool: toolName, details });

    if (files) {
      files.forEach(f => this.filesModified.add(f));
    }
  }

  /**
   * Log completion with summary of tools used and files modified
   */
  async logCompletion(result: string): Promise<void> {
    if (!this.currentPrompt) return;

    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().slice(0, 5);
    const logsDir = path.join(this.baseDir, '.claude', 'logs');

    let toolsSummary = '';
    if (this.toolsUsed.length > 0) {
      toolsSummary = '\n**Tools Used**:\n' +
        this.toolsUsed.map(t => `- ${t.tool}: ${t.details}`).join('\n');
    }

    let filesSummary = '';
    if (this.filesModified.size > 0) {
      filesSummary = '\n**Files Modified**:\n' +
        Array.from(this.filesModified).map(f => `- \`${f}\``).join('\n');
    }

    const entry = `
**Completion at ${time}**:
${result}${toolsSummary}${filesSummary}

---

`;

    await this.writeToLogFile(logsDir, today, entry);

    // Reset for next prompt
    this.currentPrompt = '';
    this.toolsUsed = [];
    this.filesModified.clear();
  }

  /**
   * Categorize prompt for better log organization
   */
  private categorizePrompt(prompt: string): string {
    const lower = prompt.toLowerCase();

    if (lower.match(/\b(fix|bug|error|issue|problem|broken)\b/)) return 'Bug Fix';
    if (lower.match(/\b(add|create|implement|build|new)\b/)) return 'Feature';
    if (lower.match(/\b(refactor|improve|optimize|clean|update)\b/)) return 'Refactor';
    if (lower.match(/\b(test|spec|coverage)\b/)) return 'Testing';
    if (lower.match(/\b(doc|documentation|readme|comment)\b/)) return 'Documentation';
    if (lower.match(/\b(check|show|list|view|read|get|find|search)\b/)) return 'Investigation';
    if (lower.match(/\b(deploy|build|release|publish)\b/)) return 'Deployment';

    return 'Task';
  }


  /**
   * Write entry to log file
   */
  private async writeToLogFile(logsDir: string, date: string, entry: string): Promise<void> {
    try {
      await mkdir(logsDir, { recursive: true });
      const logFile = path.join(logsDir, `${date}.md`);
      await appendFile(logFile, entry);
    } catch (error) {
      console.error(`Failed to write to log file:`, error);
    }
  }
}

// Export singleton instance
export const logger = new Logger();