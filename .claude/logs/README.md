# 📝 Session Logs

Auto-generated logs tracking Claude Code interactions.

## 📋 Log Files

```
logs/
├── README.md          # This file
├── TEMPLATE.md        # Template for manual entries
└── YYYY-MM-DD.md      # Daily session logs
```

## 🎯 Format

Each log entry follows this simplified structure:

```markdown
### HH:MM - [Category]
**What**: Brief description of the task
**Result**: Outcome or key finding
**Files**: Affected file paths
```

### Auto-Generated Categories
Hooks automatically categorize prompts by keywords:

- **Feature** - add, create, implement, build, new
- **Bug Fix** - fix, bug, error, issue, problem, broken
- **Refactor** - refactor, improve, optimize, clean, update
- **Testing** - test, spec, coverage
- **Documentation** - doc, documentation, readme, comment
- **Investigation** - check, show, list, view, read, get, find, search
- **Deployment** - deploy, build, release, publish
- **Task** - fallback for uncategorized prompts

## 📖 Usage

### Auto-generated Logs
Hooks automatically create entries when Claude Code runs. These capture:
- User prompts with timestamps
- Tool usage and results
- Session start/end

### Manual Entries
For significant work, add structured entries using TEMPLATE.md format:

```bash
# Reference template
cat .claude/logs/TEMPLATE.md
```

## 🔍 Finding Information

```bash
# View today's log
cat .claude/logs/$(date +%Y-%m-%d).md

# Search by keyword
grep -r "ChatInfo" .claude/logs/

# Recent logs
ls -lt .claude/logs/*.md | head -5
```

## 📊 Best Practices

### ✅ Good Entries
- Concise (1-3 lines per entry)
- Actionable file references (`path/to/file.ts:123`)
- Clear outcomes/results
- Searchable keywords

### ❌ Avoid
- Verbose explanations
- Duplicate timestamps
- Noise without value
- Generic "User interaction" entries

## 🔗 Related
- Main project logs: `../../../.claude/logs/`
- Session data: `.claude/session/`
- Hook config: `.claude/hooks/index.ts`
