# UX Spec Format

Use this file when creating or reshaping design specs.

Keep specs compact, concrete, and implementation-ready.

## Shape

Use this structure when it fits the surface:

```md
# Surface Name

One-sentence description of the surface and its job.

## Composition

```text
SurfaceName
├── ChildA
├── ChildB
│   ├── GrandChild1
│   └── GrandChild2
└── ChildC
```text

## Children

| Child | Component | Spec | Conditional |
|-------|-----------|------|-------------|
| ChildA | `src/components/ChildA.tsx` | `specs/child-a.md` | always |
| ChildB | `src/components/ChildB.tsx` | `specs/child-b.md` | when X |
| ChildC | `src/components/ChildC.tsx` | — | admin only |

## Source files

| Type | Path |
|------|------|
| Component | `src/components/SurfaceName.tsx` |
| CSS | `src/components/SurfaceName/surface-name.css` |
| Tests | `src/components/SurfaceName/SurfaceName.test.tsx` |

## Layout

Concrete layout rules: spacing, alignment, flex/grid behavior.

Example:
- Vertical stack, gap-4 (16px)
- ChildA: sticky top, z-10
- ChildB: flex-1, overflow-y-auto
- ChildC: fixed bottom, full width

## States

| State | Trigger | Visual Change |
|-------|---------|---------------|
| default | page load | standard render |
| hover | mouse enter | border highlight, shadow-sm |
| loading | data fetching | skeleton placeholders |
| empty | no items | empty state illustration |
| error | API failure | error banner with retry |

## Responsive

| Breakpoint | Change |
|------------|--------|
| < 640px (mobile) | single column, hamburger menu |
| 640-1024px (tablet) | two columns |
| > 1024px (desktop) | full layout |

## Tokens used

| Element | Token | Usage |
|---------|-------|-------|
| background | `--background` | page surface |
| primary action | `--primary` | buttons, links |
| border | `--border` | card borders |

## Classes used

| Element | Class | Source |
|---------|-------|--------|
| card | `.card` | project styling guide |
| badge | `.badge[data-status="..."]` | project styling guide |

## Extension notes

Rules for future edits when helpful.
```

Not every spec needs every section. Cut sections that add no value. The result must **remove guesswork for the implementer**.

## Required Qualities

- One canonical order for children or controls
- Explicit state behavior (what triggers it, what changes)
- Enough layout detail to implement without guessing
- Clear conditionals for mode-specific content
- References to neighboring specs when composition spans multiple files
- Token and class references from the project's design system

## Preferred Content

Prefer:

- Composition trees
- State tables
- Concrete ordering
- Exact file targets when known
- Token and class references
- Short extension rules

Avoid:

- Design-rationale essays
- Duplicate prose from neighboring specs
- Vague words like "roughly", "maybe", or "probably"
- Implementation detail that belongs only in runtime code

## When To Split Specs

Create a separate spec when:

- A child surface has its own stable structure
- The same child appears in more than one composition
- A section is growing into its own interaction model

Keep a composition spec focused on assembly. Push child specifics into child specs.
