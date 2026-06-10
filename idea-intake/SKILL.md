---
name: idea-intake
description: Capture, triage, and resolve product or engineering ideas before they become committed work. Use when the user says "I have an idea", "what if we...", "could we...", or wants to investigate, defer, reject, or review existing ideas.
default-ideas-path: docs/ideas
---

# Idea Intake

Evaluates ideas against the project's own documents. Captures what's worth
keeping, pushes back on what doesn't fit, and resolves ideas so they don't
languish.

**When to use:** User mentions an idea, asks "what if", wants to brainstorm,
evaluate, review, defer, or reject a possibility.

**When NOT to use:** The idea is already confirmed and scoped — create an MDT
ticket instead. The idea is a durable architecture decision — write an ADR.

## Directory

```
{ideasPath}/
  README.md              ← Index with status summary
  IDEA-001-<slug>.md     ← Individual idea files
  .next-idea             ← Counter file (auto-created)
```

## Lifecycle

```
Capture → Triage → Resolved
                      ├── promoted (→ MDT ticket or ADR)
                      ├── deferred (valid, not now)
                      └── rejected (doesn't fit or not worth it)
```

## Idea File Format

```markdown
---
id: IDEA-NNN
status: triage
date: YYYY-MM-DD
resolution-date:
promoted-to:
---

# <title>

## Idea
1–3 sentences in the user's own words.

## Investigation
(Filled during triage: scope, conflicts, dependencies, effort guess)

## Decision
(promoted / deferred / rejected — one line with rationale)

## References
(Links to relevant SOT docs, specs, existing tickets)
```

## Project Literacy

Read enough to form an opinion, but don't deep-dive. This is intake, not
audit. The goal is a quick, informed take — not a full investigation.

**Always read** (if they exist):
- Mission/product doc (`docs/MISSION.md`, `DESIGN.md`, or equivalent)
- Decision ledger (`docs/DECISIONS.md`)
- Existing ideas (`{ideasPath}/` — avoid re-proposing what's already resolved)
- Active ticket titles (`.tickets/` — scan filenames only)

**Skim when relevant** (read headings/structure, not full content):
- Architecture doc — if the idea touches structure or data flow
- Data model — if the idea touches persistence or domain
- UX spec titles — if the idea changes visible behavior

**Do not deep-read** specs, mockups, interaction atlases, or implementation
files. If an idea needs that level of evaluation, it needs a specialist skill,
not the intake.

If you can't find the mission doc, say so. Do not evaluate blindly.

## Challenge Frame

Evaluate the idea against these challenges. Form an opinion, state it briefly.
Don't write an essay — a sentence or two per applicable challenge is enough.

**Fit**: Does this belong in this project? Does the mission doc describe this
problem or this kind of user? If the idea solves a problem the project doesn't
claim to solve, say so.

**Contradiction**: Does any existing decision or active ticket say the opposite?
If yes, name it briefly.

**Duplication**: Does a mechanism for this already exist? Is there an active
ticket or resolved idea covering the same ground? If yes, point to it.

**Prematurity**: Is this solving a hypothetical problem? Optimizing something
that isn't a bottleneck? Designing for a scale that doesn't exist? Say so.

**Scope**: Does this fit the current phase? Or is it jumping ahead?

**Dependency**: What must exist first? If the dependencies are themselves
deferred ideas, the idea is speculative.

**Cost**: Quick effort guess (XS/S/M/L). Is it worth the value?

Not every challenge applies to every idea. Skip the ones that don't.

## Triage Output

Keep it short. A few sentences of assessment, the challenges that apply, and a
recommendation. This is a quick take, not a report.

1. **Assessment**: 2–3 sentences. Your opinion, referencing what you read.
2. **Challenges**: Only the ones that apply, one sentence each.
3. **Recommendation**: One of:
   - **Promote** — fits, worth committing to. State ticket type.
   - **Defer** — valid, wrong time. State what needs to change.
   - **Reject** — doesn't fit or not worth it. State why.
   - **Investigate more** — can't tell yet. State what's unknown.
   - **Route to specialist** — the idea is plausible but needs UX, architecture,
     or design evaluation before you can recommend. State which specialist and
     what question they should answer.

Be direct. Call scope creep scope creep. Call premature premature. But stay
brief — the user came for a quick opinion, not a dissertation.

## Review Protocol

When the user asks to review ideas, be concise. One line per idea unless
something changed.

**For each deferred idea**: Has anything changed since deferral? Did a
dependency ship? Did the mission evolve? If nothing changed, say so — don't
re-open without reason.

**For triage/investigating ideas**: What's blocking resolution?

**For the whole set**: Are there clusters? Shared dependencies? A theme
suggesting the project should reconsider priorities?

End with: close any? promote any? let sit?

Do not re-read all project docs for a review. You already know the project.
Only re-read if something specific changed since the last review.

## Workflow

### Capture

1. Read project docs per "Project Literacy" above.
2. Determine next idea number (read `.next-idea` or scan existing files).
3. Create `{ideasPath}/IDEA-NNN-<slug>.md` with `status: triage`.
4. Increment `.next-idea`.
5. Proceed immediately to triage.

### Resolve

On user decision:
- Set `status` to `promoted`, `deferred`, or `rejected`.
- Set `resolution-date`.
- If promoted, set `promoted-to` to the MDT key or ADR key.
- Fill Decision and Investigation sections.
- Update `{ideasPath}/README.md` index.

## README.md Format

```markdown
# Ideas — <Project>

## Active

| ID | Title | Status | Promoted To |
|----|-------|--------|-------------|

## Resolved

| ID | Title | Status | Resolution |
|----|-------|--------|-----------|

## Review cadence
Deferred ideas reviewed when starting a new milestone, or on request.
```

## Rules

- One idea per file.
- Ideas are cheap. Create them freely — the triage gate prevents premature commitment.
- Never implement directly from an idea. Promote to a ticket first.
- A rejected idea with good rationale prevents re-investigation. Keep it.
- The Investigation section is where learning lives. Make it count.
- Update the README index after every create or status change.
- Slug should be short and hyphenated (3–5 words max).
- If you haven't read the project docs, you haven't triaged. Say so.
