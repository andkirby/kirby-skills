# Conceptual Models

Information architecture should expose a coherent model of the product's world.

## Mental model vs conceptual model

- **Mental model** — how users expect the domain/system to work based on prior experience and domain knowledge.
- **Conceptual model** — the objects, relationships, labels, and operations the product exposes to help users understand how it works.

The goal is not perfect mirroring. The product model should be learnable and minimize unnecessary translation.

## Model user-visible concepts, not the database

A backend may contain tables/services that users should never need to understand.

Prefer concepts users can recognize:

```text
Project -> Document -> Review
```

over implementation structure such as:

```text
Tenant -> ArtifactRecord -> RevisionEntity -> ApprovalJob
```

unless those terms are genuinely part of the user's domain.

## Object test

A concept is likely a meaningful user-visible object when users can reasonably:

- identify one instance of it
- refer to it by name/identity
- open or inspect it
- perform recurring actions around it
- understand relationships between it and other objects

Not every filter, status, workflow step, or command is an object.

## Relationship checks

For each important relationship ask:

- containment: does A contain B?
- ownership: does B belong to A?
- association: are A and B related without containment?
- scope: can B exist across multiple A contexts?
- lifecycle: can B outlive or move between contexts?

Wrong ownership assumptions often create bad navigation later.

## Model-alignment smell

Watch for users needing to repeatedly translate:

```text
expected term -> product-specific synonym
expected object -> hidden implementation concept
expected relationship -> surprising containment
expected workflow -> unrelated destination hierarchy
```

Prefer familiar domain language unless there is a product reason to introduce a new concept.
