# Wireframe Best Practices

General principles for effective, readable wireframes regardless of tool or format.

## Clarity

### One state per frame

Reviewers can't parse overlapping states. One wireframe = one visible configuration. If two elements change independently, that's two frames.

### Real-ish content

"Lorem ipsum" hides whether the layout survives real data. Use realistic label lengths, item counts, and edge-case content:

```
✗  item "Item 1"
✗  item "Item 2"
✓  item "MDT-042 — Fix login redirect loop on expired sessions"
```

### Label everything

Every region and interactive element should be identifiable without the author present. Anonymous boxes are noise. A reviewer should never have to ask "what is this?"

## Spatial Truth

### Proportion matters more than pixels

If a sidebar is 1/5 of the screen, show it as 1/5. If a list holds 5 items, show 5 items. Exaggerated or compressed proportions create false expectations that survive into implementation.

### Show hierarchy through nesting and grouping

Parent-child spatial relationships should match the intended component tree. If two elements live in different containers, different panels, or different contexts — show that grouping explicitly.

### Consistent symbols

Same visual token = same interaction pattern. Pick conventions and stick to them across all wireframes for a project:

- Segmented controls always look the same
- Combo boxes always look the same
- Action rows always use the same primitive

## Completeness

### Cover the states that change layout

Show every state that restructures the surface. Common candidates:

| State | Why it matters |
|---|---|
| Default / loaded | Baseline layout |
| Empty | Does the grid collapse? Is there a placeholder? |
| Loading | Is there a skeleton or spinner? Does the layout shift? |
| Error | Does an error banner push content down? |
| Overflow | What happens with 50 items instead of 5? |

A hover color change or focus ring doesn't need its own frame. Only create a variant when the layout restructures.

### Show breakpoints that reorganize

Desktop → mobile is the obvious one. Also consider:

- Tablet squish (does something collapse or hide?)
- Wide-screen stretch (does the content reflow or max-width?)
- Sidebar collapsed (does the main area expand?)

Only when the layout actually changes. If everything just scales, one frame is enough.

### Show the edges

A list with 0 items. A card with a very long title. A form with all validation errors visible. These test whether the layout holds under real conditions.

## Restraint

### No visual design decisions

Wireframes answer "where does it go and what does it do?" — not "what color is it?" or "what font?" Color, type, shadow, border-radius, and animation belong in a design spec or high-fidelity mockup, not the wireframe.

### Annotate only what the diagram can't say

Token references, behavior notes, conditional visibility rules. If the structure makes it obvious, don't annotate it. Over-annotation trains reviewers to skip annotations entirely.

### Omit what doesn't change

If the header is identical across 5 variants, show it once and say "header unchanged." Repeating identical chrome trains reviewers to stop reading closely.

## Traceability

### Each frame links to a spec

A wireframe without a spec is decoration. A spec without a wireframe is abstract. They validate each other. Every wireframe file should reference its spec; every spec should reference its wireframes.

### Name variants by state, not by feature

```
✓  board-default.wireloom
✓  board-empty.wireloom
✓  board-mobile.wireloom

✗  board-v2.wireloom
✗  board-final.wireloom
✗  board-new.wireloom
```

The filename should tell you what's different without opening the file.

## Naming Patterns

| Convention | Example | When |
|---|---|---|
| `{surface}-{state}` | `settings-behavior-on` | Toggle/config state |
| `{surface}-{breakpoint}` | `app-header-mobile` | Responsive variant |
| `{surface}-{variant}` | `app-header-hamburger` | Distinct sub-surface |
| `{surface}-{empty\|loading\|error}` | `board-empty` | Data state |

## Review Checklist

Before considering a wireframe set complete:

- [ ] Every layout-changing state has its own frame
- [ ] Content is realistic, not placeholder
- [ ] Proportions reflect the intended layout
- [ ] Interactive elements use appropriate primitives (not text pretending to be controls)
- [ ] Identical chrome is not repeated across variants
- [ ] Each file links to its spec
- [ ] File names describe what's different
- [ ] Annotations explain decisions, not structure
