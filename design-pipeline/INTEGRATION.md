# Design pipeline integration

Recommended lightweight pipeline:

```text
                 design-orchestrator
                  (routing + gates)
                         |
raw idea / broad requirements
  -> product-intent
  -> information-architect
  -> ux-designer-specifier
  -> implementation

          design-architecture
       (cross-cutting guardrails)
```

`design-orchestrator` owns sequencing only. It should choose the lowest responsible specialist, avoid re-running already-sufficient upstream work, and backtrack only when a downstream task would otherwise invent an upstream decision.

## Ownership

| Layer | Owner | Primary question |
|---|---|---|
| Pipeline routing | `design-orchestrator` | Which layer owns this decision, which gate is missing, and what specialist works next? |
| Product intent | `product-intent` | What are users trying to accomplish, and which capabilities belong in the MVP? |
| Information architecture | `information-architect` | How should product concepts/destinations be organized so users can find and understand them? |
| Surface specification | `ux-designer-specifier` | How does this specific surface/flow compose and behave? |
| Design-system architecture | `design-architecture` | Which reusable UI rules/tokens/components constrain implementation? |

## Minimal recommended patch to ux-designer-specifier

Add an upstream readiness check before its current spec boundary check:

```text
Before specifying a surface, verify that enough upstream structure exists:
- relevant user intention / task
- owning product object or context
- destination and navigation role when applicable
- primary entry/cross-surface flow

If the task requires inventing the global information architecture, destination hierarchy, or product conceptual model, resolve that with information architecture first. Do not hide an upstream IA problem inside local screen complexity.
```

This is deliberately a small boundary patch; the existing spec/mockup workflow should remain intact.

## Minimal recommended clarification to design-architecture

Keep `design-architecture` focused on reusable UI-system rules. Information architecture and product navigation belong there only when a decision establishes a reusable system-level UI pattern, not when deciding where product capabilities live.
