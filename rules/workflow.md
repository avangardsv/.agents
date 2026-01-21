# AI Workflow and Task Management Rules

## Task Management with TodoWrite

### When to Use TodoWrite
- **Complex multi-step tasks** (3+ steps)
- **Non-trivial implementations** requiring planning
- **User provides multiple tasks** (numbered or comma-separated)
- **After receiving new instructions** (capture requirements immediately)
- **When starting work on tasks** (mark as in_progress BEFORE beginning)
- **After completing tasks** (mark completed and add follow-up tasks)

### When NOT to Use TodoWrite
- **Single straightforward tasks**
- **Trivial operations** (less than 3 trivial steps)  
- **Purely conversational** or informational requests
- **Tasks that provide no organizational benefit**

### Task State Management
```bash
# States
pending      # Task not yet started
in_progress  # Currently working (ONLY ONE at a time)
completed    # Task finished successfully

# Task Descriptions (required two forms)
content: "Run tests"           # Imperative form (what needs doing)
activeForm: "Running tests"    # Present continuous (what's happening)
```

### Best Practices
- **Exactly ONE task** must be in_progress at any time
- **Complete current tasks** before starting new ones
- **Mark completed IMMEDIATELY** after finishing
- **Remove irrelevant tasks** from the list entirely
- **Break complex tasks** into smaller, manageable steps

## Tool Usage Patterns

### Tool Selection Priority
1. **Task tool**: Use for complex searches requiring multiple rounds
2. **Parallel execution**: Batch independent tool calls together  
3. **Read first**: Always read files before editing
4. **Validate changes**: Test configurations before committing

### Search Strategy
```bash
# Use Task tool when:
- Open-ended search that may require multiple rounds
- Complex codebase exploration
- When not confident about finding right match quickly

# Use direct tools when:
- Reading specific known file paths
- Searching for specific class definitions ("class Foo")
- Searching within 2-3 specific files
- Simple, targeted operations
```

### Parallel Tool Execution
```bash
# ✅ Good: Batch independent operations
- Read multiple files simultaneously
- Run multiple bash commands in parallel
- Perform multiple searches at once

# ❌ Avoid: Sequential operations that could be parallel
- Reading files one by one when you need several
- Running independent bash commands sequentially
```

## Work Session Structure

### Session Initialization
1. **Assess task complexity**
2. **Create TodoWrite list** if needed (3+ steps)
3. **Plan tool usage** strategy
4. **Begin with one task** in_progress

### During Work
1. **Update TodoWrite** in real-time
2. **Use appropriate tools** for each operation
3. **Batch operations** when possible
4. **Mark tasks completed** immediately when finished

### Session Completion
1. **Complete all in_progress tasks**
2. **Clean up TodoWrite** list
3. **Log significant work** (see logging.md)
4. **Document outcomes** and follow-ups

## Code and Implementation Workflow

### Before Starting Implementation
- **Read existing files** to understand patterns
- **Check for dependencies** and libraries used
- **Understand project structure** and conventions
- **Plan approach** before writing code

### During Implementation  
- **Follow existing conventions** in codebase
- **Use existing libraries** and utilities
- **Follow established patterns**
- **No comments** unless explicitly requested

### After Implementation
- **Test functionality** if possible
- **Validate configuration** syntax
- **Update documentation** to reflect changes
- **Run quality checks** (lint, typecheck, etc.)

## Error Handling and Recovery

### When Things Go Wrong
1. **Mark current task** as blocked or failed
2. **Create new task** to address the blocker
3. **Log the issue** with specific details
4. **Provide workarounds** or alternatives
5. **Update TodoWrite** with recovery plan

### Communication During Errors
- **State the problem** concisely
- **Show error messages** directly
- **Provide immediate fixes** when possible
- **Don't over-explain** unless requested

## Quality Gates and Validation

### Before Declaring Task Complete
- **Functionality works** as intended
- **Configuration validates** (syntax checks pass)
- **Documentation reflects** current state
- **Security considerations** addressed
- **Follows established** project patterns

### Validation Commands to Run
```bash
# Configuration validation
docker compose config
yamllint config.yml
jq empty config.json

# Script validation
shellcheck script.sh
bash -n script.sh

# General quality checks
./scripts/validate_logs.sh
./scripts/test_logging.sh
```

## Integration with External Tools

### Git Operations
- **Read current state** before making changes
- **Make logical commits** with clear messages  
- **Don't commit** unless explicitly requested
- **Include generated signature** in commit messages when committing

### Docker and Infrastructure
- **Validate compose files** before deployment
- **Test health checks** and startup sequences
- **Check resource limits** and constraints
- **Verify network configurations**

### Monitoring and Logging
- **Ensure logging integration** in all scripts
- **Validate log formats** and completeness
- **Test monitoring configurations**
- **Verify alert definitions**

## Workflow Customization

### Project-Specific Adaptations
- **Follow existing** task management patterns
- **Adapt to team** workflows and tools
- **Respect project** quality gates and standards
- **Integrate with** existing CI/CD pipelines

### User Preference Integration
- **Note user patterns** for task breakdown preferences
- **Adapt verbosity** of TodoWrite descriptions
- **Customize tool usage** based on project needs
- **Remember successful** workflow patterns

## Performance Optimization

### Reduce Context Switching
- **Batch similar operations** together
- **Complete related tasks** in sequence
- **Minimize tool switching** within workflows
- **Group file operations** efficiently

### Optimize Tool Usage
- **Use most appropriate tool** for each task
- **Leverage parallel execution** when possible
- **Cache frequently used** information
- **Minimize redundant** operations

## Troubleshooting Workflow Issues

### Common Problems
```bash
# TodoWrite not updating properly
- Check for tasks marked as completed but still showing
- Verify exactly one task is in_progress
- Clean up stale or irrelevant tasks

# Tool selection issues  
- Review whether Task tool should have been used
- Check if parallel execution was missed
- Validate that files were read before editing

# Quality gate failures
- Run validation commands before marking complete
- Check that documentation matches implementation
- Verify security considerations were addressed
```

### Recovery Strategies
```bash
# Reset workflow state
1. Complete or remove all in_progress tasks
2. Clean up TodoWrite list
3. Start fresh with clear task breakdown
4. Use logging to track reset reason

# Address blocked tasks
1. Create specific unblocking task
2. Mark original task as pending
3. Focus on resolving blocker
4. Resume original task when unblocked
```

---

**Core Principle**: Maintain clear task visibility and efficient tool usage to maximize productivity while ensuring quality outcomes.