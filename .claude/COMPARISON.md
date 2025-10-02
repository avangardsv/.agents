# 📊 Structure Comparison: .agents vs Main Project

This document explains the relationship between `.agents/.claude/` and the main project's `.claude/` folders.

## Two Separate Systems

```
gamblerstv-web/
├── .agents/.claude/           # Boilerplate (this folder)
│   └── logs/                  # Auto-generated + manual
│       ├── README.md          # Simplified structure
│       ├── TEMPLATE.md        # Concise format
│       └── YYYY-MM-DD.md      # Hook-generated logs
│
└── .claude/                   # Main project docs
    └── logs/                  # Manual, detailed
        ├── README.md          # Full structure
        ├── TEMPLATE.md        # Rich format
        └── YYYY-MM-DD.md      # Detailed session logs
```

## When to Use Each

### Use `.agents/.claude/` for:
- ✅ **Reusable automation** - Hook system, rules, workflows
- ✅ **Cross-project patterns** - Communication style, safety rules
- ✅ **Auto-logging** - Hook-generated session tracking
- ✅ **Quick references** - What/Result/Files format

**Format**: Concise, hook-compatible, automation-friendly

### Use `.claude/` (main project) for:
- ✅ **Project documentation** - Architecture, system docs
- ✅ **Detailed session logs** - Complex debugging, decisions
- ✅ **Feature documentation** - ChatInfo migration, streaming docs
- ✅ **Team knowledge** - What/Why/How/Result format

**Format**: Detailed, context-rich, human-readable

## Log Format Comparison

### .agents/.claude/logs/ (Simplified)

```markdown
### 14:30 - ChatInfo Fix
**What**: Fixed error handling in ChatMessage
**Result**: Tests passing (25/25)
**Files**: features/chat/ui/ChatMessage/ChatMessage.tsx:123
```

**Best for**: Quick tracking, auto-generation, searchability

### .claude/logs/ (Detailed)

```markdown
### ChatInfo Context Migration
**What**: Migrated chat error/info messages from component-level state to centralized context
**Why**: Eliminate prop drilling, provide consistent UX, enable easier testing
**How**: Created ChatInfoContext with auto-dismiss, container scoping, variant support
**Result**: 3,389/3,399 tests passing (99.7%)

**Key Changes**:
- features/chat/context/ChatInfoContext.tsx - New context implementation
- features/chat/ui/Chat/Chat.tsx:84 - Added ChatInfoProvider
```

**Best for**: Understanding decisions, complex work, team communication

## Quick Decision Guide

**If the work is:**
- Automated by hooks → `.agents/.claude/logs/` (auto-generated)
- Significant session (>30min) → Both (manual entry in each)
- Cross-project pattern → `.agents/.claude/` only
- Project-specific feature → `.claude/` only

**Examples:**

| Task | .agents/.claude/ | .claude/ |
|------|------------------|----------|
| Hook auto-logs user prompt | ✅ Auto | ❌ Skip |
| 2-hour debugging session | ✅ Brief | ✅ Detailed |
| New rule added | ✅ Document | ❌ Skip |
| ChatInfo migration | ❌ Skip | ✅ Document |
| Daily automated logging | ✅ Auto | ❌ Skip |

## Copying Boilerplate to New Projects

When using this boilerplate in a new project:

1. **Copy the entire `.agents/.claude/` structure**
   ```bash
   cp -r .agents/.claude/ /new-project/.claude/
   ```

2. **The hooks will auto-generate logs** using simplified format

3. **For detailed project docs**, create separate files in new project:
   - Project-specific architecture docs
   - Feature documentation
   - Detailed session logs

4. **Keep both systems** if needed:
   - `.claude/` for project specifics
   - `.agents/.claude/` for automation (if you keep .agents folder)

## Best Practices

### ✅ Do
- Use `.agents/.claude/` for patterns that work across projects
- Use `.claude/` for project-specific deep documentation
- Let hooks handle auto-logging in `.agents/.claude/logs/`
- Add manual entries to both when doing significant work

### ❌ Don't
- Duplicate content between both systems
- Put project-specific docs in `.agents/` (it's for reuse)
- Modify hook-generated logs manually
- Mix the two formats within the same file

---

**Version**: 1.0
**Last Updated**: 2025-10-02
**See Also**: `.agents/.claude/STRUCTURE.md`, `.claude/STRUCTURE.md`
