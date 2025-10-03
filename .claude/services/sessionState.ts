/**
 * SessionState - Manages persistent state across hook invocations
 *
 * Each hook runs in a separate Bun process, so we need to persist state
 * to a shared file to track session data across UserPromptSubmit -> PostToolUse -> Stop
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import * as path from 'node:path';
import { existsSync } from 'node:fs';

export interface TaskData {
  prompt: string;
  category: string;
  timestamp: string;
  tools: string[];
  files: string[];
}

export interface SessionData {
  sessionId: string;
  startTime: string;
  tasks: TaskData[];
  filesModified: string[];
  toolsUsed: Array<{ tool: string; details: string; timestamp: string }>;
}

export class SessionState {
  private stateFile: string;
  private baseDir: string;

  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
    this.stateFile = path.join(baseDir, '.agents/.claude', 'session', '.current-session.json');
  }

  /**
   * Load current session state from file
   */
  async load(): Promise<SessionData> {
    try {
      if (!existsSync(this.stateFile)) {
        return this.createEmptySession();
      }

      const content = await readFile(this.stateFile, 'utf-8');
      const data = JSON.parse(content);

      // Validate structure
      if (!data.sessionId || !data.tasks) {
        console.warn('Invalid session state, creating new session');
        return this.createEmptySession();
      }

      return data;
    } catch (error) {
      console.error('Failed to load session state:', error);
      return this.createEmptySession();
    }
  }

  /**
   * Save session state to file atomically
   */
  async save(data: SessionData): Promise<void> {
    try {
      // Ensure directory exists
      const dir = path.dirname(this.stateFile);
      await mkdir(dir, { recursive: true });

      // Atomic write: write to temp file, then rename
      const tempFile = `${this.stateFile}.tmp`;
      await writeFile(tempFile, JSON.stringify(data, null, 2), 'utf-8');

      // Rename is atomic on most systems
      await writeFile(this.stateFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to save session state:', error);
      throw error;
    }
  }

  /**
   * Add a new task to the current session
   */
  async addTask(task: TaskData): Promise<void> {
    const session = await this.load();
    session.tasks.push(task);
    await this.save(session);
  }

  /**
   * Add tool usage to current session
   */
  async addToolUsage(tool: string, details: string, files?: string[]): Promise<void> {
    const session = await this.load();

    session.toolsUsed.push({
      tool,
      details,
      timestamp: new Date().toISOString(),
    });

    if (files && files.length > 0) {
      // Add to filesModified, avoiding duplicates
      const newFiles = files.filter(f => !session.filesModified.includes(f));
      session.filesModified.push(...newFiles);
    }

    await this.save(session);
  }

  /**
   * Clear session state (called on Stop hook)
   */
  async clear(): Promise<void> {
    try {
      if (existsSync(this.stateFile)) {
        // Instead of deleting, write empty session for next time
        await this.save(this.createEmptySession());
      }
    } catch (error) {
      console.error('Failed to clear session state:', error);
    }
  }

  /**
   * Create a new empty session
   */
  private createEmptySession(): SessionData {
    return {
      sessionId: this.generateSessionId(),
      startTime: new Date().toISOString(),
      tasks: [],
      filesModified: [],
      toolsUsed: [],
    };
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const sessionState = new SessionState();
