# ASCII Wireframe Reference (Legacy)

Existing mockups may use ASCII block diagrams. New wireframes should use Wireloom (`.wireloom` files). This reference is for **reading** legacy ASCII mockups, not creating new ones.

## Block Diagram Format

Fenced code blocks with `wireframe` language tag:

````
```wireframe
┌─────────────────────────────────┐
│ AppHeader                       │
│ [Logo] [NavSelector] [⋮]       │
├─────────────────────────────────┤
│ FilterBar                       │
│ [Filter ▾] [Sort ▾] [🔍]       │
└─────────────────────────────────┘
```
````

## State Variants

Labeled blocks with `state:` prefix:

````
```wireframe state:surface-name hover
┌──────────────────────┐
│ ID-042      ● Medium │  ← border highlight, shadow elevate
│ Title text           │
└──────────────────────┘
```
````

## Layout Rules

- 2-char minimum cell padding inside boxes
- Box-drawing characters: `─ ┐ ┘ ┌ └ │ ├ ┤ ┬ ┴ ┼`
- Label sections with component names
- Interactive elements in `[brackets]`
- Status dots as `●` with color name in annotation
- Icons as emoji or `[icon-name]`
- Width: ~50 chars mobile, ~80 chars desktop

## Annotation Table Format

Legacy mockups use markdown tables for tokens and classes:

| Element | Token / Color | Class / Pattern | Notes |
|---------|---------------|-----------------|-------|
| Card border | `--border` | `.card` | 1px solid on rest, 2px on hover |
| Status dot | `--primary` | `.status-dot` | Color per status |

## Migration

When updating a surface that has legacy ASCII mockups:

1. Extract each `wireframe` block into a separate `.wireloom` file
2. Use Wireloom primitives (`window`, `header`, `panel`, `list`, `segmented`, etc.)
3. Move annotation tables to the companion `.md` file or convert to Wireloom `annotation` primitives
4. Keep the companion `.md` for token/class tables and design notes
