# .agents Claude Workspace

This directory contains a reusable Claude configuration and content that can be synced into application projects under their `.claude/` folders.

What’s here
- `agents/` — Subagents for Claude Code
  - `prompt-logger.md` — Append a structured log entry after each user prompt
- `docs/` — Guides and notes supporting these agents
  - `logging-guide.md` — How the logging agent creates/appends daily logs
- `logs/` — Example daily logs and templates
- `hooks/` — Minimal hooks (not required for logging)
- `rules/` — Communication and workflow guidelines
- `session/` — Hook session persistence (if you use hooks)
- `settings.json` — Hook/tool configuration used by Claude Code

Usage in a project
- Copy selected files into the project’s `.claude/` directory:
  - `agents/prompt-logger.md`
  - `docs/logging-guide.md`
- Optional: add a project doc explaining how `.agents` integrates (see `agents-boilerplate.md` example added to projects)

Daily logging
- The `prompt-logger` agent writes to `<repo>/.claude/logs/YYYY-MM-DD.md`
- If the file doesn’t exist, it creates `# YYYY-MM-DD - Daily Log` and appends an entry:
  - `### HH:MM - <Title>`
  - `What / Why / How / Result / Files`

Notes
- We favor subagents for logging rather than hooks to keep projects simple and portable.
- Hooks are available if you need event interception, but not required for the logging flow.
