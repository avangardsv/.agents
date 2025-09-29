/**
 * Logger Service - Handles all logging functionality
 * Keeps hooks simple by centralizing logging logic
 */

import { appendFile, mkdir } from 'node:fs/promises';
import * as path from 'node:path';

export class Logger {
  private baseDir: string;

  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
  }

  /**
   * Log user prompt to daily markdown file - always to .claude/logs
   */
  async logUserPrompt(prompt: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().slice(0, 5);
    const logsDir = path.join(this.baseDir, '.claude', 'logs');

    const entry = `### ${time} - User Interaction
- **Problem**: User submitted a new prompt for processing.
- **Investigation**: Received prompt: "${prompt.substring(0, 80)}${prompt.length > 80 ? '...' : ''}"
- **Solution**: Logged user input to daily file with timestamp.
- **Outcome**: User prompt captured for team visibility and session tracking.
- **Files**: logs/${today}.md, .claude/logs/${today}.md

`;

    await this.writeToLogFile(logsDir, today, entry);
  }

  /**
   * Log tool usage to daily markdown file - always to .claude/logs
   */
  async logToolUsage(toolName: string, toolInput: any, toolResponse: any): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().slice(0, 5);
    const logsDir = path.join(this.baseDir, '.claude', 'logs');

    let entry = `### ${time} - Tool Usage: ${toolName}\n`;

    // Add tool-specific details
    entry += this.formatToolDetails(toolName, toolInput);

    // Add result status
    entry += this.formatToolResult(toolResponse);

    entry += `- **Files**: logs/${today}.md, .claude/logs/${today}.md\n\n`;

    await this.writeToLogFile(logsDir, today, entry);
  }

  /**
   * Format tool-specific details
   */
  private formatToolDetails(toolName: string, toolInput: any): string {
    if (toolName === 'Edit' && toolInput?.file_path) {
      return `- **File**: ${toolInput.file_path}\n- **Action**: Modified file content\n`;
    }
    
    if (toolName === 'Write' && toolInput?.file_path) {
      return `- **File**: ${toolInput.file_path}\n- **Action**: Created/updated file\n`;
    }
    
    if (toolName === 'Bash' && toolInput?.command) {
      return `- **Command**: \`${toolInput.command}\`\n- **Action**: Executed shell command\n`;
    }
    
    if (toolName === 'Read' && toolInput?.file_path) {
      return `- **File**: ${toolInput.file_path}\n- **Action**: Read file content\n`;
    }
    
    if (toolName === 'Grep' && toolInput?.pattern) {
      return `- **Pattern**: ${toolInput.pattern}\n- **Path**: ${toolInput.path || 'current directory'}\n- **Action**: Searched for content\n`;
    }
    
    return `- **Action**: Used ${toolName} tool\n`;
  }

  /**
   * Format tool result status
   */
  private formatToolResult(toolResponse: any): string {
    if (toolResponse && typeof toolResponse === 'object') {
      if ('stdout' in toolResponse && toolResponse.stdout) {
        return '- **Result**: Command completed successfully\n';
      }
      if ('stderr' in toolResponse && toolResponse.stderr) {
        return '- **Result**: Command completed with warnings/errors\n';
      }
      return '- **Result**: Tool executed successfully\n';
    }
    return '- **Result**: Tool executed\n';
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