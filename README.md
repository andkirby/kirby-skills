# Kirby's skills

## Skills

| Skill | Purpose |
|---|---|
| ux-designer-specifier | Write UX specs and wireframe schemas, supports ASCII and Wireloom wireframes (requires Wireloom skill below) |
| wireloom | Author Wireloom UI wireframe mockups |

You may add a project specific skill. Just tell your agent:
> Build a local "ux designer" skill which shall load `ux-designer-specifier` with project specific instructions.

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

- To add a skill: `ln -s $(pwd)/<name> ~/.agents/skills/<name>`
- To add all: `ln -s $(pwd)/*/ ~/.agents/skills/`
