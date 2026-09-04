# Minimal Document System

Use this reference when choosing initial owner documents, splitting an existing
document, or resolving competing sources of truth.

## Ownership model

### `README.md`

- **Owns:** human orientation, purpose summary, maturity, prerequisites, and the
  shortest verified setup.
- **Does not own:** detailed architecture, exhaustive commands, or agent-only
  policy.

### `AGENTS.md` or host equivalent

- **Owns:** agent operating rules, validation expectations, instruction
  routing, and maintenance triggers.
- **Does not own:** the full product specification or duplicated subsystem
  architecture.

### Product or mission owner

- **Owns:** users, problems, product promises, scope, non-goals, and domain
  language.
- **Does not own:** claims about unverified implementation.

### Architecture entrypoint

- **Owns:** the navigable current-system map, boundaries, data authorities,
  critical flows, invariants, and subsystem links.
- **Does not own:** the feature backlog, speculative target state, or a file
  inventory.

### Subsystem owner

- **Owns:** the detailed contract for one stable component or boundary.
- **Does not own:** unrelated system-wide rules.

### Decision record

- **Owns:** context, considered options, an accepted consequential decision,
  and its consequences.
- **Does not own:** the complete living behavior contract.

### Issue, ticket, or proposal

- **Owns:** a task-local target, open questions, acceptance, and delivery
  history.
- **Does not own:** permanent current-state truth after the work is reconciled.

### Runbook

- **Owns:** a verified operational procedure, observation channels, recovery,
  and safety boundaries.
- **Does not own:** product intent or architectural rationale already owned
  elsewhere.

Use project-native names when equivalent owners already exist. A new familiar
filename is worse than extending a discoverable established owner.

## Authority by question

- **What should the product mean?** User-confirmed product documents and
  accepted decisions.
- **What currently executes?** Code, configuration, tests, and runtime evidence.
- **Where should agents start?** The active project-instruction entrypoint.
- **Why was a consequential choice made?** The accepted decision record.
- **What should this task change?** The issue, ticket, or approved plan.
- **How is the verified system operated?** The relevant runbook.

When authorities disagree, report the exact conflict. Do not rewrite intent to
match accidental implementation, and do not describe planned behavior as live.

## Stage-appropriate growth

### Absent

Start with the smallest useful front doors. Normally improve or create no more
than `README.md`, the active agent-instruction file, and one compact architecture
or project-context owner.

### Emerging

Add an owner only after real work exposes a repeated question, consequential
invariant, distinct subsystem contract, or operational procedure. Keep an
ownership map in the existing instruction or architecture entrypoint while it
remains small.

### Fragmented

Repair links and responsibilities before writing more content. Select one owner
for each overlapping subject, replace duplicate guidance with links, and mark
stale or historical material explicitly.

### Established

Optimize maintenance rather than volume: validate links and commands, reconcile
docs during behavior changes, retire obsolete owners, and periodically test
fresh-session discoverability.

## When to split a document

Split only when at least one is true:

- different maintainers or change triggers own distinct sections;
- agents routinely need one section without loading the rest;
- one subject has become a stable contract used by several consumers;
- the current page can no longer serve as a concise navigation entrypoint.

After splitting, leave a link at the old discovery point and state the new
responsibility boundary. Do not leave two normative copies.

## When to add common later artifacts

- Add a product or mission owner when purpose, users, promises, or non-goals no
  longer fit clearly in the README.
- Add decision records when a consequential accepted choice needs durable
  rationale; do not record every implementation preference.
- Add a scoped `AGENTS.md` only when a subtree has materially different tools,
  safety constraints, or validation rules. State precedence and link it from a
  reachable parent when the host does not discover it automatically.
- Add a runbook after an operational workflow has been executed and observed.
  A proposed command sequence is not yet a verified runbook.
- Add a documentation index when navigation and ownership no longer fit
  comfortably in the current front doors.

## Quality checks

A useful owner document is:

- **reachable** from an active entrypoint;
- **bounded** by an explicit responsibility;
- **evidenced** at the level appropriate to its claims;
- **current-state honest** about unknown and proposed material;
- **maintainable** through named change triggers;
- **small enough** that the intended reader can find the decision quickly.
