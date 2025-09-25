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
├── rules/                 # AI behavior rules and guidelines
│   ├── communication.md   # Communication style and verbosity
│   ├── owner-preferences.md # Owner engineering preferences
│   └── workflow.md        # Task management patterns
├── hooks/                 # 🔥 TypeScript hooks for Claude Code
│   ├── index.ts          # Main hook configuration
│   ├── lib.ts            # Hook infrastructure
│   ├── session.ts        # Session persistence
│   └── package.json      # Bun dependencies
├── docs/                  # Documentation and roadmaps
│   └── agent-development-roadmap.md # Future development planning
├── logs/                  # 📝 Auto-generated session logs
│   └── YYYY-MM-DD.md     # Daily session logs (Variant B format)
├── exports/               # Claude Code conversation exports
└── settings.json          # Claude Code configuration
```

## Current Focus: Claude Code Integration

This boilerplate is currently optimized for **Claude Code** with:

- ✅ **TypeScript Hooks** - Full integration with Claude Code pipeline
- ✅ **Auto-logging** - Captures every interaction in structured format
- ✅ **Session tracking** - Time-based Variant B logging
- ✅ **Smart titles** - Automatic categorization of requests
- ✅ **Quality rules** - Security and code standards
- ✅ **Communication guidelines** - Consistent AI behavior

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

- 🪝 **Intercepts every user prompt**
- 📝 **Auto-creates logs** in `.claude/logs/YYYY-MM-DD.md`
- 🎯 **Generates smart titles** based on request content
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

- Time-based entries (`## HH:MM - Title`)
- Structured Variant B format
- TypeScript hooks for Claude Code
- AI-readable simple structure

### 📚 **Documentation System**

Ready-to-use documentation:

- Agent development roadmap
- Implementation guides
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

## License

Open source - use freely across projects and teams.

---

**Current Status**: ✅ Working TypeScript hooks for Claude Code  
**Next**: Gemini CLI and OpenAI integrations  
**Vision**: Universal AI agents boilerplate for any project
