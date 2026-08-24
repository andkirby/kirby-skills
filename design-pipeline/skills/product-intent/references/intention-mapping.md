# Intention Mapping

Use intention mapping to connect user context to desired progress and product capabilities without prematurely designing screens.

## Default structure

```text
Actor / context
  -> intention
     -> desired outcome
        -> required capability
```

Example:

```text
Engineer reviewing changes
  -> understand what changed and whether it is safe
     -> make a confident review decision
        -> inspect change set
        -> compare versions
        -> comment on a specific change
        -> approve or request changes
```

## Useful table

| Actor/context | Trigger | Intention | Desired outcome | Required capabilities | Evidence/confidence |
|---|---|---|---|---|---|

Keep rows at the level that affects product behavior. Merge distinctions that do not change capabilities.

## Rules

- Phrase intentions as user progress, not UI interaction.
- Keep capabilities implementation-neutral.
- One intention may require several capabilities.
- One capability may support several intentions.
- Use traceability to challenge feature requests with no clear user value.
- Avoid forcing a perfect tree; real intention/capability relationships can be many-to-many.

## When not to expand the map

Stop when downstream IA can reliably determine product objects, destinations, contexts, and task coverage. More detail is waste if it does not change those decisions.
