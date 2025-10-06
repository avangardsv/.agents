# Logging Template

This template defines the comprehensive format for daily session logs.

**See `log-example.md`** for a real production example showing all sections in use.

---

## 📝 Complete Template Format

```markdown
# YYYY-MM-DD - [Descriptive Title]

## 🎯 Session Summary
[1-2 sentence overview of what was accomplished - high level summary]

## 📋 Tasks Completed
- [x] Task 1 description
- [x] Task 2 description
- [x] Task 3 description

## 🔧 Technical Work

### [Work Item 1 Title]
**What**: [What was done - specific changes]
**Why**: [Why it was needed - business/technical reason]
**How**: [How it was implemented - approach/method]
**Result**: [Outcome - metrics, status, impact]

**Key Changes**:
- `path/to/file.ts:line` - Description of change
- `another/file.tsx:line-range` - Description
- Summary of modifications

**Fixed Issues**:
- Issue description 1
- Issue description 2

### [Work Item 2 Title]
**What**: [What was done]
**Why**: [Reason]
**How**: [Implementation]
**Result**: [Outcome]

**Key Changes**:
- File changes...

## 🧪 Testing
- **Tests added**: N (Component/Feature name)
- **Tests updated**: ~N (description)
- **Total passing**: N/M (X%)
- **Skipped**: N (reasons)

**Test Results by Component**:
- ComponentA: N/M ✅ (X skipped)
- ComponentB: N/M ✅
- ComponentC: N/M ✅

**Test Coverage**:
- Feature area 1 (N tests)
- Feature area 2 (N tests)
- Edge cases (N tests)

## 📚 Documentation
- [x] Documentation item 1
- [x] Documentation item 2
- [ ] Pending documentation

**Files Created**:
- `path/to/doc1.md` - Description
- `path/to/doc2.md` - Description

**Files Updated**:
- `path/to/existing.md` - What changed

## ⚠️ Issues & Blockers

**Known Issues**:
1. **Issue Title** - Description
   - Impact: [severity/scope]
   - Fix: [proposed solution or workaround]

2. **Another Issue** - Description
   - Impact: [details]
   - Fix: [solution]

**Blockers**: [None / List blockers]

## 🔗 Related
- **PRs**: MR !XXX (description), #YYY (description)
- **Issues**: #ZZZ (description)
- **Docs**:
  - [Doc Title](../path/to/doc.md)
  - [Another Doc](../path/to/doc2.md)

## ⏭️ Next Steps
- [ ] Action item 1
- [ ] Action item 2
- [ ] Action item 3
- [ ] Follow-up task

## 📊 Session Metrics
- **Session Duration**: ~X hours/minutes
- **Files Modified**: N
- **Tests Added/Updated**: ~N
- **Documentation Pages**: N new + M updated
- **Test Pass Rate**: X% (N/M)
- **Lines Added/Removed**: +X / -Y

## 💡 Key Decisions

1. **Decision Title** - Choice made
   - Reason: [Why this decision]
   - Trade-off: [What was sacrificed]
   - Impact: [Effects on codebase/team]

2. **Another Decision** - Choice made
   - Reason: [Rationale]
   - Trade-off: [Considerations]
   - Impact: [Consequences]

---

**Session Duration**: [X hours/minutes]
**Status**: [✅ Complete / 🔄 In Progress / ⚠️ Blocked]
```

---

## 📋 Section Breakdown

### Required Sections (Always Include)

1. **Header** - `# YYYY-MM-DD - Title`
   - Date in ISO format
   - Descriptive title summarizing the session

2. **🎯 Session Summary**
   - 1-2 sentences maximum
   - High-level overview
   - Key accomplishments

3. **📋 Tasks Completed**
   - Checkbox list format `- [x]`
   - Brief descriptions
   - Source from session data

4. **🔧 Technical Work**
   - Multiple subsections for different work items
   - Each with **What/Why/How/Result** structure
   - Include key changes with file paths and line numbers
   - List fixed issues

### Optional Sections (Include When Relevant)

5. **🧪 Testing**
   - When tests were added/modified
   - Test metrics and pass rates
   - Component-level breakdown
   - Coverage details

6. **📚 Documentation**
   - When docs were created/updated
   - List of documentation files
   - Checklist of doc tasks

7. **⚠️ Issues & Blockers**
   - Known issues discovered
   - Current blockers
   - Impact assessment
   - Proposed fixes

8. **🔗 Related**
   - Related PRs/MRs
   - Related issues
   - Documentation links
   - External references

9. **⏭️ Next Steps**
   - Follow-up tasks
   - Pending work
   - Action items
   - Future considerations

10. **📊 Session Metrics**
    - Duration
    - File counts
    - Test metrics
    - Code statistics

11. **💡 Key Decisions**
    - Important choices made
    - Rationale for decisions
    - Trade-offs considered
    - Impact on project

### Footer
- **Session Duration**: Summary
- **Status**: Current state (✅ Complete / 🔄 In Progress / ⚠️ Blocked)

---

## 🎯 Example Mapping from log-example.md

### Header Section
```markdown
# 2025-10-02 - ChatInfo Migration & Documentation
```
- **Format**: Date + hyphen + descriptive title
- **Title**: Summarizes main work (not generic)

### Session Summary
```markdown
## 🎯 Session Summary
Completed ChatInfo context migration, created comprehensive unit tests for
ChatSettings component, and analyzed VOD PR conflicts. All production code
migrated, 25 new tests added, 99.7% test pass rate achieved.
```
- **Length**: 2-3 sentences
- **Content**: High-level accomplishments + key metrics
- **Tone**: Direct and factual

### Tasks Completed
```markdown
## 📋 Tasks Completed
- [x] Complete ChatInfo context migration
- [x] Fix all failing tests (hook and component tests)
- [x] Create 25 unit tests for ChatSettings component
```
- **Format**: Checkbox list with `[x]`
- **Items**: Specific, measurable tasks
- **Source**: From session data or manual entry

### Technical Work (Detailed Example)
```markdown
### ChatInfo Context Migration
**What**: Migrated chat error/info messages from component-level state to centralized context
**Why**: Eliminate prop drilling, provide consistent UX, enable easier testing
**How**: Created ChatInfoContext with auto-dismiss, container scoping, and variant support
**Result**: 3,389/3,399 tests passing (99.7%), all production code migrated

**Key Changes**:
- `features/chat/context/ChatInfoContext.tsx` - New context implementation
- `features/chat/ui/Chat/Chat.tsx:84` - Added ChatInfoProvider
- `features/chat/context/ChatMessagesContext.tsx:78-96` - Removed old error state
```

**Structure**:
- **Subsection title**: Descriptive name (not generic)
- **What/Why/How/Result**: Complete context
- **Key Changes**: File paths with line numbers + descriptions
- **Fixed Tests/Issues**: When applicable

### Testing Section (Full Example)
```markdown
## 🧪 Testing
- **Tests added**: 29 (ChatSettings)
- **Tests updated**: ~50 (providers, mocks)
- **Total passing**: 3,389/3,399 (99.7%)
- **Skipped**: 10 (3 PinnedMessage error, 2 ChatSettings error, 5 other)

**Test Results by Component**:
- ChatSettings: 25/29 ✅ (4 skipped)
- PinnedMessage: 38/41 ✅ (3 skipped)
- ChatMessage: 25/25 ✅

**Test Coverage**:
- Component rendering (4 tests)
- Navigation flows (5 tests)
- Ban/unban user flows (7 tests)
```

### Key Decisions (Example)
```markdown
## 💡 Key Decisions

1. **Context over Hook** - Chose React Context for ChatInfo instead of hook pattern
   - Reason: Multiple components need shared state, centralized rendering
   - Trade-off: Slightly more setup, but better architecture

2. **Provider Scoping** - Scoped ChatInfoProvider to Chat component only, not global
   - Reason: Chat-specific feature, no need for app-wide access
   - Trade-off: Can't use outside Chat, but that's intentional
```

---

## 📊 Session Data Mapping

From `.claude/session/.current-session.json`:

| Template Section | Session Data Field | Notes |
|-----------------|-------------------|-------|
| Title | Infer from `tasks[0].prompt` | Or manual override |
| Tasks Completed | `tasks[].prompt` | Add `[x]` checkbox |
| Files Modified | `filesModified[]` | Group by type if many |
| Tools Used | `toolsUsed[].tool + details` | Truncate details |
| Session Duration | `startTime` to stop time | Calculate difference |

**Auto-populated** (from session):
- Tasks list
- Files modified
- Tools used
- Timestamps

**Manual additions** (Claude Code generates):
- Session Summary
- Technical Work details (What/Why/How/Result)
- Testing results
- Documentation notes
- Issues & Blockers
- Key Decisions

---

## 🔧 Hook Auto-Generation vs Manual

### Hook Generates (Simple)
```markdown
### 10:24 - Session Complete

**Tasks** (1):
- [x] add auto-logging to hook

**Files Modified** (3):
- .claude/hooks/index.ts
- .agents/.claude/hooks/index.ts

**Tools Used**:
- Edit: Edit .claude/hooks/index.ts
- Write: Write .agents/.claude/hooks/LOGGING-TEMPLATE.md
```

### Manual Enhancement (Detailed)
```markdown
## 🔧 Technical Work

### Auto-Logging Implementation
**What**: Added automatic session logging to stop hook
**Why**: Eliminate manual log creation, ensure consistent tracking
**How**: Read session JSON, format with template, append to daily log
**Result**: Automatic log entries on every session completion

**Key Changes**:
- `.claude/hooks/index.ts:65-122` - Added logging logic to stop handler
- `.agents/.claude/hooks/LOGGING-TEMPLATE.md` - Created template guide
- Template includes What/Why/How/Result structure
```

**Recommendation**: Start with hook auto-generation, manually enhance for important sessions.

---

## 📁 File Locations

- **Template**: `.agents/.claude/hooks/LOGGING-TEMPLATE.md` (this file)
- **Example**: `.agents/.claude/hooks/log-example.md` (real production log)
- **Session Data**: `.claude/session/.current-session.json`
- **Output Logs**: `.claude/logs/YYYY-MM-DD.md`
- **Hook**: `.agents/.claude/hooks/index.ts` (stop handler, line 65-122)

---

## 💡 Best Practices

### When to Use Each Section

- **Always**: Header, Summary, Tasks, Technical Work
- **When testing**: Testing section with metrics
- **When documenting**: Documentation section with file list
- **When issues found**: Issues & Blockers section
- **When complex decisions**: Key Decisions section
- **Long sessions (>2hrs)**: Session Metrics section
- **With PRs**: Related section with links
- **Incomplete work**: Next Steps section

### Writing Tips

1. **Be specific**: Use file paths with line numbers
2. **Include metrics**: Numbers tell the story (99.7% pass rate)
3. **Show impact**: Connect work to outcomes
4. **Link related items**: PRs, docs, issues
5. **Document decisions**: Explain the "why" behind choices
6. **Keep it scannable**: Use bullet points, headers, emojis
7. **Time-box it**: Don't spend >10min on a log entry

---

**Status**: Comprehensive template matching production example
**Format**: Markdown with emoji section headers
**Usage**: Reference when creating detailed session logs
