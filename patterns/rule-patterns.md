# Universal Rule Patterns

Common rule structures for AI behavior guidelines.

## Overview

Rules define how AI assistants should behave. These patterns work across tools, though each tool may implement them differently.

## Rule Categories

### 1. Communication Rules

**Pattern**: Define tone, verbosity, and interaction style.

**Structure**:
```
Communication Style:
- Tone: [professional/casual/technical]
- Verbosity: [concise/detailed]
- Format: [code-first/explanatory]
- Examples: [good/bad examples]
```

**See**: `../rules/communication.md` for full implementation.

### 2. Workflow Rules

**Pattern**: Define task management and execution patterns.

**Structure**:
```
Workflow:
- Task Planning: [when/how to plan]
- Tool Usage: [which tools to use]
- Validation: [how to verify]
- Error Handling: [how to recover]
```

**See**: `../rules/workflow.md` for full implementation.

### 3. Safety Rules

**Pattern**: Prevent dangerous operations.

**Structure**:
```
Safety:
- Blocked Commands: [dangerous operations]
- Confirmation Required: [risky operations]
- Validation: [safety checks]
- Rollback: [recovery procedures]
```

### 4. Quality Rules

**Pattern**: Enforce code and documentation standards.

**Structure**:
```
Quality:
- Code Standards: [style, patterns]
- Documentation: [what/how to document]
- Testing: [test requirements]
- Review: [review criteria]
```

**See**: `../prompts/code-guidelines.md` for code standards.

## Rule Composition

Rules can be composed hierarchically:

```
Base Rules (universal)
  └── Project Rules (customized)
      └── Feature Rules (specific)
```

**Example**:
```
Universal: "Be concise"
Project: "Use technical terms for this team"
Feature: "Include API examples for this endpoint"
```

## Implementation Guide

### Step 1: Start with Universal Rules

Use rules from `../rules/` as base:
- `communication.md` - How to communicate
- `workflow.md` - How to work

### Step 2: Customize for Your Project

Add project-specific rules:
- Coding standards
- Team conventions
- Domain-specific patterns

### Step 3: Add Feature-Specific Rules

For specific features:
- API design rules
- UI component rules
- Database rules

### Step 4: Reference in Tool Configs

Each tool reads rules differently:
- Claude Code: `.agents/rules/*.md`
- Cursor: `.cursor/rules/*.md`
- See `../tools/{tool}/adapter.md` for specifics

## Rule Priority

When rules conflict:

1. **User instructions** - Highest priority
2. **Feature rules** - Most specific
3. **Project rules** - Project context
4. **Universal rules** - Default behavior

## Best Practices

1. **Keep Rules Concise** - One concept per rule
2. **Use Examples** - Show good/bad patterns
3. **Reference Related Rules** - Link to related content
4. **Version Rules** - Track changes over time
5. **Test Rules** - Verify they work as intended

## Common Patterns

### Pattern: "When to Use X"

```
Use [X] when:
- Condition 1
- Condition 2

Don't use [X] when:
- Condition 3
- Condition 4
```

### Pattern: "How to Do Y"

```
To do [Y]:
1. Step 1
2. Step 2
3. Step 3

Example:
[Concrete example]
```

### Pattern: "Standards for Z"

```
[Z] Standards:
- Requirement 1
- Requirement 2
- Requirement 3

See: [related documentation]
```

## Related

- [rules/](../rules/) - Full rule implementations
- [prompts/](../prompts/) - Prompt templates
- [tools/](../tools/) - Tool-specific rule loading
