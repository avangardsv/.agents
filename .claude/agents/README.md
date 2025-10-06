# Agents

This directory contains autonomous AI agents that can be integrated into development workflows.

## Purpose

Agents are autonomous AI systems that can:
- Make decisions based on context
- Execute complex multi-step tasks
- Integrate with external systems
- Learn from past interactions

Unlike workflows (which are templates), agents are intelligent systems that adapt their behavior.

## Planned Agents

### Core Development Agents
- **Code Review Agent** - Automated code analysis and feedback
- **Documentation Generator Agent** - Auto-generate and maintain docs
- **Testing Orchestrator Agent** - Smart test management and execution
- **Git Workflow Manager Agent** - Intelligent git operations

### Logging Agent (New)
- **prompt-logger** - Creates or updates today’s log after each prompt in `.claude/logs/YYYY-MM-DD.md`, using the example-based structure (Title + What/Why/How/Result/Files). See `prompt-logger.md`.

### Specialized Agents
- **Environment Setup Agent** - Automated dev environment configuration
- **Dependency Analyzer Agent** - Monitor and manage project dependencies
- **Performance Monitor Agent** - Track and optimize project performance
- **Multi-AI Coordinator Agent** - Route tasks between different AI systems

### Project-Specific Agents
- **Boilerplate Generator Agent** - Create customized project templates
- **Hook Manager Agent** - Manage and customize Claude Code hooks
- **Rule Customization Agent** - Adapt AI behavior for different contexts
- **Context Preservation Agent** - Maintain state across AI sessions

## Implementation

Agents will be implemented as:
- **TypeScript classes** - Full-featured autonomous agents
- **Hook integrations** - Triggered by Claude Code events
- **API endpoints** - External system integration
- **Configuration files** - Customizable behavior patterns

## Current Status

🔄 **Planning Phase** - We provide a logging subagent without modifying hooks. Full autonomous agents are planned for future development phases.

See `../docs/agent-development-roadmap.md` for detailed implementation priorities and timeline.

## Integration with Hooks

The current hooks system (`../hooks/index.ts`) provides the foundation for agent development:
- Event interception and processing
- Session state management  
- Tool usage tracking
- File change monitoring

Future agents will build upon this foundation to provide more sophisticated autonomous behavior.
