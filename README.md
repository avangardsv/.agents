# AI Agents Boilerplate

This is a boilerplate repository for different AI agents that can be easily cloned and used across projects. Currently set up especially for interaction with Claude Code, with plans to expand to other AI systems.

## Quick Setup

```bash
# Clone this repository structure to your project
cp -r .claude/ /path/to/your/project/

# Or use git
git clone <this-repo> your-project-agents
cd your-project-agents
cp -r .claude/ ../your-project/
```

## What's Included

### 📁 `.claude/` Directory Structure

```
.claude/
├── agents/                # 🤖 Autonomous AI agent definitions
│   └── README.md         # Agent development roadmap and planning
├── rules/                 # AI behavior rules and guidelines
│   ├── communication.md   # Communication style and verbosity
│   ├── README.md         # Rules system overview
│   └── workflow.md        # Task management patterns
├── hooks/                 # 🔥 TypeScript hooks for Claude Code
│   ├── index.ts          # Main hook configuration
│   ├── lib.ts            # Hook infrastructure
│   ├── session.ts        # Session persistence
│   ├── biome.json        # Code formatting configuration
│   ├── package.json      # Bun dependencies
│   ├── tsconfig.json     # TypeScript configuration
│   └── README.md         # Hook system documentation
├── services/              # Shared service modules
│   └── logger.ts         # Centralized logging service
├── workflows/             # Workflow templates and patterns
│   └── README.md         # Workflow definitions
├── docs/                  # Documentation and roadmaps
│   ├── README.md         # Documentation index
│   ├── ROADMAP.md        # Development roadmap
│   └── IMPROVEMENTS.md   # Enhancement tracking
├── logs/                  # 📝 Session logs (auto + manual)
│   ├── README.md         # Log navigation and usage
│   ├── TEMPLATE.md       # Template for manual entries
│   └── YYYY-MM-DD.md     # Daily session logs (structured format)
├── session/               # Session state persistence
│   └── [session-id].json # Individual session data
├── exports/               # Claude Code conversation exports
│   └── README.md         # Export guidelines
├── STRUCTURE.md           # 📊 Complete structure guide
└── settings.json          # Claude Code configuration
```

## Current Focus: Claude Code Integration

This boilerplate is currently optimized for **Claude Code** with:

- ✅ **TypeScript Hooks** - Full integration with Claude Code pipeline
- ✅ **Auto-logging** - Captures interactions via centralized logger service
- ✅ **Session tracking** - JSON-based session persistence in `.claude/session/`
- ✅ **Daily logs** - Structured markdown logs in `.claude/logs/`
- ✅ **Quality rules** - Security and code standards
- ✅ **Communication guidelines** - Consistent AI behavior
- ✅ **Services architecture** - Modular logging and utilities

## Usage Patterns

### For New Projects

```bash
# Copy the entire .claude structure
cp -r .claude/ /path/to/new-project/

# Hooks activate automatically with Claude Code
```

### For Existing Projects

```bash
# Selectively copy what you need
cp -r .claude/rules /path/to/project/.claude/
cp -r .claude/hooks /path/to/project/.claude/
```

## Hook System Setup

### Prerequisites

- **Bun** installed (fast JavaScript runtime)
- **Claude Code** with hooks support

### Quick Start

```bash
# Navigate to hooks directory
cd .claude/hooks

# Hooks run automatically when Claude Code is active
```

### What It Does

- 🪝 **Intercepts every user prompt** and tool usage
- 📝 **Auto-creates logs** in `.claude/logs/YYYY-MM-DD.md`
- 💾 **Persists sessions** as JSON in `.claude/session/`
- 🎯 **Structured logging** via centralized Logger service
- ⚡ **Fast execution** with Bun runtime
- 🔧 **Extensible** - Full TypeScript support

## Future AI Systems

This boilerplate will expand to support:

- **Gemini CLI** - Google's AI system
- **OpenAI API** - ChatGPT integration
- **Local models** - Ollama, LM Studio
- **Custom agents** - Project-specific AI workflows

Each AI system will have its own optimized configuration while maintaining the same core structure.

## Key Features

### 🔧 **Rules System**

Standardized AI behavior patterns:

- Communication style (concise, direct)
- Owner engineering preferences
- Quality standards (security-first)
- Workflow patterns (TodoWrite usage)

### 📝 **Automatic Logging System**

Comprehensive session tracking:

- Centralized Logger service (`.claude/services/logger.ts`)
- Daily markdown logs (`.claude/logs/YYYY-MM-DD.md`)
- Session JSON persistence (`.claude/session/*.json`)
- Tool usage tracking
- Structured, AI-readable format
- **Simplified structure** - What/Result/Files format (see `.claude/logs/README.md`)

### 📚 **Documentation System**

Ready-to-use documentation:

- Agent development roadmap (`.claude/docs/ROADMAP.md`)
- Improvements tracking (`.claude/docs/IMPROVEMENTS.md`)
- Agent planning (`.claude/agents/README.md`)
- Workflow templates (`.claude/workflows/README.md`)
- Best practices from real usage

## Customization

### Project-Specific Rules

Edit files in `.claude/rules/` to match your:

- Project requirements
- Team standards
- Compliance needs
- Technology stack

### Hook Customization

Modify `.claude/hooks/index.ts` for:

- Different logging formats
- Custom automation triggers
- Integration with external systems
- Team-specific workflows

### Logger Customization

Extend `.claude/services/logger.ts` for:

- Custom log formatting
- Additional log destinations
- Tool-specific logging logic
- Integration with monitoring systems

## Best Practices

### Implementation

1. **Start simple** - Use basic logging and rules first
2. **Hooks auto-start** - Activate automatically with Claude Code
3. **Maintain consistency** - Use same patterns across projects
4. **Document changes** - Keep customizations tracked

### Maintenance

- **Version control** - Track changes to rules and workflows
- **Regular updates** - Refine based on usage lessons
- **Share improvements** - Contribute back to boilerplate
- **Test thoroughly** - Validate configurations before deployment

## Contributing

This boilerplate improves through real usage. Please contribute:

- New AI system integrations
- Improved hook implementations
- Better rule definitions
- Usage pattern documentation

## Project Structure

Additional files in repository root:

- `CLAUDE.md` - AI assistant instructions for this repository
- `temp/` - Temporary working directory

## License

Open source - use freely across projects and teams.


## Claude Subagents (Logging)

- Use `/.claude/agents/prompt-logger.md` to append a structured entry to `/.claude/logs/YYYY-MM-DD.md` after each prompt.
- Entry structure mirrors your example: Title + What/Why/How/Result/Files.
- See `/.claude/docs/logging-guide.md` for exact steps and formatting.

## Sync To Project `.claude/`

- Copy these into the target project’s `.claude/`:
  - `agents/prompt-logger.md`
  - `docs/logging-guide.md`
  - Optionally: `docs/agents-boilerplate.md`
- Example:
  - `cp -f .claude/agents/prompt-logger.md /path/to/project/.claude/agents/`
  - `cp -f .claude/docs/logging-guide.md /path/to/project/.claude/docs/`

## Branch Docs (Example)

- For branches like `poc/vod-chat-replay`, add a project doc: `/.claude/docs/branch-poc-vod-chat-replay.md` with goals, status, testing, next steps.

---
