# Mockup Format

Wireframes use Wireloom `.wireloom` files. Load the **wireloom** skill before writing any wireframe.

## Wireloom Files

Each surface variant gets its own `.wireloom` file:

```
docs/design/mockups/wireloom/
  {surface}-{variant}.wireloom
```

See the wireloom skill for grammar, primitives, and placement rules.

## Companion Notes

A `.md` file alongside holds design notes and token/class tables:

```md
# Surface Name — Wireframe Schema
Related spec: `specs/surface-name.md`

## Wireframes
See `wireloom/` for .wireloom files.

## Annotations
| Element | Token | Class | Notes |
|---------|-------|-------|-------|
```

## Rules

- Load the **wireloom** skill before writing wireframes
- One `.wireloom` file per visible state variant
- Show at minimum: default state, one interaction state, one breakpoint variant
- Use Wireloom `annotation` primitives for callouts
- Keep token/class tables in the companion `.md`
- Mobile-first unless the task explicitly targets wider layouts

## Legacy ASCII Mockups

For reading existing ASCII block diagrams, see `references/ascii-wireframes.md`.
