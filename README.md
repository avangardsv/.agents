# AI Agents Boilerplate

Reusable blueprints for AI assistant configurations. Documentation-only - no runtime files.

## Structure

**Note**: This repository uses `agents/` (visible folder) for easy Finder navigation. When copied to projects, it becomes `.agents/` (hidden folder in project root).

### Repository Structure (This Repo)
```
agents/                    # Visible folder (repo root)
├── agents/                # Agent definitions
├── prompts/               # Prompt templates
├── rules/                 # Behavior guidelines
├── patterns/              # Universal patterns
├── tools/                 # Tool-specific adapters
├── hooks/                 # Hook blueprints (legacy, see tools/)
├── settings/              # Config blueprints (legacy, see tools/)
├── templates/             # Doc templates
├── docs/                  # Project documentation
├── INDEX.md               # Content navigation
├── QUICKSTART.md          # Quick setup guide
├── CONTRIBUTING.md        # Contribution guidelines
├── package.json           # Version and metadata
├── CHANGELOG.md           # Version history (auto-generated)
└── README.md
```

### Project Structure (When Copied)
```
your-project/
├── .agents/               # Hidden folder (copied from this repo)
│   ├── agents/
│   ├── prompts/
│   ├── rules/
│   └── ...
└── ...
```

## Contents

| Folder | Purpose |
|--------|---------|
| `agents/` | AI subagent definitions |
| `prompts/` | Reusable prompts (code guidelines, review, debugging) |
| `rules/` | AI behavior rules (communication, workflow) |
| `patterns/` | Universal patterns (hooks, prompts, rules) |
| `tools/` | Tool-specific adapters and implementations |
| `templates/` | Document templates |
| `docs/` | Project documentation |

## Usage

### Copy to Project

**From this repo** (`agents/`) **to your project** (`.agents/`):

```bash
# Copy entire boilerplate
cp -r /path/to/agents /path/to/your-project/.agents

# Or copy specific folders
cp -r /path/to/agents/prompts /path/to/your-project/.agents/
cp -r /path/to/agents/rules /path/to/your-project/.agents/
```

**Note**: The folder name changes from `agents/` (visible in this repo) to `.agents/` (hidden in your project) when copied.

### Set Up AI Tool

1. Choose your AI tool (Claude Code, Cursor, etc.)
2. Read `tools/{your-tool}/adapter.md` for setup guide
3. Copy tool-specific configs to your project
4. Customize universal rules and prompts as needed

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

## Development

### Versioning

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated versioning and changelog generation.

```bash
# Install dependencies
npm install

# Create a new release (bumps version, updates CHANGELOG.md)
npm run version

# Release (version + push tags)
npm run release
```

### Validation

```bash
# Install dependencies first
npm install

# Validate markdown links and formatting
npm run validate

# Or run checks individually
npm run validate:links    # Check for broken links
npm run validate:markdown # Check markdown formatting
```

## Design Principles

- **Documentation-only** - No runtime configs, just blueprints
- **Tool-agnostic** - Reusable across AI tools
- **DRY** - Single source of truth for patterns
- **Flat structure** - Easy to navigate

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this boilerplate.
