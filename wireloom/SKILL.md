---
name: wireloom
description: Author valid Wireloom UI wireframe mockups and edit existing .wireloom or wireloom fenced blocks. Use when the user asks to mock up, sketch, draw, annotate, or wireframe a UI; add callouts/annotations; design mobile list/detail screens with navbar/tabbar/sheet/segmented controls; or translate a UI idea into Wireloom syntax. Skip for flowcharts, sequence/state/class/ER diagrams, data graphs, and real interactive apps.
---

# Wireloom Skill

Use Wireloom to produce low-fidelity UI wireframes as `wireloom` fenced code blocks. Wireloom is structural: it shows layout, controls, and relationships, not finished visual design.

## Output Contract

- For a request to draw, sketch, mock up, or wireframe a UI, emit one `wireloom` fenced code block by default.
- Do not use prose, ASCII art, Mermaid, HTML, or JSX unless the user explicitly asks for explanation or implementation.
- If the user asks to review, explain, or fix Wireloom syntax, answer normally and include corrected Wireloom only where useful.
- If the user wants a real working interface, write the app/component instead of Wireloom.

## Source Of Truth

- When working in the Wireloom repo, the canonical agent reference is `/Users/kirby/home/Wireloom/AGENTS.md`; examples live in `/Users/kirby/home/Wireloom/examples/`; parser truth lives in `/Users/kirby/home/Wireloom/src/parser/parser.ts`.
- Read the canonical docs/examples before using a feature that is not in this compact reference, or when exact parser compatibility matters.
- Expect drift: new primitives can land after this skill. Current known parser syntax includes `navbar` slots `leading:`, `center:`, and `trailing:`.

## Bundled Reference

- Read `references/grammar.md` when you need exact primitive, attribute, flag, placement, or annotation syntax.
- Read `references/wireloom-best-practices.md` for Wireloom-specific patterns: choosing primitives, container etiquette, annotations, file organization, and common parse errors.
- Run `scripts/validate_skill_coverage.js /path/to/Wireloom` after updating the reference. The script checks that the target repo has the expected Wireloom files and that this skill's docs mention every parser primitive, attribute, and flag.

## Workflow

1. Classify the UI shape: dialog, form, list, dashboard, mobile root, detail view, settings screen, file explorer, modal, etc.
2. Choose primitives from the routing table. Use specific widgets instead of faking them with text rows.
3. Write exactly one `window` root. Add top-level `annotation` siblings only when callouts are requested.
4. Self-check grammar: indentation, leaf nodes, required children, mutually exclusive chrome.

## Task To Primitive Routing

| User asks for | Prefer |
|---|---|
| Dialog, simple form, sign-in | `window`, `header`, `panel`, `input`, `button`, `footer` |
| Settings or preferences | `section`, `checkbox`, `radio`, `toggle`, `combo`, `slider` |
| List, cards, records | `list`, `item`, `slot`, `chevron`, slot `footer:` |
| Dashboard or metrics | `kv`, `stats`/`stat`, `resourcebar`/`resource`, `progress`, `chart` |
| Positive/negative values | `accent=success`, `accent=danger`, `accent=warning` on `text`/`kv`/`stat` |
| File browser or hierarchy | `tree`/`node`, `breadcrumb`/`crumb`, `menubar`/`menu`/`menuitem` |
| Mobile list root | `header large`, search `input`, `list`, `tabbar`/`tabitem` |
| Mobile detail/edit | `navbar` with `leading:`/`center:`/`trailing:`, `backbutton`, action `button`s |
| Modal, share sheet, confirm | `sheet position=bottom|center title="..."`, action `row justify=end` |
| Inline filter | `segmented` with `segment`, exactly one `selected` |
| Callouts or annotations | `id="..."` on targets plus top-level `annotation` lines |
| People, tags, states | `avatar`, `chip`, `status`, `spinner` |

## Core Syntax

- Start with exactly one `window:` or `window "Title":`.
- Use 2 or 4 spaces consistently. Never use tabs.
- A line ending with `:` has indented children. A line without `:` is a leaf.
- Strings use double quotes. Positional strings come before attributes/flags.
- Attributes use `key=value`; flags are bare words: `button "Save" primary disabled`.
- `id="..."` is universal and mainly used as an annotation target.

## Annotations

Use annotations only when the user asks for callouts, labels, or annotated/manual-style diagrams.

```wireloom
window "Sign in":
  header:
    text "Welcome back" id="welcome"
  panel:
    input placeholder="Email" type=email id="email"
    input placeholder="Password" type=password id="password"
    button "Sign in" primary id="submit"

annotation "Greeting at top of form" target="welcome" position=top
annotation "Verified email address" target="email" position=right
annotation "Primary action.\nDisabled until valid." target="submit" position=right
```

Annotation rules:
- Place `annotation` at indent 0 after the `window` block, not inside it.
- Each target must reference an `id="..."` inside the window.
- Required syntax: `annotation "Label" target="id" position=left|right|top|bottom`.
- Use `\n` inside the annotation string for multi-line labels.

## Layout Patterns

Use `spacer` or `row justify=between` for opposite-edge alignment:

```wireloom
window "Dialog":
  panel:
    row:
      button "Cancel"
      spacer
      button "Done" primary
```

Mobile detail with centered title:

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

Settings controls:

```wireloom
window "Settings":
  section "Appearance":
    radio "Light" group="theme" label-right
    radio "Dark" group="theme" selected label-right
    toggle "Use system accent" on
  section "Privacy":
    checkbox "Share anonymous usage data" label-right
```

## Common Errors To Avoid

| Avoid | Use |
|---|---|
| `kv "Label=Value"` | `kv "Label" "Value"` |
| `text "Heading":` | `text "Heading"` |
| `tab` outside `tabs` | `tabs:` then `tab "..."` |
| `item` outside `list` | `list:` then `item "..."` |
| `item` inside `menu` | `menuitem "..."` |
| `navbar` and `header` in one window | Pick one top chrome primitive |
| `tabbar` and `footer` in one window | Pick one bottom chrome primitive |
| `sheet` inside `panel` | Put `sheet` directly under `window` |
| Multiple `segment selected` | Pick one selected segment |
| `segmented` directly under `window` | Put it inside `panel`, `section`, or `row` |
