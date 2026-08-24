# Navigation

Navigation is the set of mechanisms that expose and connect the underlying information architecture.

Design the destination model first.

## Navigation roles

### Global

Stable access to major product areas across contexts.

### Contextual / local

Access to destinations owned by the current object/context, such as sections inside a Project.

### Utility

Account, settings, notifications, help, administration, and similar supporting areas.

### Cross-cutting work views

A user-centric aggregation across contexts, such as My Work, only when the task genuinely crosses object ownership.

## Entry points

Users do not always start from global navigation. Consider:

- deep links
- search results
- notifications
- recent items
- external links
- command/search launchers
- resumable work

The IA should still preserve orientation when users enter deep inside it.

## Wayfinding questions

At important points users should be able to infer:

- Where am I?
- What context/object owns this area?
- What can I access from here?
- How do I reach a related object?
- How do I return or resume my previous work?

## Destination vs action

Do not turn actions into navigation merely because they are important.

Examples:

```text
Projects     -> likely destination
My Work      -> possibly cross-cutting destination
Create task  -> action
Export       -> action
Status: Open -> filter/state, not destination by default
```

## Mechanism comes last

Sidebar, top navigation, tabs, breadcrumbs, command menus, and contextual rails are implementation mechanisms.

Choose them after determining navigation role, hierarchy, frequency, and responsive constraints. Detailed UI composition belongs to the downstream UX specifier.
