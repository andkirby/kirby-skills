---
name: design-architecture
description: Establishes and governs cross-cutting UI architecture and design-system standards for software projects. Use for project-wide design-system ownership, architecture audits or migrations, token/component governance, and reusable decisions that affect multiple screens or shared UI. Do not use for styling a single screen, ordinary component implementation, isolated accessibility fixes, or visual exploration that does not change shared architecture.
---

# Design Architecture

Create and maintain a small, enforceable design contract for the project. Treat design standards as architecture: rules should constrain implementation, preserve product logic, and reduce one-off decisions.

Do not turn the repository into a UX textbook. Keep general design knowledge inside this skill. Persist only project-specific decisions in the project.

## Core outcome

A healthy project should have one clear design-system contract, wherever the repository already expects it to live, plus the existing machine-level sources of truth for tokens, themes, and shared components.

If the project has no suitable canonical design documentation, the default fallback is:

```text
.design/
  DESIGN_SYSTEM.md
  decisions.md

<existing project token/theme files>
<existing shared component library>
```

Do not create `.design/` merely to conform to this skill. Do not create extra design documents unless they have a distinct maintenance or enforcement purpose.

## Determine the operating mode

Infer the mode from the user's task. Do not require slash commands.

- **INIT** — establish standards for a new or existing project.
- **AUDIT** — find violations and architectural drift.
- **EXTEND** — add or change a reusable component, token, pattern, or rule.
- **REVIEW** — evaluate a screen, flow, implementation, or design proposal against the standards.
- **MIGRATE** — consolidate an inconsistent existing UI into the design architecture incrementally.

If multiple modes apply, perform them in dependency order: inspect -> audit -> decide -> change -> document.

## Before any design decision

Inspect the project before prescribing a system. Find, when available:

1. Existing design or product documentation.
2. Package/framework configuration.
3. Theme, CSS, Tailwind, CSS-in-JS, or token configuration.
4. Shared UI/component directories.
5. Layout and navigation shells.
6. Representative high-traffic and high-density screens.
7. Existing accessibility utilities and test tooling.

Preserve intentional conventions that are coherent. Do not replace a working design language merely because another pattern is fashionable.

Before creating or choosing a design contract location, identify existing documentation ownership. Look for repository guidance, design-system docs, styling architecture docs, contribution docs, or other files that already claim canonical ownership. Prefer extending the existing canonical owner over introducing a parallel source of truth.

If `.design/DESIGN_SYSTEM.md` exists and no stronger repository-specific owner supersedes it, treat it as the project design contract. If implementation and contract disagree, determine whether the code drifted or the contract is stale. Never violate a canonical contract silently.

## Load references selectively

Read only the references relevant to the current task:

- Product behavior, workflows, feedback, errors, navigation, progressive disclosure: [references/product-interaction.md](references/product-interaction.md)
- Density, hierarchy, typography, visual restraint, information presentation: [references/information-visual.md](references/information-visual.md)
- Tokens, components, variants, states, composition, governance: [references/system-architecture.md](references/system-architecture.md)
- Keyboard, focus, contrast, semantics, readable interaction, inclusive behavior: [references/accessibility.md](references/accessibility.md)
- Severity model and review output: [references/review-rubric.md](references/review-rubric.md)

These references synthesize established design principles. Apply them as evaluation lenses, not as impersonation or aesthetic dogma.

## Architecture hierarchy

When implementing UI, prefer this order:

1. Reuse an existing semantic token.
2. Reuse an existing shared component or pattern.
3. Add a justified variant/state to an existing component.
4. Add a new semantic token when a reusable role is missing.
5. Add a new component when the semantic or behavioral role is genuinely distinct.
6. Allow a local exception only when it is intentionally local and does not create a hidden reusable convention.

Never solve a system-level inconsistency with repeated page-local patches.

## Standard categories

The project contract should cover only decisions that constrain future work. Prefer these categories:

- Product character and density
- Layout and responsive behavior
- Typography roles
- Semantic color roles and themes
- Spacing/sizing conventions
- Component ownership and API rules
- Interaction states and feedback
- Navigation and workflow rules
- Forms, tables, overlays, search/filter patterns when relevant
- Accessibility baseline
- Content/copy conventions when they affect interaction
- Governance and exception handling

Do not fill categories with generic advice. Omit sections the project has not meaningfully decided.

## INIT workflow

### 1. Discover the existing system

Identify:

- canonical design/styling documentation owner, if any
- framework and styling approach
- existing token sources
- component library or primitives
- repeated visual values and interaction patterns
- page shells and navigation model
- light/dark or other theme strategy
- accessibility baseline
- obvious architectural conflicts

Separate **existing intentional conventions** from **accidental repetition**.

### 2. Define the minimum contract

If a canonical design/styling document already exists, extend that owner rather than creating a competing contract. Preserve its established location and structure unless consolidation is itself the task.

Only when no suitable canonical owner exists, create `.design/DESIGN_SYSTEM.md` from [assets/DESIGN_SYSTEM.template.md](assets/DESIGN_SYSTEM.template.md), keeping only relevant sections.

A useful rule must answer at least one of these:

- What should future code reuse?
- What choices are forbidden or constrained?
- Where is the source of truth?
- How must a reusable component behave?
- How is an exception approved and recorded?
- How can a reviewer tell whether the rule is satisfied?

Delete generic prose that answers none of them.

### 3. Establish machine-level sources of truth

Prefer the project's existing mechanism. Examples include CSS custom properties, Tailwind theme values, typed token objects, theme configuration, or a component library.

Use semantic roles for application code. Primitive values may exist beneath the semantic layer.

Example hierarchy:

```text
primitive: gray.950
semantic: text.primary -> gray.950
component: button.primary.text -> text.onAction
```

Do not create three token layers when the project only needs two. Complexity must pay for itself.

### 4. Record only consequential decisions

Use the repository's existing architectural decision mechanism when one exists. Otherwise create `.design/decisions.md` from [assets/decisions.template.md](assets/decisions.template.md).

Record decisions when they:

- change a shared contract
- introduce an exception
- choose between plausible architectural alternatives
- deprecate a token/component/pattern
- materially change interaction behavior

Do not log ordinary implementation details.

### 5. Validate the contract

Check that the standards are:

- project-specific
- internally consistent
- implementable with the current stack
- accessible
- small enough to be read before UI work
- connected to actual tokens/components/tests/review checks

If a rule cannot be enforced or reviewed, rewrite it to become observable or remove it.

## AUDIT workflow

Audit the architecture before polishing individual pixels.

Inspect for:

- raw colors where semantic tokens should be used
- duplicated shared controls or patterns
- page-local component forks
- arbitrary spacing/type values that bypass established scales
- missing interaction states
- inconsistent loading, error, empty, success, or destructive-action behavior
- navigation/workflow inconsistency
- inaccessible keyboard/focus/semantics/contrast behavior
- density or hierarchy that harms scanning and comparison
- light/dark theme divergence
- contract/code disagreement

Use [references/review-rubric.md](references/review-rubric.md) for severity.

Fix root causes before local symptoms. Prefer a token, component, or pattern correction that removes many violations at once.

Optionally run `scripts/design_smell_scan.py <project-path>` for a fast static smell scan. Treat script findings as leads, not proof of design-system violations.

## EXTEND workflow

Before adding a reusable UI concept:

1. State the user/job need the concept serves.
2. Search existing tokens, components, and patterns for semantic overlap.
3. Decide: reuse, compose, add variant/state, or create new.
4. Define behavior before appearance: states, keyboard behavior, feedback, errors, loading, disabled behavior, responsive behavior.
5. Define the smallest public API that represents semantic choices rather than styling knobs.
6. Implement using semantic tokens.
7. Discover and run the project's existing relevant validation commands. Prefer repository-owned lint, typecheck, test, build, browser, and accessibility workflows over inventing parallel validation.
8. When behavior changed, verify representative interaction states such as keyboard/focus, loading/error, responsive behavior, and themes when the project's tooling permits it. Report anything that could not be verified.
9. Update the canonical design contract only if future contributors need a new rule.
10. Add a decision-log entry only if the architectural contract changed.

Avoid components whose API exposes arbitrary visual escape hatches such as unrestricted `color`, `padding`, or `radius` props when semantic variants would work.

## REVIEW workflow

Evaluate in this order:

1. Product logic and task completion
2. Workflow/navigation and system visibility
3. Information hierarchy and density
4. Component/token architecture and consistency
5. Accessibility and input methods
6. Visual restraint and polish

Do not let visual polish hide architectural or interaction failures.

Report findings with evidence and a concrete repair path. Distinguish contract violations from optional improvements.

## MIGRATE workflow

Do not rewrite the entire UI by default.

1. Inventory the most repeated values/components/patterns.
2. Choose a small set of high-leverage semantic tokens and primitives.
3. Migrate shared/high-traffic components first.
4. Add compatibility aliases when a big-bang rename would create avoidable risk.
5. Migrate screens opportunistically or by product priority.
6. Remove deprecated tokens/components only after usage is gone.
7. Keep the contract describing the target architecture, with migration notes for temporary exceptions.

## Guardrails for documentation

- Prefer one contract over many overlapping documents.
- Prefer tables/checklists for constraints; use prose for rationale only when needed.
- Put exact visual values in tokens/config, not duplicated in Markdown.
- Link to the actual source of truth instead of copying it.
- Do not document every component prop; component code/types are normally the API reference.
- Document cross-cutting behavior and contribution rules that code alone cannot explain.
- Every new standard should remove future ambiguity or prevent a known failure mode.

## Default project deliverables

For INIT, unless the user asks for more, produce:

1. A concise project-specific contract in the repository's canonical design/styling documentation location; use `.design/DESIGN_SYSTEM.md` only when no suitable owner exists.
2. A lightweight decision log using the repository's existing ADR/decision mechanism; use `.design/decisions.md` only when none exists.
3. Required changes to existing token/theme/component sources of truth.
4. A short audit summary listing unresolved risks.

Do not generate a component encyclopedia, brand book, Figma-style catalog, or separate principles document by default.

## Completion check

Before finishing, verify:

- Did the work preserve one canonical design-system owner rather than create a parallel source of truth?
- Were relevant repository-owned validation commands discovered and run, with unverified checks reported?
- Is the project contract shorter than the knowledge used to derive it?
- Can an engineer identify the approved token/component/pattern before inventing one?
- Are interaction states and accessibility part of the architecture, not afterthoughts?
- Is there a clear policy for variants, new components, and exceptions?
- Are light/dark themes semantic rather than duplicated styling branches when themes are required?
- Did the work reduce future one-off decisions?

If not, simplify or strengthen the architecture before declaring it complete.
