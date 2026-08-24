---
name: product-intent
description: Clarifies product-level user intentions, actors, jobs, capabilities, evidence, and MVP boundaries before information architecture or screen design. Use when turning a raw idea, broad requirement, or existing product into an intention map or product-intent contract; auditing whether downstream UX has adequate upstream intent; or revising product intent after scope changes. Do not use for navigation structure, screen composition, visual styling, component design, or implementation.
---

# Product Intent

Turn ambiguous product ideas and requirements into a small, evidence-aware contract describing who is trying to achieve what, why it matters, and which product capabilities are justified.

This skill owns the question:

> What are users trying to accomplish, and what capabilities must the product provide to support those intentions?

It does not decide where those capabilities live in the product or how screens are composed.

## Core outcome

Produce or maintain one canonical product-intent artifact that downstream information architecture can trust.

Prefer an existing project owner such as a product brief, requirements document, product map, or existing intention map. Create a new artifact only when no suitable canonical owner exists.

Default fallback when no project convention exists:

```text
docs/product/PRODUCT_INTENT.md
```

Use [assets/PRODUCT_INTENT.template.md](assets/PRODUCT_INTENT.template.md) as a starting point, deleting sections that add no value.

## Boundaries

This skill owns:

- relevant actors or user groups
- contexts/triggers that create a need
- user goals, intentions, jobs, and desired outcomes
- evidence vs assumptions
- capabilities required to satisfy those intentions
- MVP inclusion/exclusion at the capability level
- uncertainty that materially affects downstream design

This skill does not own:

- product navigation or destination hierarchy
- taxonomy or information hierarchy
- screen/surface composition
- UI controls, states, layout, spacing, color, or typography
- component/token architecture
- frontend/backend implementation

Do not solve downstream IA or UI questions inside the intention map.

## Determine the operating mode

Infer the mode from the task.

- **CREATE** — turn a new idea or broad requirements into product intent.
- **RECONSTRUCT** — infer the current product intent from an existing app, requirements, workflows, support material, analytics, or code/docs.
- **REFINE** — revise intentions/capabilities after scope, evidence, or priorities change.
- **AUDIT** — check whether current product intent is coherent, evidenced, and sufficient for downstream IA.

If multiple modes apply, use: inspect -> reconstruct/audit -> resolve -> update.

## Before defining intent

Inspect whatever evidence already exists. Look for:

1. Existing product briefs, intention maps, PRDs, strategy docs, or requirements.
2. User research, interview notes, support issues, analytics, or observed workflows when available.
3. Existing product surfaces and major workflows when reconstructing.
4. Domain vocabulary and actor roles.
5. Explicit MVP scope, constraints, or non-goals.
6. Existing canonical ownership for product intent.

Never create a parallel product-intent source of truth merely to conform to this skill.

## Evidence discipline

Separate these explicitly:

- **Known** — directly supported by user input, project evidence, observed behavior, or an existing decision.
- **Inferred** — reasonable interpretation of available evidence.
- **Assumed** — plausible but unsupported claim that may affect design.
- **Unknown** — missing information that cannot safely be inferred.

Do not present inferred or assumed intentions as research findings.

When uncertainty does not materially change the MVP, record it and proceed. When it changes the product model or major capability set, surface it as a decision risk before downstream IA.

Read [references/evidence-and-uncertainty.md](references/evidence-and-uncertainty.md) when evidence quality or ambiguity is important.

## Intention quality rules

Write intentions as desired progress or outcomes, not UI solutions.

Good:

```text
Understand what requires my attention.
Find the document I was working on yesterday.
Review proposed changes before they are merged.
```

Weak:

```text
Use the dashboard.
Click Reviews in the sidebar.
Open a modal.
```

A useful intention should usually be:

- meaningful to the user
- stable across plausible UI implementations
- specific enough to imply capabilities
- free of premature navigation or component choices

## Reasoning pipeline

### 1. Establish the frame

State:

- product/problem context
- relevant actors
- major constraints
- whether this is new design or reconstruction

Do not invent personas when actor distinctions do not affect the product.

### 2. Extract evidence and assumptions

Create the smallest useful evidence inventory. Mark consequential assumptions.

Do not perform ceremonial research summaries when the evidence is simple.

### 3. Model user progress

For each relevant actor/context, derive:

```text
Trigger/context -> intention -> desired outcome
```

Distinguish goals from tasks. A task is often one way to satisfy an intention.

### 4. Derive capabilities

For each important intention, ask:

> What must the product enable, independent of a specific screen or navigation pattern?

Example:

```text
Intention: Understand what requires my attention.
Capabilities:
- surface assigned work
- surface pending reviews
- show meaningful status/urgency
- provide a way to resume relevant work
```

Capabilities are not navigation labels by default.

### 5. Map traceability

Every MVP capability should trace to at least one supported intention.

Every primary intention should have enough capability coverage to be realistically achievable.

Flag:

- capabilities with no clear user intention
- important intentions with no supporting capability
- duplicate capabilities expressed with inconsistent terminology

### 6. Set MVP boundaries

Classify consequential capabilities as:

- **MVP** — required for the product's primary value or core workflow
- **Later** — useful but not necessary for the first coherent product
- **Out** — intentionally excluded
- **Unresolved** — depends on an open assumption/decision

Do not use fake precision such as numeric priority scores unless the project already does.

### 7. Build the intention map

Use a compact table or ASCII/Mermaid relationship map. Prefer readability over visual complexity.

Read [references/intention-mapping.md](references/intention-mapping.md) for the default model.

### 8. Run the downstream readiness gate

Before handing off to information architecture, verify that downstream design can answer:

- Which actors matter for this scope?
- What are their primary intentions?
- Which capabilities support those intentions?
- What is inside/outside the MVP?
- Which assumptions could materially change the product structure?

If yes, hand off.

If no, do not invent navigation or screens to hide the gap.

## Conditional discovery / divergence

Do not run a full design-thinking ceremony by default.

Use divergent exploration only when there are multiple materially different interpretations of the problem, actor, or capability set.

When needed:

1. state the competing interpretations
2. show what evidence supports each
3. identify what downstream decision changes
4. recommend the smallest useful validation or decision
5. converge when evidence is sufficient

Use a Lean-UX-style hypothesis/test loop only when an important assumption is both uncertain and reasonably testable. Do not create experiments for trivial or low-risk decisions.

## RECONSTRUCT mode

When the product already exists:

1. inspect current workflows, routes/surfaces, labels, docs, and major features
2. infer the intentions the product appears to serve
3. separate observed capability from inferred user purpose
4. identify orphan capabilities or conflicting product promises
5. reconstruct the smallest coherent intent model
6. mark uncertainty instead of rewriting history as certainty

Current UI structure is evidence of implementation, not proof of correct product intent.

## AUDIT mode

Check for:

- solution-shaped intentions
- intentions with no meaningful outcome
- unsupported claims presented as facts
- capabilities with no traceable intention
- primary intentions missing capability coverage
- MVP scope that mixes must-have and speculative features
- inconsistent domain terminology
- actor distinctions that add complexity but no design consequence
- downstream IA/UI decisions embedded prematurely in the intent artifact

Prioritize issues that would cause downstream architecture to organize the wrong product.

## Handoff to information architecture

Provide:

- canonical product-intent artifact/location
- relevant actors
- primary intentions and outcomes
- capability map
- MVP boundaries
- consequential assumptions/open questions
- terminology that should remain stable downstream

Do not provide a sidebar, sitemap, route tree, or screen composition unless the user explicitly requests a combined task. If combined, keep product-intent decisions logically separate from information-architecture decisions.

## Documentation guardrails

- Prefer one compact product-intent contract over multiple overlapping documents.
- Keep evidence summaries proportional to the decision risk.
- Do not create personas, journey maps, hypotheses, or research artifacts by default.
- Do not duplicate requirements verbatim; transform them into user-centered intent and capability traceability.
- Record only uncertainty that can change product scope or downstream architecture.
- The artifact should reduce ambiguity, not preserve every thought from discovery.

## Final report

Report briefly:

- canonical artifact created/updated/used
- primary intentions established or changed
- MVP capability boundary established or changed
- consequential assumptions/open questions
- whether the work is ready for `information-architect`
