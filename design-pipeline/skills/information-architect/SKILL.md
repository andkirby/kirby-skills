---
name: information-architect
description: Defines or audits cross-surface information architecture from established product intent: conceptual model, core objects and relationships, destination hierarchy, contexts, entry points, labeling, and navigation architecture. Use when deciding how a product is organized, where capabilities belong, how users orient and move across areas, or when reconstructing/auditing an existing product structure. Do not use for product-strategy or intention discovery, detailed screen composition, visual styling, component implementation, or local UI tweaks.
---

# Information Architect

Turn established product intent into a coherent product structure that users can understand, navigate, and extend as the product grows.

This skill owns the question:

> How should the product's information, objects, destinations, and contexts be organized so users can find what they need and understand where they are?

Navigation is an output of information architecture, not the starting point.

## Core outcome

Produce or maintain one canonical information-architecture contract covering only cross-surface structural decisions that downstream UX specification needs.

Prefer an existing canonical owner such as an IA document, product map, sitemap, route architecture document, or design documentation. Create a new artifact only when no suitable owner exists.

Default fallback:

```text
docs/design/INFORMATION_ARCHITECTURE.md
```

Use [assets/INFORMATION_ARCHITECTURE.template.md](assets/INFORMATION_ARCHITECTURE.template.md), deleting irrelevant sections.

## Boundaries

This skill owns:

- product conceptual model at the information-architecture level
- core user-visible objects/entities and meaningful relationships
- taxonomy, grouping, hierarchy, and labeling
- destination model
- global, contextual/local, and utility areas
- entry points and cross-context movement
- navigation architecture derived from the above
- cross-surface task coverage and wayfinding
- structural ambiguity that must be resolved before surface specification

This skill does not own:

- whether a capability belongs in the product at all when upstream intent has not established it
- product strategy, market positioning, or business prioritization
- detailed composition of a specific screen
- exact controls, state tables, layout dimensions, spacing, colors, or typography
- component/token architecture
- runtime implementation

Do not repair an upstream product-intent problem with information architecture. Do not repair an IA problem with local UI complexity.

## Determine the operating mode

Infer the mode from the task.

- **CREATE** — establish IA for a new product/area from product intent.
- **RECONSTRUCT** — recover the actual IA of an existing product from docs, routes, surfaces, code, and workflows.
- **EXTEND** — place a new established capability/object into the existing architecture.
- **AUDIT** — detect structural, labeling, navigation, and wayfinding problems.

If multiple modes apply, prefer: inspect -> reconstruct -> audit -> model -> decide -> update -> hand off.

## Upstream readiness gate

Before designing IA, establish whether you know enough upstream truth:

- relevant actors or contexts
- primary user intentions/outcomes
- established capabilities for this scope
- major MVP boundaries
- consequential assumptions that could change product structure

Prefer the canonical product-intent artifact when one exists.

If intent is incomplete but can be reasonably reconstructed from existing evidence, label inferences and proceed cautiously.

If a missing upstream decision materially changes the product model, flag it instead of silently deciding product strategy.

Do not create navigation as a substitute for missing product intent.

## Inspect before prescribing

Read whichever sources exist:

1. Product-intent / intention-map / requirements artifacts.
2. Existing IA, product maps, route architecture, navigation docs, or design docs.
3. Route definitions and application shells.
4. Existing sidebars, top navigation, tabs, breadcrumbs, search, and command surfaces.
5. Major workflows and representative screens.
6. Domain terminology, labels, permissions, and ownership rules.
7. Existing UX specs that depend on cross-surface structure.

Identify canonical ownership before creating a new IA document. Extend the existing owner rather than introducing a parallel source of truth.

Current routes/navigation reveal implemented structure; they do not automatically prove the structure is correct.

## Load references selectively

- Core objects, relationships, mental-model alignment, conceptual-model clarity: [references/conceptual-models.md](references/conceptual-models.md)
- Hierarchy, taxonomy, grouping, labeling, task coverage: [references/information-architecture.md](references/information-architecture.md)
- Global/local/utility navigation, entry points, wayfinding, cross-context movement: [references/navigation.md](references/navigation.md)
- Structural evaluation, ambiguity, lightweight validation methods: [references/evaluation.md](references/evaluation.md)

Use frameworks as reasoning tools, not mandatory ceremonies.

## Core reasoning pipeline

### 1. Reconstruct or establish the product model

Start with upstream intentions and capabilities.

Identify the smallest useful set of user-visible concepts that organize the product:

- objects/entities
- collections
- contexts/containers
- relationships
- meaningful lifecycle/status concepts when they affect findability or navigation

Example:

```text
Workspace
  -> Project
     -> Document
        -> Review
     -> Task
```

Do not mirror the database schema. Model concepts users need to understand.

### 2. Check mental-model alignment

Ask:

- What objects/actions are users likely to expect?
- What conceptual model does the product expose?
- Where must users translate between two incompatible models?
- Are labels using domain language users can recognize?

A conceptual model can be internally consistent and still be wrong for the user's expectations.

### 3. Trace intentions to places and contexts

For each primary intention, identify the information/context needed to accomplish it.

Do not immediately turn every capability into a destination.

Distinguish:

- **object** — something users understand/manage (Project, Document, Review)
- **destination** — a place users intentionally navigate to
- **view** — one representation of an object/context
- **action** — something users do; not navigation by default
- **status/filter** — a property or lens; not a destination by default

This distinction is a hard guardrail.

### 4. Build the destination model

Classify destinations by ownership and scope.

Typical categories:

- **Global** — stable destinations relevant across product contexts
- **Contextual/local** — destinations owned by a selected object/context
- **Utility** — settings, account, notifications, help, administration
- **Cross-cutting work views** — only when users genuinely need a cross-context place such as "My Work" or a review queue

Do not force every product into these exact buckets; use them to expose mixed abstraction levels.

### 5. Resolve hierarchy and grouping

Group by user-recognizable concepts and task relationships, not implementation modules.

Check:

- siblings represent comparable abstraction levels
- parent/child ownership is understandable
- labels are mutually distinguishable
- frequently paired tasks do not require unnecessary context switching
- deep hierarchy is justified by meaningful containment, not organizational convenience

### 6. Diverge only when structure is genuinely ambiguous

If there are multiple plausible IA models, do not pick the first familiar pattern.

Create 2–3 materially different alternatives, for example:

```text
A. project-centric
B. work-centric
C. hybrid project + personal work queue
```

Evaluate each against:

- primary intention coverage
- mental-model fit
- findability
- context clarity
- cross-surface workflow cost
- scalability
- terminology clarity
- implementation/migration constraints when relevant

Then converge on a recommendation with trade-offs.

Do not create alternatives that differ only cosmetically.

### 7. Derive navigation architecture

Only after the destination model and hierarchy are coherent, derive navigation mechanisms.

Answer:

- Which destinations must remain globally reachable?
- Which navigation appears only inside a context?
- How does a user know the current context/location?
- How can users move between related objects without returning to a global root unnecessarily?
- What are the important direct entry points (search results, notifications, deep links, recent work)?
- What actions must remain actions instead of becoming navigation items?

Do not choose sidebar/tabs/top-nav because they are fashionable. The UI mechanism comes after the navigation role is established.

Detailed dimensions, control anatomy, responsive behavior, and surface composition belong downstream in `ux-designer-specifier`.

### 8. Validate task coverage

Trace representative primary intentions through the proposed architecture.

For each:

```text
entry point -> orientation -> destination/context -> completion path -> return/resume path
```

Look for:

- unclear starting points
- orphan destinations
- dead ends
- excessive context switching
- ambiguous labels
- duplicated concepts
- destinations that mix actions and content
- hidden high-frequency workflows
- structures that only work when users remember where something lives

Use [references/evaluation.md](references/evaluation.md) when uncertainty warrants lightweight validation such as tree testing or card sorting.

### 9. Run the navigation gate

Do not hand off navigation architecture unless:

- every primary destination has a clear role/owner
- global vs contextual scope is coherent
- primary intentions have plausible entry/completion paths
- important cross-context flows are represented
- terminology is stable enough for screen specification

### 10. Hand off to UX specification

Provide downstream:

- canonical IA artifact/location
- product object/context model
- destination hierarchy
- navigation roles (global/contextual/utility/cross-cutting)
- entry points
- primary cross-surface flows
- stable labels/terminology
- unresolved structural questions

Then `ux-designer-specifier` can determine the composition, states, controls, layout, and responsive behavior of each surface.

## CREATE workflow

1. Verify upstream product intent.
2. Establish objects/relationships and conceptual model.
3. Map primary intentions to information/context needs.
4. Propose destination hierarchy.
5. Diverge on materially different architectures when needed.
6. Select and document the architecture.
7. Derive navigation roles/mechanisms.
8. Trace primary tasks.
9. Update the canonical IA artifact.
10. Hand off surface-specific work.

## RECONSTRUCT workflow

For an existing product:

1. inventory actual routes, shells, navigation controls, major surfaces, and labels
2. reconstruct the current conceptual/destination model
3. distinguish intended structure from accidental historical growth
4. map current destinations to upstream intentions/capabilities
5. identify contradictions, orphan areas, duplicates, and mixed abstraction levels
6. preserve coherent conventions; do not redesign merely for novelty
7. propose consolidation only where it improves task completion, findability, or extensibility

## EXTEND workflow

Before adding a new destination such as Reviews, Analytics, or Activity:

1. verify the capability is established upstream
2. define the underlying object/concept and ownership
3. determine whether it is global, contextual, utility, cross-cutting, or not a destination at all
4. map its entry points and relationships to existing destinations
5. check whether an existing destination/view can absorb it coherently
6. update IA only when a structural decision changes
7. hand off exact surface behavior downstream

Never add a navigation item simply because a feature exists.

## AUDIT workflow

Look for:

- destinations with no traceable intention/capability
- primary intentions with no obvious destination/entry path
- duplicate or overlapping concepts
- mixed abstraction levels among siblings
- actions/statuses presented as destinations without justification
- unclear global vs contextual ownership
- inconsistent labels for the same concept
- route structure leaking implementation details into user language
- unnecessary depth or excessive breadth
- dead ends and weak return/resume paths
- context loss during common workflows
- navigation mechanisms chosen before hierarchy is coherent
- local UX specs compensating for upstream structural confusion

Prioritize structural problems over visual navigation polish.

## Documentation guardrails

- Prefer one canonical IA artifact over separate sitemap/navigation/taxonomy documents unless the project already needs them.
- Use diagrams and tables for structure; prose for rationale and exceptions.
- Do not document every route if routes are already a machine-readable source of truth; document the user-facing architecture and link to implementation.
- Do not duplicate upstream intention rationale; trace to it.
- Do not duplicate downstream screen composition; hand it off.
- Record alternatives only when a real architectural decision was made.

## Final report

Report briefly:

- canonical IA artifact created/updated/used
- product/conceptual model decisions made
- destination/navigation decisions made
- structural issues found or resolved
- unresolved upstream/downstream questions
- surfaces ready for `ux-designer-specifier`
