# Universal Patterns

Universal patterns that work across all AI tools. These patterns can be adapted to specific tools using the adapters in `../tools/`.

## Purpose

These patterns provide tool-agnostic concepts and structures that can be implemented in any AI tool. Each pattern includes:

- **Concept** - What the pattern does
- **Universal structure** - How it works across tools
- **Implementation guide** - How to adapt to specific tools

## Patterns

### Hook Patterns (`hook-patterns.md`)
Universal concepts for event hooks:
- Event interception
- Safety checks
- Session tracking
- Context injection

### Prompt Patterns (`prompt-patterns.md`)
Reusable prompt structures:
- Code review prompts
- Debugging prompts
- Code generation prompts
- Documentation prompts

### Rule Patterns (`rule-patterns.md`)
Common rule structures:
- Communication guidelines
- Workflow patterns
- Safety rules
- Quality standards

## Usage

1. **Understand the pattern** - Read the universal pattern
2. **Find your tool** - Check `../tools/{your-tool}/adapter.md`
3. **Implement** - Use the adapter to implement the pattern
4. **Customize** - Adapt to your project's needs

## Adding New Patterns

When adding a new universal pattern:

1. Create `{pattern-name}.md` in this directory
2. Document the universal concept
3. Provide examples
4. Link to tool-specific adapters
5. Update this README

## Related

- [tools/](../tools/) - Tool-specific adapters
- [prompts/](../prompts/) - Reusable prompt templates
- [rules/](../rules/) - Universal behavior guidelines
