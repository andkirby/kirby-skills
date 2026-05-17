---
name: ux-designer-specifier
description: Write or review UX specs and wireframe schemas for frontend components and surfaces. Use when creating or updating design specs, Markdown mockups with embedded Wireloom, state tables, or composition diagrams. Produces structured specs and mockups that remove guesswork for implementation.
---

# UX Designer Specifier

Write UX specs and wireframe schemas for frontend surfaces in any project.

This skill produces **UX structure**: composition specs, state behavior tables, and Markdown mockups with embedded Wireloom when useful. It is **not** for runtime TSX, CSS implementation, or code generation — unless the user explicitly asks to carry a design into app code.

**Wireframes use the wireloom skill.** Load the `wireloom` skill before writing or editing Wireloom blocks. The wireloom skill provides the grammar reference, primitive routing, and placement rules.

## Discovery

Before writing anything, discover the project's design context. Read whichever of these exist:

| Artifact | Purpose |
|----------|---------|
| `AGENTS.md` / `CLAUDE.md` | Project boundaries, conventions |
| `THEME.md` or `DESIGN.md` | Design tokens, colors, typography |
| `STYLING.md` or equivalent | CSS architecture, class taxonomy, variant patterns |
| Existing specs in `docs/design/` or similar | Prior decisions and conventions |
| Component source in `src/components/` or similar | Current implemented behavior and structure |

If the user specifies a different design-doc location, prefer that.

## Default Output Paths

| Artifact | Default Path | Override |
|----------|-------------|----------|
| Spec | `docs/design/surfaces/{surface}.spec.md` | User-specified |
| Mockup | `docs/design/surfaces/{surface}.mockups.md` | User-specified |

The user can override these per-project. Ask if the path convention isn't obvious from existing files. If a project still uses legacy `docs/design/specs/` and `docs/design/mockups/` folders, follow existing convention unless the user asks to migrate.

## Canonical Model

- **Specs** — source of truth for UX composition and behavior
- **Markdown mockups** — primary review artifact; may include embedded Wireloom blocks plus notes and token/class tables
- **Standalone `.wireloom` files** — optional only when the project already uses them or the user requests them

Truth flow: specs define the UX contract → mockups illustrate it → the app implements it. If implementation drifts from approved specs and mockups, that's a bug.

When a spec and a mockup drift, fix the drift or call it out. Do not leave ambiguous UX contracts.

## Working Pattern

1. Identify the target surface (from the user's request or project surface map if one exists).
2. Run the spec boundary check (below) before writing or expanding a spec.
3. Read existing specs, neighboring specs, design tokens, styling conventions, and relevant component source.
4. Audit existing patterns (CSS classes, component variants, design tokens) for reuse before proposing new ones.
5. Write or update the spec first. Add or update the mockup alongside it.
6. **Load the `wireloom` skill** before writing any Wireloom block.
7. Keep mockups standalone — reviewable without running the app.
8. Leave implementation-ready guidance so frontend work requires zero guesswork.

## Review Mode

When asked to review existing specs or mockups, check for:

- **Spec/mockup drift** — conflicting labels, states, controls, breakpoints, or interaction rules.
- **Source drift** — mockups claiming implemented behavior that source does not show. Verify current UI in component source when the mockup describes existing behavior.
- **Broken annotation targets** — annotations must point to existing ids.
- **Visible explanation** — product-visible mockup text must be real UI copy or realistic content. Move behavior notes, rationale, and review comments into annotations or prose outside the wireframe.
- **Duplicated shells** — repeated app chrome, sidebars, headers, or preview panes should have one owning mockup/spec; related mockups should reference it and only repeat details when the shell changes.
- **Durability** — remove temporary implementation-session notes such as "header is one row" unless they express a durable UX contract.
- **Readability** — preserve visual hierarchy, alignment, realistic content, scannability, and clear signifiers.

## Spec Boundary Check

Specs are named after surfaces/components, not feature epics. Before writing, ask:

- Can this file be named after one surface/component? If not, split it.
- Does it need more than one root composition tree or headings like "Surface 1" / "Surface 2"? Split it.
- Could each part be implemented, reviewed, or shipped independently? Split it.
- Do phases target different components? Split by component, not by feature phase.
- Are shared rules the only overlap? Keep separate specs and link to a small shared-patterns note only if needed.

## Spec Format

Follow the template in `spec-format.md` (in this skill directory). Core qualities:

- One spec per component, composition, or focused flow
- Composition tree showing parent-child structure
- State table showing visibility and behavior per mode
- Concrete layout rules with spacing and breakpoints
- References to design tokens and class patterns discovered from the project

Not every spec needs every section. Cut sections that add no value.

## Mockup Format

Mockups are Markdown files by default. They may contain embedded `wireloom` fenced blocks. **Always load the `wireloom` skill before writing Wireloom** — it provides the grammar reference, primitive routing table, and placement rules. Do not write Wireloom from memory.

### File Layout

Each surface gets one spec file and one mockup file unless the project convention says otherwise:

```md
# Surface Name — Wireframe Schema
Related spec: `surface-name.spec.md`

## Default State

```wireloom
window "Surface — Default":
  panel:
    text "Real product copy"
```

## Annotations
| Element | Token | Class | Notes |
|---------|-------|-------|-------|
```

### Rules

- Follow the project's existing mockup convention. Do not migrate to standalone `.wireloom` files unless requested.
- Keep visible Wireloom text realistic. Do not put implementation rationale, temporary review notes, or behavioral explanations inside the UI.
- Use annotations or prose for dynamic logic that cannot be drawn clearly.
- Load the **wireloom** skill before writing Wireloom.
- Show at minimum: default state, one interaction state, one breakpoint variant
- Use Wireloom `annotation` primitives for callouts (requires `id` on target)
- Keep mobile-first unless the task explicitly targets wider layouts
- Each mockup references its spec file

### Shared Shells

When multiple mockups share a large shell (app header, sidebar, rail, preview pane):

- Put the full shell in one owning spec/mockup.
- In related mockups, use a compact placeholder such as "Documents navigation — see documents-view-navigation.md".
- Repeat shell detail only when that state changes the shell itself.
- Keep state-specific focus in the surface being specified.

### Wireloom Limits

Wireloom is structural, not pixel-perfect. Dense toolbars, exact control widths, and icon styling may not match the app. Prefer durable layout truth and realistic content over renderer workarounds.

### Legacy ASCII Mockups

For reading existing ASCII wireframes, see `references/ascii-wireframes.md`.

### Wireframe Best Practices

For general wireframe principles (clarity, spatial truth, completeness, restraint, traceability), see `references/best-practices.md`.

## Naming Conventions

| Artifact | Pattern | Examples |
|----------|---------|----------|
| Spec | `{surface}.spec.md` | `ticket-card.spec.md`, `board-layout.spec.md`, `nav-bar.spec.md` |
| Mockup | `{surface}.mockups.md` | Embedded Wireloom, annotations, token tables, spec link |

## Spec Rules

- One spec per component, composition, or focused flow
- Reuse the format in `spec-format.md` — do not invent parallel formats
- Reference existing design tokens by name (from whatever token system the project uses)
- Reference existing class patterns by name
- If a new pattern is needed, note it as "proposed" with rationale

## Handoff Boundary

This skill defines:

- What the UX should do
- How the surface composes
- What states and interactions exist
- Which artifacts communicate the design clearly

This skill does **not** own:

- Frontend runtime implementation
- Backend API design
- Build or bundling configuration

## Final Report

Always report:

- Which specs changed (created/updated)
- Which mockups changed (created/updated)
- Which existing tokens, classes, or patterns were reused
- Which new patterns are proposed (and why they couldn't reuse existing)
- Whether the result is spec-only, mockup-only, or both
- Any implementation questions still left open
