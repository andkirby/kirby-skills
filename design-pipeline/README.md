# Design Pipeline Skills

Lightweight design pipeline skills with explicit ownership boundaries.

```text
                 design-orchestrator
                  (routing + gates)
                         |
raw idea / requirements
  -> product-intent
  -> information-architect
  -> ux-designer-specifier
  -> implementation

cross-cutting: design-architecture
```

Included:

- `design-orchestrator` — routes work, checks stage gates, resumes and backtracks without making specialist decisions
- `product-intent` — intentions, actors, capabilities, evidence, MVP boundaries
- `information-architect` — conceptual model, IA, destination hierarchy, navigation, entry points, wayfinding
- `ux-designer-specifier` — surface specs, state tables, composition diagrams, Markdown mockups with embedded Wireloom
- `design-architecture` — design-system contract, token and component governance, reusable cross-screen decisions
- `INTEGRATION.md` — ownership and boundary notes for the full plugin

The orchestrator deliberately does not run every stage for every request. It selects the lowest responsible layer that can safely solve the task.

All specialist skills use conditional divergence and lightweight validation rather than mandatory Double Diamond / Design Thinking ceremonies.

## Dependencies

`ux-designer-specifier` writes wireframes with Wireloom and expects the separate `wireloom` skill to be installed alongside it. The other skills are self-contained.

## Install

This directory is an [Agent Plugins](https://agent-plugins.org) 1.1.0 package; the skills are discovered from `skills/`. Install it with any conformant client, e.g. from the [kirby-skills](https://github.com/andkirby/kirby-skills) repository.

## License

[MIT](LICENSE)
