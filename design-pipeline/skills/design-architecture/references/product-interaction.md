# Product & Interaction Guardrails

Use this reference for product logic, workflows, navigation, feedback, errors, and interaction behavior. It synthesizes principles associated with Don Norman, Jakob Nielsen, and Alan Cooper into project-review rules.

## Mental models and conceptual integrity

- Organize the interface around user-recognizable objects, actions, and workflows rather than backend entities unless users actually think in those entities.
- Keep the same object/action vocabulary across navigation, controls, confirmations, notifications, and documentation.
- Prefer visible structure and recognition over requiring users to remember modes, locations, or hidden commands.
- If a control's effect is non-obvious, improve the signifier, label, placement, or immediate feedback rather than adding explanatory decoration.

## Affordance and action clarity

- Interactive elements must look and behave interactive within the project's visual language.
- The primary action should be discoverable without making every action visually primary.
- Destructive, irreversible, high-cost, and permission-changing actions require stronger clarity and safeguards than routine reversible actions.
- Avoid controls that change semantic meaning based only on subtle visual state.

## Feedback and system status

Every consequential action needs an observable state transition appropriate to its duration and risk.

Consider:

- immediate pressed/selected state
- pending/loading state
- successful completion
- partial completion
- failure with recovery
- background processing and later status
- stale/conflicting data

Do not use optimistic UI for actions where falsely implying success can create meaningful harm or confusion.

## Error prevention and recovery

Prefer prevention over error messages.

- Constrain invalid choices when the constraint is known.
- Preserve user input after recoverable errors.
- Explain what failed, what remains unchanged, and what the user can do next.
- Make destructive actions reversible when feasible; otherwise add proportionate confirmation.
- Confirmation dialogs are not a substitute for clear action design.

## Workflow design

Optimize the dominant task flow before secondary features.

- Reduce unnecessary transitions between pages, overlays, and modes.
- Keep context visible when users must compare, review, or make decisions from source material.
- Support interruption and resumption for long-running professional workflows.
- Preserve selections, filters, scroll position, draft state, and working context when losing them would impose avoidable rework.
- Make completion criteria and next actions clear.

## Progressive disclosure

Hide complexity only when hiding it reduces cognitive load without hiding necessary state or capability.

Good candidates:

- infrequent advanced options
- configuration after a sensible default
- secondary metadata
- expert controls that do not affect interpretation of the current state

Bad candidates:

- current system status
- irreversible consequences
- required validation information
- information needed to compare alternatives
- frequently used professional controls

## Navigation

- Navigation structure should reflect stable user intentions and product objects, not implementation modules.
- Keep location and hierarchy legible.
- Avoid multiple navigation mechanisms that appear equivalent but behave differently.
- Preserve stable destinations and labels as the product grows.
- For dense professional tools, support efficient switching without forcing repeated returns to a home screen.

## Power-user efficiency

Where the product is used frequently or for long sessions:

- support keyboard navigation for repeated operations
- preserve spatial consistency
- avoid unnecessary animation or modal interruption
- allow bulk operations where task semantics permit
- expose useful shortcuts without making them the only route
- make expert paths faster while keeping basic paths understandable

## Review questions

1. What does the user believe they are acting on?
2. Is the available action obvious at the moment it is needed?
3. Does the UI show what the system is doing now?
4. Can common mistakes be prevented or cheaply recovered?
5. Does the workflow preserve useful context?
6. Is hidden complexity actually secondary?
7. Can a frequent user complete the task without repetitive navigation overhead?
