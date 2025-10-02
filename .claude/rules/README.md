# Rules Directory

Purpose
- Capture project-specific behavior guidelines for the assistant operating under `.agents/.claude`.
- Define communication, planning, and safe execution aligned with this workspace.

Scope
- Communication conventions and tone for this project.
- Workflow patterns (plans, tool usage, validation, when to ask for approval).
- Safety and code-quality guardrails specific to this repo.

Not included
- Feature or product docs (use `../docs/`).
- References, roadmaps, or architectural write-ups (use `../docs/`).

Organization
- `communication.md` — style, defaults, escalation.
- `workflow.md` — plan cadence, patch practices, validation.
- Add topic-focused rule files as needed; keep them concise.

Usage
- Follow these rules by default; they reflect local practice.
- User instructions override rules if they conflict.

Maintaining rules
- Keep content short and actionable with brief rationale.
- Prefer examples over long prose.
- Update related docs/tests when rules affect process.

Relationship to docs
- Rules = how we work.
- Docs = how things work (`../docs/`).

