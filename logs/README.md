# Logs

This directory contains automatically generated session logs from AI-assisted development work.

## Purpose

Comprehensive logging of AI interactions for:

- **Session tracking** - Complete record of development work
- **Decision documentation** - Why choices were made during development
- **Problem resolution** - How issues were identified and solved
- **Learning insights** - Patterns and improvements over time

## Log Format

### File Naming

- `YYYY-MM-DD.md` - Daily session logs
- Simple date-based naming for easy chronological access

### Content Format (Variant B)

```markdown
# Session Log

## HH:MM - Descriptive Title

**Request:** What was asked
**Actions:** What was done
**Files:** Files changed with line numbers  
**Tools:** Tools used (Write, Edit, Bash, etc.)
```

### Key Features

- **Time-based sections** - Chronological organization of work
- **Structured format** - Consistent, AI-readable format
- **Specific details** - File paths, line numbers, exact changes
- **Tool tracking** - Which development tools were used

## Automatic Generation

Logs are created automatically by:

- **Hooks system** - `../hooks/index.ts` intercepts every user prompt
- **Smart titles** - Automatic categorization based on request content
- **Real-time logging** - Entries created as work happens
- **No manual intervention** - Completely automated process

## Usage

### For Developers

- **Review progress** - See what was accomplished each day
- **Understand decisions** - Context for choices made during development
- **Track problems** - How issues were resolved
- **Plan next steps** - Build on previous work

### For Teams

- **Knowledge sharing** - Team members can see project evolution
- **Onboarding** - New team members understand project history
- **Quality assurance** - Review development practices and standards
- **Project documentation** - Automatic project history generation

### For Analysis

- **Development patterns** - Identify common tasks and optimizations
- **Tool effectiveness** - Which tools are most/least useful
- **Time tracking** - Understand development velocity
- **Quality metrics** - Code review outcomes and testing practices

## Log Management

### Retention

- Logs accumulate over time providing complete project history
- No automatic cleanup - git provides version control
- Archive older logs if needed for large projects

### Privacy

- Logs may contain sensitive project information
- Review before sharing outside team
- Consider .gitignore for confidential projects
- Logs are local-only unless committed to version control

## Integration

Logs integrate with:

- **Git workflow** - Correlate with commits and branches
- **Documentation** - Generate project timelines and changelogs
- **Project management** - Track feature development progress
- **Learning systems** - Analyze patterns for process improvement

These logs provide invaluable insights into the development process and serve as a complete record of AI-assisted project work.
