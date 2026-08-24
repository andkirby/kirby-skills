# Accessibility Guardrails

Use this reference whenever UI is created, extended, audited, or reviewed. Accessibility is part of component architecture and interaction behavior, not a final visual QA pass.

Default to the project's explicit accessibility target. For web products with no stated target, use WCAG 2.2 AA as the baseline and check current W3C guidance when compliance accuracy matters.

## Keyboard

- Every interaction available to pointer users must have a keyboard-operable path unless the interaction fundamentally depends on free-form pointer input and an equivalent alternative is provided.
- Focus order must preserve meaning and operability.
- Do not create keyboard traps.
- Composite widgets should follow the appropriate platform/ARIA keyboard model rather than placing every internal element in the tab sequence.
- Shortcuts must not be the sole path to an action.

## Focus

- Interactive elements need a visible focus indicator.
- Focus styling must remain distinguishable in every supported theme and surface.
- Sticky headers, overlays, and containers must not obscure the focused element.
- Move focus intentionally after dialogs, destructive actions, route changes, inserted content, and other context changes when leaving it in place would be confusing.
- Restore focus to a logical trigger when transient UI closes.

## Semantics

- Prefer native HTML controls and landmarks when building for the web.
- Accessible name, role, value, state, and relationships must match the visible interaction.
- Visual labels should normally be programmatically associated with their controls.
- Do not use ARIA to recreate behavior that a native element already provides unless there is a clear reason.

## Contrast and non-color cues

- Meet the project's required contrast target for text, controls, and meaningful graphics.
- Do not encode status, validation, selection, or category by color alone.
- Disabled styling may be lower contrast where standards allow it, but disabled state still needs to be understandable in context.
- Verify focus indicators against the surfaces on which they appear.

## Target size and dense UI

WCAG 2.2 AA includes a 24 by 24 CSS pixel minimum target criterion with defined exceptions, including spacing and essential dense interactions.

For dense professional tools:

- do not blindly enlarge every visible icon if spacing or an equivalent control satisfies the interaction need
- provide comfortable hit areas even when glyphs are visually small
- do not sacrifice scan density without understanding the task
- ensure compact controls remain separable and operable

## Forms and errors

- Inputs need persistent understandable labels or equivalent accessible names; placeholders alone are not robust labels.
- Identify invalid fields programmatically and visually.
- Error text should say what is wrong and how to repair it when known.
- Preserve entered values after validation failures when safe.
- Required/optional state must be understandable without color alone.

## Motion

- Respect reduced-motion preferences for non-essential motion.
- Avoid movement that is required to read, aim, or maintain context when a static alternative works.
- Do not use animation as the only indicator of status change.

## Zoom, reflow, and text resilience

- UI should remain operable under browser zoom and text enlargement requirements applicable to the project.
- Do not make core actions unreachable when text grows.
- Avoid fixed-height text containers that clip translated or enlarged content.

## Review questions

1. Can the task be completed with keyboard alone?
2. Is focus always visible, logical, and unobscured?
3. Do semantics match the visual control and state?
4. Does meaning survive without color?
5. Are dense targets still operable and separable?
6. Are errors specific and recoverable?
7. Does the UI remain usable with reduced motion and enlarged content?

## Primary standard references

When current conformance details are needed, consult W3C WAI's WCAG 2.2 standard, Quick Reference, and Understanding documents rather than secondary summaries.
