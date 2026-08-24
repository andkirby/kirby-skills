# Design pipeline stage gates

Use these gates to decide whether downstream work has enough upstream structure. They are sufficiency checks, not mandatory documents.

## 1. Product-intent -> information architecture

Pass when the affected scope has enough clarity on:

- relevant actor(s)
- primary intention(s) / desired outcomes
- capabilities required to support them
- MVP inclusion/exclusion where scope matters
- assumptions that could materially change the product structure

Do not fail the gate because research artifacts are absent when the user's requirements already establish enough intent for an MVP.

Fail or backtrack when IA would need to invent why a capability exists or whether it belongs in scope.

## 2. Information architecture -> UX specification

Pass when the affected surface/flow has enough clarity on:

- owning product object/context
- destination role, if it is a destination
- global/contextual/utility/cross-cutting scope when relevant
- relationship to surrounding destinations/objects
- important entry points and cross-surface movement
- terminology stable enough to specify the UI

Do not fail because the exact sidebar/tab/control implementation is undecided; that may belong in UX specification.

Fail or backtrack when the specifier would have to invent product-wide ownership, hierarchy, or navigation meaning.

## 3. UX specification -> implementation

Pass when implementation can proceed without guessing consequential behavior.

Depending on scope, this may include:

- surface/flow anatomy
- important controls/actions
- important states (loading, empty, error, selected, disabled, etc.)
- feedback and error behavior
- keyboard/focus behavior where relevant
- responsive behavior where relevant
- downstream constraints or shared components to reuse

Use proportional detail. A tiny local change does not require a full screen spec.

Fail when implementation would need to invent user-visible behavior or state transitions.

## 4. Cross-cutting design-architecture escalation

This is not a sequential gate.

Escalate to `design-architecture` when a decision affects reusable system architecture, such as:

- new semantic token role
- new shared component or meaningful variant
- repeated interaction pattern
- project-wide visual or accessibility rule
- migration/consolidation of inconsistent UI

Do not escalate merely because a task uses an existing shared component.

## Backtracking matrix

| Symptom | Likely owner | Backtrack trigger |
|---|---|---|
| Feature has no clear user value/scope | `product-intent` | Capability justification or MVP inclusion is unresolved |
| Navigation feels arbitrary | `information-architect` | Destination ownership/hierarchy is unresolved |
| User is in the right place but flow is confusing | `ux-designer-specifier` | Local composition/states/interactions are unresolved |
| Same problem repeats across many screens | `design-architecture` | Shared component/token/pattern rule is missing |
| Spec needs to decide whether an area is global or project-local | `information-architect` | Cross-surface ownership is upstream of the screen |
| IA needs to decide whether a capability belongs in MVP | `product-intent` | Product scope is upstream of structure |
| Local implementation introduces the fourth custom button pattern | `design-architecture` | Repeated local exception has become system architecture |

## Lowest-responsible-layer rule

When several layers could comment on a task, choose the lowest layer that can resolve it without inventing upstream decisions.

Examples:

- Change a button label inside an established flow -> local UX/specification, not IA.
- Add a project-wide `Reviews` destination -> IA, after checking the capability exists upstream.
- Decide whether reviews belong in the MVP at all -> product intent.
- Decide whether review actions use an existing shared action pattern -> design architecture.

This rule prevents full-pipeline churn on ordinary product work.
