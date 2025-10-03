/**
 * SessionAggregator - Transforms session data into structured log format
 *
 * Generates daily log entries matching the format in 2025-10-02.md
 */

import type { SessionData } from './sessionState';
import { appendFile, mkdir } from 'node:fs/promises';
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
}

interface TechnicalWorkEntry {
  category: string;
  tasks: Array<{
    prompt: string;
    files: string[];
  }>;
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
      tasksCompleted: tasks.map(t => t.prompt),
      technicalWork: this.groupByCategory(tasks, session.filesModified),
      filesModified: session.filesModified || [],
      toolsUsed: this.summarizeTools(session.toolsUsed || []),
      duration: this.calculateDuration(session.startTime),
    };
  }

  /**
   * Write session summary to daily log file
   */
  async writeToLog(summary: SessionSummary): Promise<void> {
    const logsDir = path.join(this.baseDir, '.agents/.claude', 'logs');
    const logFile = path.join(logsDir, `${summary.date}.md`);

    const content = this.formatSummary(summary);

    try {
      await mkdir(logsDir, { recursive: true });
      await appendFile(logFile, content);
    } catch (error) {
      console.error('Failed to write session summary:', error);
    }
  }

  /**
   * Format session summary as markdown
   */
  private formatSummary(summary: SessionSummary): string {
    const { date, title, summary: oneLiner, tasksCompleted, technicalWork, filesModified, toolsUsed, duration } = summary;

    let output = `
## 🎯 Session Completed at ${new Date().toTimeString().slice(0, 5)}

**Summary**: ${oneLiner}

### 📋 Tasks Completed
${tasksCompleted.map(t => `- [x] ${t}`).join('\n')}

`;

    // Add Technical Work section if there's meaningful work
    if (technicalWork.length > 0) {
      output += `### 🔧 Technical Work\n\n`;

      for (const category of technicalWork) {
        output += `**${category.category}**:\n`;
        for (const task of category.tasks) {
          output += `- ${task.prompt}\n`;
          if (task.files.length > 0) {
            output += `  - Files: ${task.files.map(f => `\`${this.shortenPath(f)}\``).join(', ')}\n`;
          }
        }
        output += '\n';
      }
    }

    // Add Files Modified section
    if (filesModified.length > 0) {
      output += `### 📝 Files Modified (${filesModified.length})\n`;
      const grouped = this.groupFilesByType(filesModified);
      for (const [type, files] of Object.entries(grouped)) {
        output += `- **${type}**: ${files.map(f => `\`${this.shortenPath(f)}\``).join(', ')}\n`;
      }
      output += '\n';
    }

    // Add Tools Used section
    if (toolsUsed.length > 0) {
      output += `### 🛠️ Tools Used\n`;
      for (const tool of toolsUsed.slice(0, 10)) { // Top 10 tools
        output += `- ${tool.tool}: ${tool.count} times\n`;
      }
      output += '\n';
    }

    output += `**Duration**: ${duration}\n`;
    output += `\n---\n\n`;

    return output;
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
      return `Completed: ${tasks[0].prompt}`;
    }

    return `Completed ${taskCount} tasks, modified ${fileCount} files`;
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

      // Try to associate files with tasks (simplified - in reality would need better tracking)
      categoryMap.get(task.category)!.push({
        prompt: task.prompt,
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
