# Contributing

Thank you for contributing to the AI Agents Boilerplate!

## How to Contribute

### Reporting Issues

- Use clear, descriptive titles
- Include steps to reproduce
- Specify which AI tool(s) are affected
- Include examples when possible

### Adding Content

#### Adding a New Pattern

1. Create `patterns/{pattern-name}.md`
2. Document the universal concept
3. Provide examples
4. Link to tool-specific adapters
5. Update `patterns/README.md`

#### Adding a New Tool Adapter

1. Create `tools/{tool-name}/` directory
2. Create `adapter.md` explaining:
   - How the tool reads rules/prompts
   - How to implement hooks
   - How to configure settings
   - How to adapt universal patterns
3. Add tool-specific implementations
4. Update `tools/README.md`
5. Update `INDEX.md`

#### Adding a New Prompt

1. Create `prompts/{prompt-name}.md`
2. Follow structure from `patterns/prompt-patterns.md`
3. Include examples
4. Update `prompts/README.md`

#### Adding a New Rule

1. Create `rules/{rule-name}.md`
2. Follow structure from `patterns/rule-patterns.md`
3. Include examples
4. Update `rules/README.md`

#### Adding a New Agent

1. Create `agents/{agent-name}.md`
2. Follow format from `agents/session-logger.md`
3. Document purpose, usage, and examples
4. Update `agents/README.md`

## Documentation Standards

### File Structure

- Use clear, descriptive filenames (kebab-case)
- Include a purpose statement at the top
- Use consistent markdown formatting
- Include examples when helpful

### Code Examples

- Use proper syntax highlighting
- Include comments for clarity
- Show both simple and complex examples
- Include error handling when relevant

### Cross-References

- Link to related content using relative paths
- Update INDEX.md when adding new content
- Keep links up to date

## Code Style

### Markdown

- Use proper heading hierarchy
- Use tables for structured data
- Use code blocks with language tags
- Keep lines under 100 characters when possible

### Code Examples

- Use TypeScript for hook examples
- Use JSON for configuration examples
- Use Bash for command examples
- Include comments for complex logic

## Testing

Before submitting:

1. **Validate Links**: Run `npm run validate:links`
2. **Check Formatting**: Run `npm run validate:markdown`
3. **Test Examples**: Verify code examples work
4. **Update Index**: Add new content to INDEX.md

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update documentation
5. Run validation script
6. Submit pull request with clear description

## Review Process

- All contributions are welcome
- Maintainers will review for:
  - Clarity and completeness
  - Consistency with existing patterns
  - Proper documentation
  - Working examples

## Questions?

- Check [README.md](README.md) for general info
- See [INDEX.md](INDEX.md) for content navigation
- Review existing content for examples

---

Thank you for helping improve the AI Agents Boilerplate!
