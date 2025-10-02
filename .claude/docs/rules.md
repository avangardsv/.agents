# Rules

This directory contains AI behavior rules and guidelines that standardize interactions across different projects and contexts.

## Purpose

Rules define how AI assistants should behave, communicate, and operate. They provide consistency and ensure quality standards are maintained across all AI-assisted development work.

## Current Rules

### `communication.md`
- Communication style guidelines
- Response format standards  
- Verbosity and clarity requirements
- Professional interaction patterns

### `owner-preferences.md`
- Engineering preferences and standards
- Code style requirements (TypeScript strict, ES Modules)
- Technology stack preferences
- Development workflow patterns

### `workflow.md`
- Task management patterns
- TodoWrite usage guidelines
- Progress tracking standards
- Session management practices

## Usage

Rules are automatically applied by:
- **Claude Code integration** - Rules are loaded from this directory
- **Hook system** - `../hooks/index.ts` can enforce rule compliance
- **Manual reference** - Developers can review for consistency

## Customization

### Project-Specific Rules
- Copy this directory to new projects
- Modify rules to match project requirements
- Add new rule files for specific domains
- Override sections as needed for compliance/team standards

### Rule Development
- Use clear, actionable language
- Provide examples where helpful
- Keep rules focused and specific
- Test rules with real usage scenarios

## Integration

Rules integrate with:
- **Hooks system** - Automatic enforcement via TypeScript
- **Documentation** - Referenced in project READMEs
- **Team workflows** - Shared standards across team members
- **Quality gates** - Automated checking and validation

These rules form the foundation for consistent, high-quality AI-assisted development across all projects using this boilerplate.