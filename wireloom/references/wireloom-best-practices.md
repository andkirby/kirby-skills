# Wireloom Best Practices

Wireloom-specific patterns for readable, maintainable wireframes.

## Structural Choices

### Pick the right chrome primitive

| UI shape | Use | Avoid |
|---|---|---|
| Desktop top bar | `header` | `navbar` (mobile-only) |
| Mobile screen with back nav | `navbar` with `leading`/`center`/`trailing` | `header` + manual back button |
| Modal / share sheet | `sheet position=bottom title="..."` | `panel` pretending to float |
| Tabbed settings | `tabs` > `tab` | Manual `segmented` faking tabs |

`header` and `navbar` are mutually exclusive. `tabbar` and `footer` are mutually exclusive. The parser enforces this — don't fight it.

### Use specific primitives, not generic text

| Avoid | Use |
|---|---|
| `text "[Board] [List] [Docs]"` | `segmented` > `segment` |
| `text "● Board ○ List"` | `segmented` with one `selected` |
| `text "[Sort ▾]"` | `combo value="Sort by Key"` |
| `text "[Toggle ON]"` | `toggle "" on` |
| `text "━━━━━━━"` | `divider` |
| `text "+ Add Item"` inside panel | `list` > `item "+ Add Item"` |

Specific primitives render correctly and convey interaction intent.

### One state per file

Each `.wireloom` file shows exactly one visible configuration. If the only difference is which tab is `selected`, that's a separate file:

```
settings-appearance-light.wireloom    ← segment "Light" selected
settings-appearance-dark.wireloom     ← segment "Dark" selected
```

Name files `{surface}-{variant}.wireloom` where the variant describes what's different.

## Annotations

### Annotate decisions, not structure

Good annotations explain *why* or point out non-obvious behavior:

```wireloom
window "Sort":
  panel:
    combo value="Sort by Key" id="sort-slot"

annotation "Sort controls appear here on mobile only" target="sort-slot" position=right
```

Bad annotations describe what the diagram already shows:

```wireloom
window "Sort":
  panel:
    divider id="sort-slot"

annotation "This is a divider" target="sort-slot" position=right
```

### Use `id` sparingly

Only add `id="..."` to elements that need annotation targets. Every `id` is maintenance burden.

### Multi-line annotations

Use `\n` for line breaks in annotation text. Keep annotation strings short — if it needs a paragraph, it belongs in the companion `.md` notes.

## Container Etiquette

### `menu` vs `list` for action rows

- `menu` > `menuitem` — dropdown menus, context menus, hamburger action lists. Menu requires a label string (use `""` for unlabelled).
- `list` > `item` — selectable rows, data items, navigation items.

Both are valid for hamburger menu items. `list` > `item` is closer to most real UI frameworks.

### `section` for grouping

Use `section "Title":` to create labeled groups inside forms and settings panels. Don't use bare `panel` nesting to fake sections.

### `row` / `col` + `spacer` for layout

Opposite-edge alignment:

```wireloom
window:
  row:
    button "Cancel"
    spacer
    button "Save" primary
```

Centered content:

```wireloom
window:
  row align=center:
    button "OK" primary
```

Vertical content pinning in a column:

```wireloom
window:
  row:
    col:
      text "Top"
      spacer
      text "Bottom"
    col:
      text "L1"
      text "L2"
      text "L3"
      text "L4"
```


### Quote string-valued attributes

String-valued attributes must be quoted. Numeric and enum/identifier values stay unquoted.

```
✗  icon name=star
✓  icon name="star"

✓  input placeholder="Email" type=email
✓  slider range=0-100 value=42
```

## File Organization

```
docs/design/mockups/
  app-header.md                          ← companion notes (token tables, spec link)
  wireloom/
    app-header-desktop-board.wireloom    ← desktop, Board active
    app-header-desktop-docs.wireloom     ← desktop, Docs active
    app-header-mobile.wireloom           ← mobile
    app-header-hamburger.wireloom        ← hamburger dropdown
```

- One `.wireloom` file per state variant
- One companion `.md` per surface for token/class tables
- Keep the directory flat — don't nest per-surface subdirectories

## Validation

Always validate before committing:

```bash
~/home/ux-breakdown/bin/wireloom-to-html <file> --out /tmp/test.html
```

Common parse errors and fixes:

| Error | Cause | Fix |
|---|---|---|
| `expects a string value, got identifier` | Unquoted attribute value | Add quotes: `name="star"` |
| `requires a label string` | Missing positional string | Add `""` or a real label |
| `may only appear inside` | Wrong parent | Move to correct container |
| `accepts only ... (got ...)` | Invalid child for container | Use the right primitive |
