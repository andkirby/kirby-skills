# Wireloom Grammar Reference

Use this file for exact Wireloom syntax. It is a compact parser-facing reference, not a design tutorial.

## Required Shape

- A source starts with exactly one `window` root: `window:` or `window "Title":`.
- Top-level `annotation` nodes may follow the `window` block as siblings.
- Indentation is 2 or 4 spaces, consistently. Tabs are invalid.
- Lines ending in `:` have indented children. Leaf lines must not have `:`.
- Positional strings come before attrs/flags. Example: `button "Save" icon="check" primary`.
- Universal attr: `id="..."` is accepted on every primitive.

## Complete Primitive Matrix

| Primitive | Positional | Children / placement | Attributes | Flags |
|---|---|---|---|---|
| `window` | optional title string | root only | `id` | - |
| `header` | - | direct child of `window`; general children | `id` | `large` |
| `footer` | - | direct child of `window`, or final child of `slot`; general children | `id` | - |
| `navbar` | - | direct child of `window`; `leading`, `center`, `trailing` only | `id` | - |
| `leading` | - | inside `navbar`; general children | `id` | - |
| `center` | - | inside `navbar`; general children | `id` | - |
| `trailing` | - | inside `navbar`; general children | `id` | - |
| `sheet` | - | direct child of `window`; general children; max one | `id`, `position`, `title` | - |
| `panel` | - | general children | `id` | - |
| `section` | title string | general children | `id`, `badge`, `accent` | - |
| `tabs` | - | `tab` only | `id` | - |
| `tab` | label string | inside `tabs` only | `id` | `active` |
| `tabbar` | - | direct child of `window`; `tabitem` only | `id` | - |
| `tabitem` | label string | inside `tabbar` only | `id`, `icon`, `badge` | `selected`, `disabled` |
| `row` | - | general children plus `spacer` | `id`, `align`, `justify` | - |
| `spacer` | - | inside `row` only | `id` | - |
| `col` | optional pixel width or `fill` | general children | `id` | - |
| `list` | - | `item` or `slot` only | `id` | - |
| `item` | text string | inside `list` only | `id` | `chevron` |
| `slot` | title string | inside `list` or general containers; general children; optional final `footer` | `id`, `state`, `accent` | `active`, `chevron` |
| `grid` | - | `cell` only | `id`, `cols`, `rows` | - |
| `cell` | optional label string | inside `grid` only; may contain general children | `id`, `row`, `col`, `state`, `accent` | - |
| `resourcebar` | - | `resource` only | `id` | - |
| `resource` | - | inside `resourcebar` only | `id`, `name`, `value`, `icon` | - |
| `stats` | - | `stat` only | `id` | - |
| `stat` | label string, value string | inside `stats` only | `id`, `icon`, `accent` | `bold`, `muted` |
| `text` | content string | leaf | `id`, `weight`, `size`, `accent` | `bold`, `italic`, `muted` |
| `button` | label string | leaf | `id`, `badge`, `icon`, `accent` | `primary`, `disabled` |
| `backbutton` | parent label string | leaf; legal anywhere `button` is legal | `id` | `disabled` |
| `input` | - | leaf | `id`, `placeholder`, `type` | `disabled` |
| `combo` | optional label string | leaf | `id`, `value`, `options` | `disabled` |
| `slider` | - | leaf | `id`, `range`, `value`, `label` | `disabled` |
| `kv` | label string, value string | leaf | `id`, `weight`, `size`, `icon`, `accent` | `bold`, `italic`, `muted` |
| `image` | - | leaf | `id`, `label`, `width`, `height` | - |
| `icon` | - | leaf | `id`, `name`, `accent` | - |
| `divider` | - | leaf | `id` | - |
| `progress` | - | leaf | `id`, `value`, `max`, `label`, `accent` | - |
| `chart` | - | leaf | `id`, `kind`, `label`, `width`, `height`, `accent` | - |
| `annotation` | body string | top-level after `window` only | `target`, `position` | - |
| `tree` | - | `node` only | `id` | - |
| `node` | label string | inside `tree`; recursive `node` children | `id`, `icon` | `collapsed`, `selected` |
| `checkbox` | label string | leaf | `id` | `checked`, `disabled`, `label-right` |
| `radio` | label string | leaf | `id`, `group` | `selected`, `disabled`, `label-right` |
| `toggle` | label string | leaf | `id` | `on`, `off`, `disabled`, `label-right` |
| `menubar` | - | `menu` only | `id` | - |
| `menu` | title string | inside `menubar` or standalone general child; `menuitem`, `separator`, nested `menu` | `id` | - |
| `menuitem` | label string | inside `menu` only | `id`, `shortcut` | `disabled` |
| `separator` | - | inside `menu` only | `id` | - |
| `chip` | label string | leaf | `id`, `icon`, `accent` | `closable`, `selected` |
| `avatar` | initials string | leaf | `id`, `size`, `accent` | - |
| `breadcrumb` | - | `crumb` only | `id` | - |
| `crumb` | label string | inside `breadcrumb` only | `id`, `icon` | - |
| `spinner` | optional label string | leaf | `id` | - |
| `status` | label string | leaf | `id`, `kind` | - |
| `segmented` | - | `segment` only; never direct child of `window` | `id` | - |
| `segment` | label string | inside `segmented` only | `id` | `selected`, `disabled` |

## Value Sets

- `accent`: `research`, `military`, `industry`, `wealth`, `approval`, `warning`, `danger`, `success`
- `state`: `locked`, `available`, `active`, `purchased`, `maxed`, `growing`, `ripe`, `withering`, `cashed`
- `align`: `left`, `center`, `right`
- `justify`: `start`, `between`, `around`, `end`
- `type`: `text`, `password`, `email`, `search`
- `weight`: `light`, `regular`, `semibold`, `bold`
- `size`: `small`, `regular`, `large`
- `kind` for `chart`: `bar`, `line`, `pie`
- `kind` for `status`: `success`, `info`, `warning`, `error`
- `position` for `sheet`: `bottom`, `center`
- `position` for `annotation`: `left`, `right`, `top`, `bottom`

## Required Attributes And Arguments

- `section`, `tab`, `tabitem`, `item`, `slot`, `stat`, `text`, `button`, `backbutton`, `kv`, `node`, `checkbox`, `radio`, `toggle`, `menu`, `menuitem`, `chip`, `avatar`, `crumb`, `status`, and `segment` require their positional strings.
- `grid` requires `cols=N rows=M`.
- `resource` requires `name="..." value="..."`.
- `slider` requires `range=N-M value=K`.
- `progress` requires `value=N max=M`.
- `status` requires `kind=success|info|warning|error`.
- `annotation` requires body string, `target="id"`, and `position=left|right|top|bottom`.

## Named Icons

Known icon names:

```text
credits research military industry influence
approval faith authority computation tech
policy ship planet leader gear
warning lock check star plus minus
```

Unknown icon names fall back to a boxed first-letter glyph.

## Placement Rules

- `window` cannot be nested.
- `navbar` and `header` are mutually exclusive.
- `tabbar` and `footer` are mutually exclusive.
- `sheet` must be a direct child of `window`; only one `sheet` is allowed.
- `leading`, `center`, and `trailing` may only appear inside `navbar`.
- `tabitem` may only appear inside `tabbar`.
- `tab` may only appear inside `tabs`.
- `item` may only appear inside `list`.
- `cell` may only appear inside `grid`.
- `resource` may only appear inside `resourcebar`.
- `stat` may only appear inside `stats`.
- `node` may only appear inside `tree`.
- `menuitem` and `separator` may only appear inside `menu`.
- `crumb` may only appear inside `breadcrumb`.
- `spacer` may only appear inside `row`.
- `segment` may only appear inside `segmented`.
- `segmented` may not be a direct child of `window`; put it inside `panel`, `section`, or `row`.
- `slot` may contain one nested `footer:` block, and that `footer:` must be last.
- `segmented` allows at most one `segment selected`.

## Common Forms

```wireloom
window "Annotated sign in":
  header:
    text "Welcome back" id="welcome"
  panel:
    input placeholder="Email" type=email id="email"
    input placeholder="Password" type=password id="password"
    button "Sign in" primary id="submit"

annotation "Greeting copy" target="welcome" position=top
annotation "Primary action.\nDisabled until valid." target="submit" position=right
```

```wireloom
window:
  navbar:
    leading:
      backbutton "Notes"
    center:
      text "Q2 Review" bold
    trailing:
      button "Share"
      button "Edit" primary
  panel:
    text "Revenue up 18% QoQ."
```
