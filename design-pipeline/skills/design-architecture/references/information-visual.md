# Information & Visual Guardrails

Use this reference for density, hierarchy, typography, comparison, and visual restraint. It synthesizes principles associated with Edward Tufte and Dieter Rams for software interfaces.

## Information before decoration

- Every persistent visual element should help identify, group, compare, navigate, act, or understand state.
- Remove decorative containers, borders, gradients, shadows, badges, and labels that do not improve comprehension or interaction.
- Do not equate minimalism with low information density. Professional tools may be visually quiet and information-dense at the same time.

## Hierarchy

Create hierarchy with the smallest effective combination of:

1. position
2. spacing
3. typography
4. alignment
5. contrast
6. enclosure
7. color

Do not use all hierarchy mechanisms at once when fewer suffice.

## Density

Density is task-dependent, not a universal aesthetic preference.

- Optimize for the amount of information users must compare or manipulate at once.
- Prefer compact repeated structures for scanning-heavy workflows.
- Preserve sufficient hit areas and readable line height even in dense modes.
- Avoid card grids for homogeneous structured records when rows/tables/lists support faster comparison.
- Avoid excessive whitespace that forces users to lose context through scrolling.
- If the project supports density modes, vary spacing and row height more readily than semantic hierarchy or control meaning.

## Comparison

When users need to compare values:

- align comparable data
- keep units and formats consistent
- use stable columns/order
- avoid hiding one item behind interaction while showing another
- show deltas/status near the thing they qualify
- use visual encoding consistently across the product

## Typography

Typography is an information system.

- Use a small set of semantic text roles rather than ad hoc sizes/weights.
- Prefer tabular numerals where columnar numeric comparison benefits.
- Use monospace for code, identifiers, paths, hashes, logs, or other technical strings when it improves parsing—not as generic decoration.
- Keep label, body, metadata, code, heading, and numeric roles consistent.
- Avoid weak low-contrast text for information that users need to operate the product.

## Color

- Use color primarily for action, state, emphasis, grouping, and data encoding.
- Do not make every category/status uniquely colorful when position/text can carry the distinction.
- Status color must be redundant with text, iconography, pattern, or structure where interpretation matters.
- Prefer semantic color tokens so light/dark themes preserve meaning rather than literal values.

## Surfaces and containers

Use containers when they express real grouping or layering.

Avoid:

- card-inside-card structures without semantic nesting
- borders around every region
- shadows on static elements merely to make them feel designed
- separate panels for content that belongs to one continuous task

## Long-session products

For tools used for hours:

- minimize visual noise and unnecessary motion
- keep focus/selection/status legible without overwhelming the content
- avoid high-saturation large surfaces unless the product purpose requires them
- preserve predictable alignment and component geometry
- make scanning states distinguishable without requiring intense visual attention

## Review questions

1. What information must be noticed first, second, and during scanning?
2. Can related items be compared without memory or navigation?
3. Is whitespace serving grouping/readability or merely reducing density?
4. Is typography semantic and repeatable?
5. Are color and decoration carrying information or just styling it?
6. Can any container or visual accent be removed without losing meaning?
