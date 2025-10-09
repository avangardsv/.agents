# Comprehensive Logging Guide (Claude Subagent)

This guide describes a single subagent that writes logs after each prompt using the structure from your example file `.claude/logs/2025-10-02.md`. No hooks are required.

Outcome
- A daily file at `<repo>/.claude/logs/YYYY-MM-DD.md`.
- On the first prompt of the day, create a scaffolded file:
  - `# YYYY-MM-DD - <Daily Title>` (derive from first prompt)
  - Sections: Session Summary, Tasks Completed, Technical Work, Testing, Documentation, Related, Next Steps, Session Metrics, Key Decisions
- On every prompt, append a Technical Work entry: Title + What/Why/How/Result/Files.

Agent: `prompt-logger`
- Location: `.claude/agents/prompt-logger.md`
- Model: `haiku`
- Role: Create or append a formatted entry after each user prompt.

Entry Structure (per prompt, under Technical Work)
```
### HH:MM - <Short Title>
**What**: First line of the user’s prompt
**Why**: Reason/goal (if stated; otherwise brief inference or leave empty)
**How**: Planned steps (if present; otherwise leave empty)
**Result**: Pending
**Files**: backticked paths (optional)
```

Title Guidance
- ≤ 60 chars; summarize intent (e.g., “ChatInfo Migration Test Fixes”).
- Title Case preferred; avoid punctuation clutter.

Create vs. Append
- Create: If `<repo>/.claude/logs/YYYY-MM-DD.md` missing, create a file with header and all scaffold sections.
- Append: Insert the entry immediately after the `## 🔧 Technical Work` section (do not duplicate headings).

Bash Workflow (what the subagent executes)
```
# Resolve path
LOG_DIR="$(git rev-parse --show-toplevel)/.claude/logs"; TODAY=$(date +%F); LOG_FILE="$LOG_DIR/$TODAY.md";

# Ensure directory + scaffold
mkdir -p "$LOG_DIR";
if [ ! -f "$LOG_FILE" ]; then
  DAILY_TITLE="<derive from first prompt>"
  cat > "$LOG_FILE" <<EOF
# $TODAY - $DAILY_TITLE

## 🎯 Session Summary
(placeholder)

## 📋 Tasks Completed
- [ ]

## 🔧 Technical Work

## 🧪 Testing

## 📚 Documentation

## 🔗 Related

## ⏭️ Next Steps

## 📊 Session Metrics

## 💡 Key Decisions
EOF
fi

# Build fields
NOW=$(date +%H:%M)
TITLE="<derived short title>"
WHAT_LINE="<first line of prompt>"
WHY_LINE="<reason if available>"
HOW_LINE="<steps if available>"
FILES_LINE="<optional `path/to/file.ts:123` list>"

# Append entry block under Technical Work
awk -v now="$NOW" -v title="$TITLE" -v what="$WHAT_LINE" -v why="$WHY_LINE" -v how="$HOW_LINE" -v files="$FILES_LINE" '
  BEGIN{done=0}
  {
    print $0
    if (!done && $0 ~ /^## [[:space:]]*🔧 Technical Work/) {
      print "### " now " - " title
      print "**What**: " what
      print "**Why**: " why
      print "**How**: " how
      print "**Result**: Pending"
      print "**Files**: " files
      print ""
      done=1
    }
  }
' "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"
```

Good Practices
- Keep entries concise; use the big narrative sections (Summary, Technical Work) only when you choose to add them manually.
- Redact any secrets and avoid long outputs.
- Use backticked paths in Files for readability.

Common Variations
- If a prompt is a quick check (Investigation), you can leave Why/How empty.
- For multi-step work, add a final manual summary section at the end of the day.

Troubleshooting
- No file created: Ensure Claude has Bash tool access and the repo is a git repo (for `git rev-parse`).
- Wrong location: Confirm writing under `<repo>/.claude/logs/` only.
- Permissions: Ensure the workspace user can write to the repo.

Reference
- Example file: `.claude/logs/2025-10-02.md` (this agent’s per-prompt blocks mirror the “### HH:MM - …” sections).
