# Existing app fixture

The product is an engineering workspace.

Established product intent includes:
- review proposed document/code changes before approval
- resume assigned work
- find work inside a project

Current implementation grew inconsistently:
- `/projects/:id/reviews`
- `/projects/:id/documents/:docId/reviews`
- `/my-work/reviews`

The sidebar includes Projects and My Work.
Some document screens also show a Reviews tab.
There is no canonical IA document.

The fixture intentionally does not decide whether Review is primarily a project-owned object, document-owned object, cross-cutting work queue, or multiple views of one concept.
