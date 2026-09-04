# Kirby's skills

## Standalone skills

- **commit** — Prepare focused conventional commits while preserving unrelated
  working-tree changes.
- **controlled-refactor** — Assess and execute behavior-preserving refactors
  with evidence, documentation reconciliation, and authorization gates.
- **documentation-onboarding** — Establish a minimal, durable documentation
  system with clear ownership, agent reachability, and incremental maintenance.
- **idea-intake** — Capture and challenge ideas before promoting them to
  committed work.
- **wireloom** — Author Wireloom UI wireframe mockups.

## Plugin packages

- **design-pipeline** — Route product intent, information architecture, UX
  specification, and design-system work through focused specialist skills.

After installing `design-pipeline`, you may add a project-specific skill. Tell
your agent:

> Build a local "ux designer" skill which shall load `ux-designer-specifier`
> with project specific instructions.

## Contributions

Feel free to suggest improvements via PR or issue.

## Conventions

- Each skill lives in its own directory with a `SKILL.md` frontmatter entrypoint.

## Installation

### Recommended

```shell
npx skills add https://github.com/andkirby/kirby-skills
```

### Manual. Symlinks

- To add a standalone skill:
  `ln -s "$(pwd)/<name>" ~/.agents/skills/<name>`
