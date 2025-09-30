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