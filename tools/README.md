# Tool-Specific Adapters

Tool-specific implementations and adapters for universal patterns.

## Purpose

This directory contains tool-specific implementations that adapt universal patterns (from `../patterns/`) to specific AI tools.

## Structure

```
tools/
├── README.md              # This file
├── base.md                # Base tool interface (planned)
├── claude-code/           # Claude Code adapters
│   ├── adapter.md         # How to adapt patterns
│   ├── hooks.md           # Hook implementation
│   └── settings.md        # Settings configuration
└── cursor/                # Cursor adapters (planned)
    └── adapter.md
```

## How It Works

1. **Universal Pattern** - Defined in `../patterns/`
2. **Tool Adapter** - Maps pattern to tool-specific implementation
3. **Implementation** - Actual code/config for the tool

## Adding a New Tool

1. Create `tools/{tool-name}/` directory
2. Create `adapter.md` explaining:
   - How the tool reads rules/prompts
   - How to implement hooks
   - How to configure settings
   - How to adapt universal patterns
3. Add tool-specific implementations
4. Update this README

## Current Tools

### Claude Code

- **Adapter**: `claude-code/adapter.md` - How to adapt patterns
- **Hooks**: `claude-code/hooks.md` - Hook implementation blueprint
- **Settings**: `claude-code/settings.md` - Settings.json configuration

### Cursor

- **Status**: Planned
- **Adapter**: Coming soon

## Usage

When setting up a new project:

1. Copy universal content: `cp -r ../patterns /path/to/project/.agents/`
2. Copy tool adapter: `cp -r tools/{your-tool} /path/to/project/.{tool}/`
3. Follow adapter guide to implement patterns
4. Customize as needed

## Related

- [patterns/](../patterns/) - Universal patterns
- [prompts/](../prompts/) - Reusable prompts
- [rules/](../rules/) - Universal rules
