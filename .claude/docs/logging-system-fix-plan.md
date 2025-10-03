# Logging System Fix Plan (.agents)

**Status**: 🔧 Planning
**Created**: 2025-10-03
**Target**: Achieve structured daily logs like main project's `2025-10-02.md`

---

## 🎯 Goal

Transform the current auto-logging system from simple task entries into comprehensive session summaries with the full structure:

```markdown
# [Date] - Session Title

## 🎯 Session Summary
## 📋 Tasks Completed
## 🔧 Technical Work
## 🧪 Testing
## 📚 Documentation
## ⚠️ Issues & Blockers
## 🔗 Related
## ⏭️ Next Steps
## 💡 Key Decisions
```

---

## ❌ Current State Problems

### 1. **Incomplete Auto-logging**
**Current Output**:
```markdown
### 17:36 - Investigation
**What**: check does logging system work?
**Result**: Task logged, awaiting completion
```

**Issues**:
- ❌ No completion tracking (tools used, files modified)
- ❌ No aggregation into session summary
- ❌ No testing metrics
- ❌ No documentation tracking
- ❌ Generic "Why" and "How" fields
- ❌ State doesn't persist between hook calls

### 2. **State Persistence Bug**

Each hook runs in separate Bun process:
```typescript
UserPromptSubmit  → Logger instance A → saves currentPrompt
PostToolUse       → Logger instance B → toolsUsed = [] ❌
Stop              → Logger instance C → currentPrompt = "" ❌
```

**Root Cause**: In-memory state cleared between hook invocations

### 3. **Missing Session Context**

Current system logs individual tasks but doesn't:
- Group related tasks into sessions
- Calculate session metrics (duration, files touched, tests added)
- Generate summaries
- Track blockers and next steps

---

## ✅ Desired Outcome

### Example Target Log:

```markdown
# 2025-10-03 - Logging System Implementation

## 🎯 Session Summary
Implemented session state persistence and aggregation for .agents hooks.
Created sessionState and sessionAggregator services.

## 📋 Tasks Completed
- [x] Create SessionState class
- [x] Create SessionAggregator class
- [x] Add .gitignore for session files

## 🔧 Technical Work

### Feature Implementation
**What**: Session state persistence
**Why**: Hooks run in separate processes, need shared state
**How**: JSON file-based state with atomic writes
**Result**: State persists across hook invocations

**Files**:
- `.agents/.claude/services/sessionState.ts`
- `.agents/.claude/services/sessionAggregator.ts`
- `.agents/.claude/session/.gitignore`

## 📚 Documentation
- [x] Created logging-system-fix-plan.md

## ⏭️ Next Steps
- [ ] Update hooks/index.ts to use new services
- [ ] Test with real session
```

---

## 🏗️ Technical Architecture

### Implementation Status

**✅ Completed (2025-10-03)**:
1. **SessionState Service** - State persistence via `.current-session.json`
2. **SessionAggregator Service** - Summary generation and formatting
3. **Session .gitignore** - Ignore runtime state files

**🔄 Next Steps**:
1. Update `hooks/index.ts` to import and use new services
2. Test session tracking end-to-end
3. Iterate on summary format based on real usage

### File Structure

```
.agents/.claude/
├── services/
│   ├── sessionState.ts        ✅ CREATED - state persistence
│   ├── sessionAggregator.ts   ✅ CREATED - summary generation
│   └── logger.ts              (existing - may need updates)
├── hooks/
│   └── index.ts               🔄 NEEDS UPDATE - use new services
├── session/
│   ├── .gitignore             ✅ CREATED
│   └── .current-session.json  (runtime - gitignored)
└── logs/
    └── YYYY-MM-DD.md          (enhanced output)
```

---

## 📋 Implementation Plan

### **Milestone 1: Fix State Persistence** ✅ COMPLETE

**Tasks**:
- [x] Create `SessionState` class in `.agents/.claude/services/sessionState.ts`
- [x] Add `.current-session.json` to `.gitignore`
- [x] Create `SessionAggregator` class in `.agents/.claude/services/sessionAggregator.ts`
- [ ] Update `UserPromptSubmit` hook to save task
- [ ] Update `PostToolUse` hook to track tools/files
- [ ] Update `Stop` hook to load session and generate log
- [ ] Test state persistence across hook invocations

**Files Created**:
- ✅ `.agents/.claude/services/sessionState.ts` (140 lines)
- ✅ `.agents/.claude/services/sessionAggregator.ts` (280 lines)
- ✅ `.agents/.claude/session/.gitignore`

**Files to Modify**:
- `.agents/.claude/hooks/index.ts` (update hooks to use new services)

---

### **Milestone 2: Update Hooks Integration** 🔄 IN PROGRESS

**Required Changes to `hooks/index.ts`**:

1. **Add imports:**
```typescript
import { sessionState } from '../services/sessionState';
import { sessionAggregator } from '../services/sessionAggregator';
```

2. **Add categorizePrompt function:**
```typescript
function categorizePrompt(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.match(/\b(fix|bug|error|issue|problem|broken)\b/)) return 'Bug Fix';
  if (lower.match(/\b(add|create|implement|build|new)\b/)) return 'Feature';
  if (lower.match(/\b(refactor|improve|optimize|clean|update)\b/)) return 'Refactor';
  if (lower.match(/\b(test|spec|coverage)\b/)) return 'Testing';
  if (lower.match(/\b(doc|documentation|readme|comment)\b/)) return 'Documentation';
  if (lower.match(/\b(check|show|list|view|read|get|find|search)\b/)) return 'Investigation';
  if (lower.match(/\b(deploy|build|release|publish)\b/)) return 'Deployment';

  return 'Task';
}
```

3. **Update userPromptSubmit hook:**
```typescript
const userPromptSubmit: UserPromptSubmitHandler = async (payload) => {
  await saveSessionData('UserPromptSubmit', { ...payload, hook_type: 'UserPromptSubmit' } as const);

  // Log to existing simple format (keep for now)
  await logger.logUserPrompt(payload.prompt);

  // Save task to session state for structured logging
  await sessionState.addTask({
    prompt: payload.prompt,
    category: categorizePrompt(payload.prompt),
    timestamp: new Date().toISOString(),
    tools: [],
    files: [],
  });

  // ... rest of function
};
```

4. **Update postToolUse hook:**
```typescript
const postToolUse: PostToolUseHandler = async (payload) => {
  await saveSessionData('PostToolUse', { ...payload, hook_type: 'PostToolUse' } as const);

  // ... extract file paths logic ...

  // Save to old logger (keep for now)
  await logger.logToolUsage(payload.tool_name, details, files);

  // Save to session state for structured logging
  await sessionState.addToolUsage(payload.tool_name, details, files);

  return {};
};
```

5. **Update stop hook:**
```typescript
const stop: StopHandler = async (payload) => {
  await saveSessionData('Stop', { ...payload, hook_type: 'Stop' } as const);

  // Load session data and generate structured summary
  const session = await sessionState.load();

  // Only generate summary if we have tasks
  if (session.tasks && session.tasks.length > 0) {
    const summary = sessionAggregator.generateSummary(session);
    await sessionAggregator.writeToLog(summary);
  }

  // Keep old logger completion for now
  await logger.logCompletion('Task completed successfully');

  // Clear session state for next session
  await sessionState.clear();

  // ... completion sound ...

  return {};
};
```

---

### **Milestone 3: Testing & Iteration** 🔜 PENDING

**Tasks**:
- [ ] Test with real development session
- [ ] Verify session state persists correctly
- [ ] Check log output format
- [ ] Iterate based on actual usage
- [ ] Remove old logger once new system proven

**Acceptance Criteria**:
- ✅ State persists between hooks
- ✅ Tools and files tracked correctly
- ✅ Structured summary generated
- ✅ Output matches desired format

---

## 🔄 Migration Strategy

### Phase 1: Parallel System (Current)
- ✅ Keep existing simple logging
- ✅ Add new system alongside
- Compare outputs manually
- Iterate based on real usage

### Phase 2: Gradual Enhancement
- Start with basic structure
- Add metrics extraction (test results, etc.)
- Improve title generation
- Refine templates

### Phase 3: Full Replacement
- Disable simple logging
- Use only structured format
- Cleanup old code
- Update documentation

---

## ⚠️ Risks & Mitigations

### Risk 1: State File Corruption
**Mitigation**:
- Atomic writes with temp file + rename
- Fallback to empty state if parse fails
- Backup previous state before overwrite

### Risk 2: Hook Performance
**Mitigation**:
- Keep hooks fast (<100ms)
- Async file operations
- Defer summary generation to Stop hook

### Risk 3: Over-automation
**Mitigation**:
- Keep manual editing possible
- Auto-generated sections are starting point
- Users can enhance with context

---

## 📊 Success Metrics

### Minimum Viable Product (MVP)
- ✅ State persists between hooks
- ✅ Tools and files tracked
- ✅ Basic structured output generated
- 🔄 One complete session log produced

### Production Ready
- 🔜 90% of sessions auto-logged successfully
- 🔜 Test metrics extracted correctly
- 🔜 Manual editing required <20% of time
- 🔜 Team adopts the format

---

## 🔗 Related Documentation

- [Main Project Plan](../../.claude/docs/logging-system-fix-plan.md)
- [Main Project Example Log](../../.claude/logs/2025-10-02.md)
- [Hooks README](../hooks/README.md) (if exists)

---

## ⏭️ Next Steps

1. **Update hooks/index.ts** - Integrate sessionState and sessionAggregator
2. **Test with real session** - Validate approach
3. **Iterate based on feedback** - Improve quality
4. **Document learnings** - Update this plan

---

**Created**: 2025-10-03
**Last Updated**: 2025-10-03 (18:25)
**Author**: Claude Code Logging System
**Status**: ⚠️ Services Created - Needs Refinement (see main project issues)
