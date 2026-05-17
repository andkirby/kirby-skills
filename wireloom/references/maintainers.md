# Wireloom Skill Maintainers

This document is for people maintaining the skill, not for agents using Wireloom in normal UI mockup tasks.

## Ownership Boundary

- Keep all skill-specific machinery inside `/Users/kirby/.agents/skills/wireloom`.
- Treat Wireloom repositories as read-only sources of truth unless the user explicitly asks to change that repo.
- Do not copy large chunks of upstream docs into `SKILL.md`. Keep `SKILL.md` small and put complete syntax in `references/grammar.md`.

## File Roles

- `SKILL.md`: trigger behavior, output contract, workflow, routing table, high-value examples, common errors.
- `references/grammar.md`: complete primitive, attribute, flag, placement, and value-set reference.
- `scripts/validate_skill_coverage.js`: parser-to-skill coverage check. Requires a Wireloom repository path as its only argument.
- `agents/openai.yaml`: UI metadata for skill lists and default prompt.

## Update Workflow

1. Point the validator at the current Wireloom repository:

   ```bash
   /Users/kirby/.agents/skills/wireloom/scripts/validate_skill_coverage.js /path/to/Wireloom
   ```

2. If the validator reports missing primitives, attributes, or flags, update `references/grammar.md` first.
3. Update `SKILL.md` only when the change affects agent behavior: triggering, routing, source-of-truth guidance, common mistakes, or examples.
4. Re-run the validator and the generic skill validator:

   ```bash
   /Users/kirby/.agents/skills/wireloom/scripts/validate_skill_coverage.js /path/to/Wireloom
   python3 /Users/kirby/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/kirby/.agents/skills/wireloom
   ```

## What The Validator Checks

- Required Wireloom repo files exist: `package.json`, `AGENTS.md`, `src/parser/parser.ts`, `examples`.
- Required skill files exist: `SKILL.md`, `agents/openai.yaml`, `references/grammar.md`, `references/maintainers.md`, `scripts/validate_skill_coverage.js`.
- Every source-level primitive in `PRIMITIVE_LIST_HUMAN` is mentioned in `SKILL.md` or `references/grammar.md`.
- Every parser attribute and flag in `ATTR_RULES` is mentioned in `SKILL.md` or `references/grammar.md`.
- Embedded `wireloom` blocks in the skill docs parse when the target repo has `dist/index.js`.

## When To Split Further

Do not split by default. Add another reference file only when one of these is true:

- A section becomes large enough that agents routinely need only that section.
- A feature family has a separate maintenance cadence.
- The validator or user testing shows agents miss important syntax because the current reference is hard to scan.

Good future splits, if needed:

- `references/mobile.md` for `navbar`, `tabbar`, `sheet`, `segmented`, `backbutton`.
- `references/annotations.md` if callout behavior grows.
- `references/widgets.md` for form controls, trees, menus, breadcrumbs, chips, avatars, status.

## Prompt-Engineering Rules

- Prefer routing guidance over exhaustive prose in `SKILL.md`.
- Keep exact grammar in `references/grammar.md`.
- Make every example parse as a full Wireloom source with a `window` root.
- Include new syntax in examples only when it teaches an agent decision, not just because it exists.
- Avoid telling agents to always read every reference; progressive disclosure matters.

## Drift Policy

Wireloom can add syntax faster than this skill is updated. When in doubt, trust the parser in the target repository over this skill. The maintainer response to drift is:

1. Run the validator.
2. Update `references/grammar.md`.
3. Add or adjust a small `SKILL.md` routing note only if the new syntax changes authoring behavior.
4. Re-run validation.
