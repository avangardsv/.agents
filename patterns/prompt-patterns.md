# Universal Prompt Patterns

Reusable prompt structures that work across AI tools.

## Overview

These patterns provide templates for common prompt types. Adapt the structure to your specific needs and tool.

## Pattern Structure

All prompts follow this structure:

```
Context: [What the AI needs to know]
Task: [What to do]
Constraints: [Limitations/requirements]
Output: [Expected format]
```

## Code Review Pattern

**Structure**:
```
Review the following code for:
- Quality (clarity, naming, structure)
- Correctness (logic, edge cases, types)
- Performance (efficiency, memory)
- Security (vulnerabilities, validation)
- Maintainability (duplication, documentation)

Provide specific feedback with line references.
```

**Usage**: See `../prompts/code-review.md` for full template.

## Debugging Pattern

**Structure**:
```
Debug the following issue:
1. Reproduce the problem
2. Identify root cause
3. Propose minimal fix
4. Verify fix doesn't break other functionality

Include:
- Error messages/stack traces
- Affected code locations
- Proposed solution
- Test cases
```

**Usage**: See `../prompts/debugging.md` for full template.

## Code Generation Pattern

**Structure**:
```
Generate code that:
- Follows project conventions (see guidelines)
- Includes error handling
- Has appropriate type safety
- Includes basic tests

Requirements:
- [Specific requirements]
- [Constraints]
- [Expected output format]
```

**Usage**: See `../prompts/code-guidelines.md` for conventions.

## Documentation Pattern

**Structure**:
```
Document the following:
- Purpose: What it does
- Usage: How to use it
- Parameters: Input/output
- Examples: Code examples
- Notes: Important considerations
```

## Refactoring Pattern

**Structure**:
```
Refactor the following code to:
- Improve readability
- Reduce duplication
- Follow SOLID principles
- Maintain backward compatibility

Show:
- Before/after comparison
- Rationale for changes
- Migration guide if needed
```

## Testing Pattern

**Structure**:
```
Create tests for:
- Happy path scenarios
- Edge cases
- Error conditions
- Integration points

Test requirements:
- Coverage: [target %]
- Framework: [testing framework]
- Mocking: [what to mock]
```

## Composition

Prompts can be composed from smaller parts:

```
[Code Review Pattern]
+ [Project-specific guidelines from rules/]
+ [Context from recent changes]
= Complete review prompt
```

## Tool-Specific Adaptation

While patterns are universal, each tool may have:

- **Different context injection** - How to include files
- **Different formatting** - Markdown vs plain text
- **Different length limits** - Token constraints
- **Different capabilities** - What the AI can do

See `../tools/{your-tool}/adapter.md` for tool-specific guidance.

## Best Practices

1. **Be Specific** - Include concrete examples
2. **Provide Context** - Reference relevant files/patterns
3. **Set Constraints** - Define boundaries clearly
4. **Request Format** - Specify output structure
5. **Iterate** - Refine prompts based on results

## Related

- [prompts/](../prompts/) - Full prompt templates
- [rules/](../rules/) - Behavior guidelines
- [tools/](../tools/) - Tool-specific adaptations
