/**
 * SessionAggregator - Transforms session data into structured daily log format
 *
 * Generates comprehensive daily log entries matching the format in 2025-10-02.md
 * - Single daily header
 * - Cumulative summary (all sessions combined)
 * - Truncated prompts for readability
 */

import type { SessionData } from './sessionState';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import * as path from 'node:path';

interface SessionSummary {
  date: string;
  title: string;
  summary: string;
  tasksCompleted: string[];
  technicalWork: TechnicalWorkEntry[];
  filesModified: string[];
  toolsUsed: { tool: string; count: number }[];
  duration: string;
  sessionStartTime: string;
}

interface TechnicalWorkEntry {
  category: string;
  tasks: Array<{
    prompt: string;
    files: string[];
  }>;
}

interface DailyLog {
  title: string;
  summary: string;
  tasks: string[];
  technicalWork: Map<string, Array<{ prompt: string; files: string[] }>>;
  filesModified: Set<string>;
  toolsUsed: Map<string, number>;
  sessionStartTime: string;
}

export class SessionAggregator {
  private baseDir: string;

  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
  }

  /**
   * Generate structured session summary from session data
   */
  generateSummary(session: SessionData): SessionSummary {
    const tasks = session.tasks || [];

    return {
      date: this.formatDate(session.startTime),
      title: this.generateTitle(tasks),
      summary: this.generateOneLiner(tasks, session),
      tasksCompleted: tasks.map(t => this.truncatePrompt(t.prompt)),
      technicalWork: this.groupByCategory(tasks, session.filesModified),
      filesModified: session.filesModified || [],
      toolsUsed: this.summarizeTools(session.toolsUsed || []),
      duration: this.calculateDuration(session.startTime),
      sessionStartTime: session.startTime,
    };
  }

  /**
   * Write session summary to daily log file
   * This reads existing log, merges with new data, and overwrites with cumulative summary
   */
  async writeToLog(summary: SessionSummary): Promise<void> {
    const logsDir = path.join(this.baseDir, '.claude', 'logs');
    const logFile = path.join(logsDir, `${summary.date}.md`);
    const stateFile = path.join(logsDir, `${summary.date}.state.json`);

    try {
      await mkdir(logsDir, { recursive: true });

      // Read existing log if it exists
      const existingLog = await this.readExistingLog(logFile);

      // Merge with new session data
      const mergedLog = this.mergeLogs(existingLog, summary);

      // Generate complete daily log
      const content = this.formatDailyLog(mergedLog, summary.date);

      // Overwrite log file with cumulative summary
      await writeFile(logFile, content, 'utf-8');

      // Save state for next merge
      const stateData = {
        title: mergedLog.title,
        summary: mergedLog.summary,
        tasks: mergedLog.tasks,
        technicalWork: Object.fromEntries(mergedLog.technicalWork),
        filesModified: Array.from(mergedLog.filesModified),
        toolsUsed: Object.fromEntries(mergedLog.toolsUsed),
        sessionStartTime: mergedLog.sessionStartTime,
      };
      await writeFile(stateFile, JSON.stringify(stateData, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to write session summary:', error);
    }
  }

  /**
   * Read existing daily log state from JSON file
   */
  private async readExistingLog(logFile: string): Promise<DailyLog | null> {
    const stateFile = logFile.replace('.md', '.state.json');

    try {
      const content = await readFile(stateFile, 'utf-8');
      const data = JSON.parse(content);

      return {
        title: data.title,
        summary: data.summary,
        tasks: data.tasks || [],
        technicalWork: new Map(Object.entries(data.technicalWork || {})),
        filesModified: new Set(data.filesModified || []),
        toolsUsed: new Map(Object.entries(data.toolsUsed || {})),
        sessionStartTime: data.sessionStartTime,
      };
    } catch {
      // State file doesn't exist or is invalid - this is first session of the day
      return null;
    }
  }

  /**
   * Merge existing log with new session data
   */
  private mergeLogs(existingLog: DailyLog | null, newSummary: SessionSummary): DailyLog {
    if (!existingLog) {
      // First session of the day - create new log
      const technicalWork = new Map<string, Array<{ prompt: string; files: string[] }>>();

      for (const category of newSummary.technicalWork) {
        technicalWork.set(category.category, category.tasks);
      }

      const toolsUsed = new Map<string, number>();
      for (const tool of newSummary.toolsUsed) {
        toolsUsed.set(tool.tool, tool.count);
      }

      return {
        title: newSummary.title,
        summary: newSummary.summary,
        tasks: newSummary.tasksCompleted,
        technicalWork,
        filesModified: new Set(newSummary.filesModified),
        toolsUsed,
        sessionStartTime: newSummary.sessionStartTime,
      };
    }

    // Merge with existing log
    const merged: DailyLog = {
      title: existingLog.title,
      summary: existingLog.summary,
      tasks: [...existingLog.tasks, ...newSummary.tasksCompleted],
      technicalWork: new Map(existingLog.technicalWork),
      filesModified: new Set(existingLog.filesModified),
      toolsUsed: new Map(existingLog.toolsUsed),
      sessionStartTime: existingLog.sessionStartTime,
    };

    // Merge technical work
    for (const category of newSummary.technicalWork) {
      const existing = merged.technicalWork.get(category.category) || [];
      merged.technicalWork.set(category.category, [...existing, ...category.tasks]);
    }

    // Merge files
    for (const file of newSummary.filesModified) {
      merged.filesModified.add(file);
    }

    // Merge tools
    for (const tool of newSummary.toolsUsed) {
      merged.toolsUsed.set(tool.tool, (merged.toolsUsed.get(tool.tool) || 0) + tool.count);
    }

    // Update summary to reflect cumulative work
    merged.summary = `Completed ${merged.tasks.length} task${merged.tasks.length !== 1 ? 's' : ''}, modified ${merged.filesModified.size} file${merged.filesModified.size !== 1 ? 's' : ''}`;

    return merged;
  }

  /**
   * Format complete daily log with header
   */
  private formatDailyLog(log: DailyLog, date: string): string {
    let output = `# ${date} - ${log.title}\n\n`;

    output += `## 🎯 Session Summary\n${log.summary}\n\n`;

    // Tasks Completed
    output += `## 📋 Tasks Completed\n`;
    for (const task of log.tasks) {
      output += `- [x] ${task}\n`;
    }
    output += '\n';

    // Technical Work
    if (log.technicalWork.size > 0) {
      output += `## 🔧 Technical Work\n\n`;

      for (const [category, tasks] of log.technicalWork.entries()) {
        output += `**${category}**:\n`;
        for (const task of tasks) {
          output += `- ${task.prompt}\n`;
          if (task.files.length > 0) {
            output += `  - Files: ${task.files.map(f => `\`${this.shortenPath(f)}\``).join(', ')}\n`;
          }
        }
        output += '\n';
      }
    }

    // Files Modified
    if (log.filesModified.size > 0) {
      const filesArray = Array.from(log.filesModified);
      output += `## 📝 Files Modified (${filesArray.length})\n`;
      const grouped = this.groupFilesByType(filesArray);
      for (const [type, files] of Object.entries(grouped)) {
        output += `- **${type}**: ${files.map(f => `\`${this.shortenPath(f)}\``).join(', ')}\n`;
      }
      output += '\n';
    }

    // Tools Used
    if (log.toolsUsed.size > 0) {
      output += `## 🛠️ Tools Used\n`;
      const sortedTools = Array.from(log.toolsUsed.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      for (const [tool, count] of sortedTools) {
        output += `- ${tool}: ${count} time${count !== 1 ? 's' : ''}\n`;
      }
      output += '\n';
    }

    // Footer
    const duration = this.calculateDuration(log.sessionStartTime);
    output += `**Duration**: ${duration}\n\n`;
    output += `---\n`;

    return output;
  }

  /**
   * Truncate prompt to 100 characters for readability
   */
  private truncatePrompt(prompt: string): string {
    const maxLength = 100;
    if (prompt.length <= maxLength) return prompt;

    return prompt.substring(0, maxLength - 3) + '...';
  }

  /**
   * Generate session title from tasks
   */
  private generateTitle(tasks: Array<{ prompt: string; category: string }>): string {
    if (tasks.length === 0) return 'Development Session';

    const categories = new Map<string, number>();
    for (const task of tasks) {
      categories.set(task.category, (categories.get(task.category) || 0) + 1);
    }

    const topCategory = Array.from(categories.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Development';

    // Try to extract key terms from prompts
    const allPrompts = tasks.map(t => t.prompt.toLowerCase()).join(' ');
    if (allPrompts.includes('test')) return `${topCategory} - Testing`;
    if (allPrompts.includes('conflict')) return `${topCategory} - Merge Conflicts`;
    if (allPrompts.includes('chatinfo')) return `${topCategory} - ChatInfo Work`;
    if (allPrompts.includes('logging')) return `${topCategory} - Logging System`;

    return topCategory;
  }

  /**
   * Generate one-liner summary
   */
  private generateOneLiner(tasks: Array<{ prompt: string }>, session: SessionData): string {
    const taskCount = tasks.length;
    const fileCount = session.filesModified?.length || 0;

    if (taskCount === 0) return 'Session completed with no tasks recorded';
    if (taskCount === 1) {
      return `Completed: ${this.truncatePrompt(tasks[0].prompt)}`;
    }

    return `Completed ${taskCount} task${taskCount !== 1 ? 's' : ''}, modified ${fileCount} file${fileCount !== 1 ? 's' : ''}`;
  }

  /**
   * Group tasks by category
   */
  private groupByCategory(tasks: Array<{ prompt: string; category: string }>, filesModified: string[]): TechnicalWorkEntry[] {
    const categoryMap = new Map<string, Array<{ prompt: string; files: string[] }>>();

    for (const task of tasks) {
      if (!categoryMap.has(task.category)) {
        categoryMap.set(task.category, []);
      }

      categoryMap.get(task.category)!.push({
        prompt: this.truncatePrompt(task.prompt),
        files: [],
      });
    }

    return Array.from(categoryMap.entries()).map(([category, tasks]) => ({
      category,
      tasks,
    }));
  }

  /**
   * Summarize tools used
   */
  private summarizeTools(toolsUsed: Array<{ tool: string; details: string }>): Array<{ tool: string; count: number }> {
    const toolCounts = new Map<string, number>();

    for (const tool of toolsUsed) {
      toolCounts.set(tool.tool, (toolCounts.get(tool.tool) || 0) + 1);
    }

    return Array.from(toolCounts.entries())
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Calculate session duration
   */
  private calculateDuration(startTime: string): string {
    const start = new Date(startTime);
    const end = new Date();
    const durationMs = end.getTime() - start.getTime();

    const minutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  }

  /**
   * Format date as YYYY-MM-DD
   */
  private formatDate(isoString: string): string {
    return new Date(isoString).toISOString().split('T')[0];
  }

  /**
   * Shorten file path for display
   */
  private shortenPath(filePath: string): string {
    // Remove base directory if present
    const relativePath = filePath.replace(this.baseDir, '').replace(/^\//, '');
    return relativePath;
  }

  /**
   * Group files by type
   */
  private groupFilesByType(files: string[]): Record<string, string[]> {
    const groups: Record<string, string[]> = {
      'Tests': [],
      'Components': [],
      'Hooks': [],
      'Services': [],
      'Config': [],
      'Other': [],
    };

    for (const file of files) {
      if (file.includes('test') || file.includes('spec')) {
        groups['Tests'].push(file);
      } else if (file.includes('/ui/') || file.includes('component')) {
        groups['Components'].push(file);
      } else if (file.includes('/hooks/') || file.includes('use')) {
        groups['Hooks'].push(file);
      } else if (file.includes('/services/') || file.includes('/api/')) {
        groups['Services'].push(file);
      } else if (file.includes('config') || file.includes('settings') || file.includes('.json')) {
        groups['Config'].push(file);
      } else {
        groups['Other'].push(file);
      }
    }

    // Remove empty groups
    return Object.fromEntries(
      Object.entries(groups).filter(([, files]) => files.length > 0)
    );
  }
}

// Export singleton instance
export const sessionAggregator = new SessionAggregator();
