# .agents Boilerplate for AI Configs

This document explains how the `.agents` repository provides a reusable AI configuration boilerplate that can be consumed from this project’s `.claude/` directory without modifying project code.

## Purpose
- Centralize Claude Code configuration and subagents in a portable repo (`.agents`)
- Reuse across projects by syncing selected files into `<repo>/.claude/`
- Keep project-specific docs and settings in the project’s `.claude/`

## What’s Synced
- `agents/prompt-logger.md` – Subagent that appends a formatted log entry after each prompt
- `docs/logging-guide.md` – Comprehensive guide for agent-based logging

## What Stays Project-Specific
- `docs/` – Architecture, migration docs, and feature notes
- `logs/` – Daily logs (`.claude/logs/YYYY-MM-DD.md`)
- `settings.json` – Project-level Claude Code hook/tool configuration

## Usage
1. Select the `prompt-logger` subagent when working in Claude Code
2. The agent appends a new entry to `.claude/logs/YYYY-MM-DD.md` after each prompt
3. Optionally expand the entry (Result/Files) manually as work completes

## Sync Workflow
- Manual: copy files from `.agents/.claude/` into `<repo>/.claude/`
- Recommended: keep changes minimal and documented in PRs

## References
- `.agents/.claude/agents/prompt-logger.md`
- `.agents/.claude/docs/logging-guide.md`
