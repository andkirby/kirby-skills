# Design System Contract

> Keep this file project-specific. Delete unused sections. Put literal values in code/config and link to the source of truth instead of copying them here.

## 1. Product character

**Product:** [name]

**Primary users/jobs:** [short description]

**Interaction character:** [e.g. desktop-first technical workspace; dense but readable; optimized for long sessions]

**Non-negotiables:**

- [constraint]
- [constraint]

## 2. Sources of truth

| Concern | Canonical source |
|---|---|
| Theme/tokens | `[path]` |
| Shared UI | `[path]` |
| Icons | `[path/package]` |
| Layout shell | `[path]` |
| Design contract | `.design/DESIGN_SYSTEM.md` |

Do not introduce competing sources of truth without an architectural decision.

## 3. Layout & responsive behavior

- [page shell rule]
- [navigation/layout rule]
- [responsive behavior rule]
- [density/scrolling rule]

## 4. Typography

Semantic roles: [link/path or concise role list]

Rules:

- [body/label/metadata/code/numeric rule]
- [technical text rule]
- [truncation/wrapping rule]

## 5. Color & themes

Use semantic tokens in product/component code.

Approved semantic roles: [link/path]

Rules:

- [light/dark mapping rule]
- [status/action rule]
- [raw color exception policy]

## 6. Spacing, sizing & surfaces

Source: `[path]`

Rules:

- [spacing scale rule]
- [control sizing/density rule]
- [radius/border/elevation restraint]

## 7. Components

Canonical shared UI: `[path]`

Before adding a component:

1. reuse existing
2. compose existing pieces
3. add a semantic variant/state
4. create new only for a distinct reusable role

Project-specific component rules:

- [rule]
- [rule]

## 8. Interaction states & feedback

For applicable components/workflows define:

- default / hover / pressed / focus-visible
- selected/expanded/checked
- disabled/read-only
- loading/pending
- error/invalid
- success/completion

Project rules:

- [async feedback rule]
- [destructive action rule]
- [error recovery rule]

## 9. Navigation & workflow

- [navigation mental model]
- [context-preservation rule]
- [progressive-disclosure rule]
- [power-user/keyboard shortcut rule]

## 10. Accessibility baseline

Target: [e.g. WCAG 2.2 AA]

- keyboard-operable core workflows
- visible and unobscured focus
- semantic/native controls where possible
- meaning not encoded by color alone
- contrast verified in all supported themes
- [project-specific requirement]

## 11. Governance

### Reuse rule

Prefer: token -> existing component/pattern -> variant/state -> new token -> new component -> explicit local exception.

### Exceptions

An exception is acceptable when it is intentionally local, does not create a hidden reusable convention, and does not compromise accessibility or task correctness.

Record consequential exceptions in `.design/decisions.md`.

### Changing the contract

Update this file only for rules that future contributors need to know. Do not document ordinary implementation details.

## 12. Current known debt

- [architectural inconsistency + owner/plan if known]
