# design-orchestrator

Thin router for the `design-pipeline` skill set.

It coordinates:

- `product-intent`
- `information-architect`
- `ux-designer-specifier`
- `design-architecture`

It does not replace those specialists. It selects the lowest responsible layer, checks readiness gates, and backtracks when a downstream problem originates upstream.
