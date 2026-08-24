# design-architecture skill

A reusable Agent Skill for establishing and enforcing project UI/UX architecture without generating a large styleguide.

## What it does

The skill supports five modes that are inferred from the task:

- INIT — establish a minimal project design contract
- AUDIT — detect architectural drift and UI-system violations
- EXTEND — add tokens/components/patterns without creating one-off architecture
- REVIEW — evaluate a screen/flow/implementation against the contract
- MIGRATE — incrementally consolidate an inconsistent existing UI

General design knowledge stays inside `references/`. Project-specific output stays small and extends the repository's existing canonical design/styling documentation when one exists. `.design/DESIGN_SYSTEM.md` and `.design/decisions.md` are fallbacks only when no suitable owner exists.

## Install

Copy the `design-architecture` directory into the skills directory used by your Agent Skills-compatible client, keeping `SKILL.md` at the root of the skill folder.

## Optional static scan

```bash
python scripts/design_smell_scan.py /path/to/project
```

The scanner is heuristic. It detects leads such as raw colors and inline styling; findings exit successfully by default because they are not proof of a violation. Use `--fail-on-findings` only when you intentionally want CI-style failure semantics.

## Suggested first prompt

```text
Establish the design architecture for this project. Inspect the existing UI stack, tokens, shared components, layouts, and representative screens first. Preserve coherent conventions, then create the smallest useful design contract and identify the highest-leverage fixes.
```

## Package status

Version 0.1.1. The included eval prompts are starting cases for testing triggering and behavior; they are not a full benchmark suite.
