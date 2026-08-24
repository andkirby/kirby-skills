# UX Spec Format

Use this file when creating or reshaping design specs.

Keep specs compact, concrete, and implementation-ready.

## Shape

Use this structure when it fits the surface:

````md
# Surface Name

One-sentence description of the surface and its job.

Related artifacts:
- Interaction contract: `surface-name.interactions.md` (only when needed)
- Review mockups: `surface-name.mockups.md`

## Owns

- Durable UX responsibilities for this surface.

## Does Not Own

- Neighboring surfaces, backend contracts, implementation plans, and explorations that should live elsewhere.

## Composition

```text
SurfaceName
├── ChildA
├── ChildB
│   ├── GrandChild1
│   └── GrandChild2
└── ChildC
```

## Children

| Child | Component | Spec | Conditional |
|-------|-----------|------|-------------|
| ChildA | `src/components/ChildA.tsx` | `specs/child-a.md` | always |
| ChildB | `src/components/ChildB.tsx` | `specs/child-b.md` | when X |
| ChildC | `src/components/ChildC.tsx` | — | admin only |

## Source / Verification Anchors

These refs are drift anchors, not a file inventory. Keep 3-6 anchors that cover the owner, behavior model, semantic style contract when relevant, and user-visible verification.

| Anchor | Path | Why It Exists |
|--------|------|---------------|
| Surface owner | `src/components/SurfaceName.tsx` | composition and lifecycle |
| Behavior model | `src/hooks/useSurfaceName.ts` | state and interaction rules |
| Style contract | `src/components/SurfaceName/surface-name.css` | semantic classes only |
| Verification | `tests/e2e/surface-name.spec.ts` | user-visible behavior |

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

## Semantic Style Anchors

Only include token or class names that express durable UX contracts. Exact values, utility classes, and low-level recipes stay in theme/CSS files.

| Element | Semantic Anchor | Contract |
|---------|-----------------|----------|
| card | `.card` | shared container treatment |
| badge | `.badge[data-status="..."]` | visible state identity |

## Extension notes

Rules for future edits when helpful.
````

Not every spec needs every section. Cut sections that add no value. The result must **remove guesswork for the implementer**.

## Interactions Shape

Create `{surface}.interactions.md` only when behavior details would make the spec hard to scan. Use it for precedence, keyboard dispatch, result ordering, state machines, and cross-surface boundary rules.

```md
# Surface Name - Interactions

Durable interaction contract for the surface.

Related spec: `surface-name.spec.md`
Related mockups: `surface-name.mockups.md`

## Owns
## Does Not Own
## State / Scope Model
## Query or Input Interpretation
## Ordering / Precedence
## Keyboard
## Empty / Error States
## Maintenance Rules
```

## Required Qualities

- One canonical order for children or controls
- Explicit source-of-truth boundaries via `Owns` and `Does Not Own`
- Explicit state behavior (what triggers it, what changes)
- Enough layout detail to implement without guessing
- Clear conditionals for mode-specific content
- References to neighboring specs when composition spans multiple files
- Lightweight source and verification anchors for drift checks
- Semantic token/class anchors only when they define the user-visible contract

## Preferred Content

Prefer:

- Composition trees
- State tables
- Concrete ordering
- 3-6 source/verification anchors when known
- Semantic token and class anchors
- Short extension rules

Avoid:

- Design-rationale essays
- Duplicate prose from neighboring specs
- Vague words like "roughly", "maybe", or "probably"
- Implementation detail that belongs only in runtime code
- Phase plans in canonical specs
- Option studies or generated visual labs in surface docs

## When To Split Specs

Create a separate spec when:

- A child surface has its own stable structure
- The same child appears in more than one composition
- A section is growing into its own interaction model

Keep a composition spec focused on assembly. Push child specifics into child specs.

Create an interactions file instead of a child spec when the surface is still one UI surface but has dense behavior rules.
