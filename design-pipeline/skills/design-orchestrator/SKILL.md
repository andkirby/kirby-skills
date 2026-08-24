---
name: design-orchestrator
description: Routes ambiguous or multi-stage product-design work through the design pipeline by identifying the responsible layer, checking upstream readiness gates, selecting the lowest specialist skill that can safely own the decision, and backtracking when a downstream problem is actually upstream. Use for end-to-end design work, unclear ownership between product intent / information architecture / UX specification / design-system architecture, resuming partially completed design work, or diagnosing which layer should change. Do not use for tasks that are clearly and entirely owned by one specialist unless the user explicitly asks to coordinate the full pipeline.
---

# Design Orchestrator

Coordinate the design pipeline without becoming another design specialist.

This skill owns the question:

> Which design layer owns this decision, what prerequisite is missing, and what specialist should work next?

It does not create product intent, information architecture, screen specifications, or design-system rules itself. Route that work to the specialist that owns it.

## Specialist set

Use these specialists as the default pipeline when they are available:

- `product-intent` — actors, intentions, outcomes, capabilities, evidence, MVP boundaries
- `information-architect` — conceptual model, objects/relationships, destinations, hierarchy, contexts, navigation architecture
- `ux-designer-specifier` — concrete surface/flow composition, states, interactions, feedback, responsive/keyboard behavior, implementation-ready UX spec
- `design-architecture` — cross-cutting tokens, shared components, reusable UI rules, accessibility/system guardrails, design-system governance

Do not duplicate their detailed reasoning inside this skill.

## Core routing principle

Choose the **lowest responsible layer that can safely solve the task**.

Do not restart upstream work merely because upstream artifacts exist.

Examples:

```text
"Make the Documents empty state clearer"
-> ux-designer-specifier
```

```text
"Where should Reviews live: globally, inside Projects, or inside Documents?"
-> information-architect
```

```text
"We're adding approvals to the MVP; what user need does this serve and is it in scope?"
-> product-intent
```

```text
"Buttons and spacing are drifting across screens"
-> design-architecture
```

If a local task exposes an unresolved upstream decision, backtrack only as far as needed, resolve it, then return downstream.

## Hard boundaries

This skill must not:

- invent user intentions or capabilities instead of using `product-intent`
- decide product object ownership or destination hierarchy instead of using `information-architect`
- design screen composition or detailed interactions instead of using `ux-designer-specifier`
- define tokens/components/system rules instead of using `design-architecture`
- run every stage automatically for a task that belongs to one layer
- create a new project status/documentation system just to track the pipeline
- treat a specialist's output as invalid merely because it uses a different project file layout

The orchestrator owns sequencing and readiness, not design authority.

## Determine the operating mode

Infer the mode from the user's request.

- **ROUTE** — identify the correct specialist for a single task.
- **ORCHESTRATE** — coordinate a task that genuinely crosses multiple design layers or starts from a raw idea.
- **RESUME** — inspect existing artifacts/work and continue from the lowest unresolved gate.
- **DIAGNOSE** — determine whether a design problem originates in product intent, IA, local UX specification, or design-system architecture.

Do not require slash commands.

## Before routing

Inspect enough project context to avoid guessing ownership.

Look for, when available:

1. repository/project instructions
2. canonical product requirements or intention map
3. information-architecture/navigation documentation
4. existing UX specs or representative screens
5. design-system/styling architecture documentation
6. routes/navigation shells when structural questions are involved
7. current task wording and affected scope

Prefer canonical project artifacts over filenames assumed by this skill.

Do not create parallel sources of truth.

## Layer classifier

Use the decision being made, not the nouns in the prompt.

### Route to `product-intent` when the unresolved decision is about

- who the relevant user/actor is
- what progress/outcome they need
- whether a capability belongs in the product or MVP
- evidence vs assumption about user need
- product scope or capability-level priority

Typical question:

> Should this product support this capability, for whom, and why?

### Route to `information-architect` when the unresolved decision is about

- product conceptual model
- user-visible objects/entities and relationships
- where a capability belongs
- global vs contextual ownership
- destination hierarchy
- taxonomy/labeling across surfaces
- navigation architecture, entry points, wayfinding, cross-surface structure

Typical question:

> Where does this belong in the product, and how should users understand/reach it?

### Route to `ux-designer-specifier` when the unresolved decision is about

- one concrete surface or bounded workflow
- composition and control placement
- interactions and feedback
- states such as loading/empty/error/selected/disabled
- keyboard/focus/responsive behavior
- implementation-ready UX contract or wireframe

Typical question:

> How should this specific surface or flow work?

### Route to `design-architecture` when the unresolved decision is about

- reusable design-system rules
- tokens/themes
- shared component ownership or variants
- cross-screen consistency
- reusable interaction patterns
- accessibility/system guardrails
- design-system governance, audits, migration, or architectural drift

Typical question:

> What reusable UI-system rule should constrain implementation across the product?

## Stage gates

Read [references/stage-gates.md](references/stage-gates.md) when coordinating multiple stages, resuming work, or diagnosing upstream leakage.

Use gates as sufficiency checks, not ceremonies. A small MVP can pass a gate with a compact artifact and a few explicit decisions.

### Intent gate

Before IA work that depends on product scope, confirm enough is known about:

- relevant actors
- primary intentions/outcomes
- required capabilities
- MVP boundary for the affected scope
- consequential assumptions

If these are sufficiently established, do not rerun `product-intent`.

### IA gate

Before detailed surface specification that depends on cross-surface structure, confirm enough is known about:

- owning object/context
- destination/navigation role when relevant
- relationship to surrounding destinations
- primary entry/cross-surface flow
- stable terminology for the affected scope

If these are sufficiently established, do not rerun `information-architect`.

### Specification gate

Before implementation, confirm the affected surface/flow is sufficiently specified for the work being attempted.

Do not force full-screen documentation for a tiny local change. Require only the states/interactions needed to avoid implementation guessing.

### Design-architecture gate

`design-architecture` is cross-cutting rather than a mandatory linear stage.

Use it when the work:

- creates/changes a reusable component or token
- establishes a new pattern that will recur
- reveals system-wide inconsistency
- changes shared accessibility/interaction standards
- asks for an audit or migration

Do not run a design-system audit after every local UX task.

## Backtracking rules

Backtrack when a specialist would otherwise be forced to invent an upstream decision.

### From UX specification -> information architecture

Backtrack when the local surface requires deciding:

- whether something is a destination at all
- global vs contextual ownership
- product-wide naming/taxonomy
- object relationships
- cross-surface navigation structure

Do not hide an IA problem inside more tabs, menus, breadcrumbs, or local controls.

### From information architecture -> product intent

Backtrack when IA cannot proceed without deciding:

- whether a capability belongs in scope
- which user need is primary
- which actor is actually being served
- whether an assumption materially changes the product model

Do not invent product value to justify a destination.

### From implementation/UX -> design architecture

Escalate sideways to `design-architecture` when a local solution would create:

- a new reusable component role
- a new semantic token role
- a repeated one-off convention
- a cross-screen accessibility or interaction rule

After the system decision is resolved, return to the local task.

## ORCHESTRATE workflow

Use only when the task genuinely spans multiple layers or the user asks for an end-to-end design process.

1. Inspect existing canonical artifacts and current implementation.
2. Determine the highest unresolved dependency that materially blocks the task.
3. Start there; do not redo already-sufficient upstream layers.
4. Apply the owning specialist skill.
5. Run the corresponding readiness gate.
6. Hand off only the decisions downstream actually need.
7. Continue to the next required layer.
8. Backtrack when a downstream specialist exposes an upstream ambiguity.
9. Stop when the user's requested outcome is achieved; do not continue into implementation or audits they did not ask for.

For a raw idea, the common path is:

```text
product-intent
  -> information-architect
  -> ux-designer-specifier
  -> implementation
```

But this is a default dependency order, not a ritual.

## ROUTE workflow

For a clearly bounded request:

1. identify the actual decision being requested
2. identify the lowest layer that owns it
3. check whether an upstream gap blocks that layer
4. route to one specialist
5. do not broaden the task

When ownership is clear, routing should be brief.

## RESUME workflow

When continuing an existing project:

1. locate canonical artifacts; do not rely on expected filenames
2. determine which relevant gates already pass
3. identify the lowest unresolved gate for the requested scope
4. continue there
5. preserve existing coherent decisions rather than recreating the pipeline from scratch

Do not create `DESIGN_STATUS.md` or equivalent unless the project already uses one or the user explicitly asks for persistent pipeline status.

## DIAGNOSE workflow

When the user says the UX is "bad", "confusing", "poor", or similar without knowing the layer:

Classify the failure before proposing a fix.

Examples:

- wrong/missing capability or unclear value -> `product-intent`
- users cannot understand where something belongs/find it -> `information-architect`
- correct destination but confusing controls/states/flow -> `ux-designer-specifier`
- repeated inconsistency across screens/components -> `design-architecture`

A symptom may appear at a lower layer while originating upstream. Prefer the root cause, but do not escalate without evidence.

## Minimal handoff contract

Between stages, pass only what the next specialist needs.

Use this compact shape when a handoff must be explicit:

```text
Owner completed: <skill>
Scope: <affected product area>
Canonical source: <artifact/path or "conversation only">
Established decisions:
- ...
Open risks/questions relevant downstream:
- ...
Next owner: <skill>
Why: <one sentence>
```

Do not create a separate handoff file by default.

## Conflict resolution

When project artifacts and specialist assumptions conflict:

1. prefer explicit current project decisions over skill defaults
2. prefer the specialist that owns the layer over orchestrator inference
3. surface real contradictions instead of silently choosing
4. distinguish stale documentation from implementation drift when possible
5. update the canonical owner only when the task includes changing that decision

The orchestrator must not become a second source of truth.

## Efficiency rules for MVP work

Use proportional rigor.

For a small product/MVP:

- a one-page intention map can be sufficient
- a compact object/destination tree can be sufficient IA
- one or two representative task traces can be enough
- a local UX spec can cover only meaningful states/interactions
- lightweight reasoning beats ceremonial workshops

Do not require personas, journey maps, card sorting, tree testing, prototypes, or design-system audits unless uncertainty/risk justifies them.

## Final response

When orchestrating, report briefly:

- current/starting layer
- specialist(s) used or recommended
- any gate that blocked progress
- any backtracking performed
- what is now established
- next owner only if further work is genuinely required

Do not present the pipeline itself as the deliverable when the user asked for design work.
