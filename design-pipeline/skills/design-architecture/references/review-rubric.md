# Design Architecture Review Rubric

Use this rubric for AUDIT and REVIEW modes.

## Severity

### CRITICAL

A failure that can block task completion, cause destructive/incorrect outcomes, exclude a required input method/user group, or creates a systemic architecture break likely to spread.

Examples:

- destructive action with misleading semantics
- inaccessible core workflow
- duplicated competing canonical components used widely
- theme tokens that make required content unreadable
- navigation state that can put users in the wrong object/context

### HIGH

A substantial usability, consistency, accessibility, or maintainability problem that materially increases errors, effort, or future drift.

Examples:

- missing loading/error state in a key workflow
- repeated raw colors bypassing semantic theme roles
- page-local fork of a shared control
- frequent workflow requiring unnecessary modal/page transitions
- keyboard operation broken for a major component

### MEDIUM

A real issue with limited scope or moderate cost that should be corrected during normal product work.

Examples:

- inconsistent spacing/type roles in one feature
- unclear secondary action hierarchy
- reusable pattern duplicated twice with slight divergence
- focus restoration incorrect in a secondary dialog

### LOW

Minor inconsistency or polish issue with low task impact and low architectural risk.

Examples:

- isolated alignment inconsistency
- unnecessary decorative border
- wording inconsistency without behavioral ambiguity

## Finding format

Use this structure:

```text
[SEVERITY] Short finding title
Where: file/component/screen/flow
Evidence: observable behavior or implementation
Why it matters: task/system consequence
Fix: smallest root-level correction
Rule: project contract section or reference principle
```

Do not report a subjective aesthetic preference as a contract violation.

## Review order

Review in this sequence so cosmetic issues do not dominate:

1. Task completion and conceptual model
2. Navigation/workflow and system status
3. Error prevention/recovery
4. Information hierarchy/density/comparison
5. Token/component/pattern architecture
6. Keyboard/focus/semantics/contrast
7. Responsive/theme states
8. Visual restraint and consistency

## Pass criteria for architecture

A feature is architecturally healthy when:

- it reuses established semantic tokens and components
- any new shared abstraction has a clear semantic role
- reachable states are handled
- behavior is consistent with equivalent product interactions
- keyboard and focus behavior are intentional
- responsive/theme behavior preserve meaning
- local exceptions are rare and documented when consequential
- the implementation does not silently create a second source of truth
