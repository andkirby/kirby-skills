# Design-System Architecture Guardrails

Use this reference for tokens, components, variants, states, composition, theming, and governance. It applies system-thinking associated with Brad Frost and mature component-system practice.

## System layers

Use as few layers as the project needs while keeping responsibilities clear.

Typical model:

```text
foundations / primitives
        ↓
semantic tokens
        ↓
UI primitives and components
        ↓
patterns / compositions
        ↓
product screens and flows
```

A layer should exist because it creates reuse or isolates change, not because a design-system diagram says it should.

## Tokens

### Primitive tokens

Literal values or scales such as palette ramps, spacing steps, type scales, radius values.

Primitive tokens are implementation vocabulary. Product components should usually depend on semantic roles instead.

### Semantic tokens

Name purpose, not appearance.

Prefer:

```text
text.primary
text.muted
surface.canvas
surface.raised
border.default
action.primary.background
status.danger.text
focus.ring
```

Avoid application-facing tokens such as:

```text
blue500
lightGray
buttonBlue
pageTwoBorder
```

Theme switching should primarily remap semantic roles.

### Component tokens

Add only when a component needs a stable local contract that cannot be expressed cleanly through shared semantic tokens. Do not create a component-token layer for every component by default.

## Components

A shared component needs a stable semantic responsibility.

Define:

- purpose
- anatomy
- supported variants
- supported sizes if task-relevant
- interactive states
- keyboard behavior
- accessible name/description rules
- loading/error behavior where relevant
- composition boundaries
- responsive behavior where relevant

Code/types are usually the source of truth for exact props. Markdown should document rules and semantics, not duplicate the API.

## Variants vs new components

Add a **variant** when the underlying semantic role and interaction model remain the same.

Create a **new component** when at least one changes materially:

- semantic role
- interaction model
- focus/keyboard model
- content structure
- state machine
- ownership/lifecycle

Visual difference alone is weak justification for a new component.

Do not grow a component into a universal prop bag. If variants become combinatorial or contradictory, split by semantic responsibility.

## Composition

Prefer composition to giant components that know every product context.

- primitives own low-level behavior
- components own reusable semantic UI
- patterns own recurring multi-component workflows
- screens own product-specific arrangement and data orchestration

Avoid page-specific business logic inside generic UI primitives.

## States

Interactive components must define the states that can actually occur, commonly:

- default
- hover when pointer-relevant
- active/pressed
- focus-visible
- selected/checked/expanded where applicable
- disabled
- read-only where distinct
- loading/pending
- error/invalid
- success when meaningful

Do not invent visual states that the implementation cannot reach.

## Responsive architecture

Responsive behavior belongs to the component/pattern contract when it changes structure or interaction—not merely pixel values.

Define what happens when space contracts:

- wrap
- truncate
- scroll
- collapse
- reflow
- hide secondary information
- move actions into an overflow menu

Never hide information required to understand the current state merely to make a layout fit.

## Theming

- Keep semantics stable across themes.
- Test contrast and hierarchy in every supported theme.
- Avoid theme-specific component forks unless the semantics truly differ.
- Do not derive dark mode by mechanically inverting colors.
- Treat charts, syntax highlighting, status colors, overlays, and focus indicators as part of theming.

## Ownership and contribution

Each reusable concept should have one obvious home.

Before adding UI:

1. Search for an existing component/pattern.
2. Reuse if semantics fit.
3. Compose existing pieces if possible.
4. Add a variant/state if semantics remain the same.
5. Create new only for a distinct reusable role.
6. Record an exception if the solution must remain local.

Repeated local exceptions are evidence that the system may be missing a shared abstraction. Review them rather than copying again.

## Deprecation

When replacing a shared token/component:

- identify usages
- provide a migration path
- keep compatibility aliases only as long as useful
- mark the old API deprecated
- remove it after usage reaches zero

Do not maintain two equivalent canonical components indefinitely.

## Review questions

1. Is there one source of truth for this decision?
2. Is the name semantic rather than visual or page-specific?
3. Does this belong at token, component, pattern, or screen level?
4. Is a new variant genuinely part of the same semantic component?
5. Are all reachable states defined?
6. Does the API expose product meaning or arbitrary styling knobs?
7. Will light/dark and responsive behavior remain coherent?
