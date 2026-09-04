# Agent Documentation Maintenance Contract

Read this reference when Bootstrap or Reconcile work will add ongoing
documentation stewardship to `AGENTS.md` or another host's active project
instructions.

## Integration rules

1. Inspect the active instruction chain, scope, precedence, and size limits.
2. Reuse an existing documentation-maintenance section when present. Repair it
   instead of adding a second policy.
3. Adapt terminology and paths to the repository. Do not introduce documents
   the project does not have.
4. Keep the always-loaded contract compact. Link detailed documentation
   lifecycle guidance rather than embedding it in the instruction entrypoint.
5. Confirm the resulting instruction file is tracked and not ignored. Verify it
   in a fresh session when that is safely available; otherwise hand off the
   exact check and mark it unexecuted.

## Adaptable contract

Use the following as a starting point, not mandatory wording:

```markdown
## Documentation stewardship

Before non-trivial work, read the canonical documents relevant to the affected
area and verify consequential claims against current code, configuration,
tests, or runtime evidence.

During implementation:

- Treat code, configuration, tests, and runtime observations as evidence of
  current implementation, not as authority for product intent. Use the
  confirmed product owner or request a decision when they conflict.
- Update an existing owner when the authorized change would otherwise make it
  inaccurate.
- Propose a new canonical document only when the knowledge affects future
  decisions or safe operation, is likely to recur or be costly to rediscover,
  and has no suitable existing owner.
- Keep proposed behavior in a ticket, proposal, or decision draft until it is
  accepted. Do not present it as current architecture.
- Prefer one canonical owner plus links over duplicated guidance.
- Preserve or add the owner's responsibility boundary and maintenance triggers
  when its role would otherwise be ambiguous.

In the final report, mention documentation impact when an owner was updated, a
new owner is justified, or an evidence/intent conflict needs a decision. Do not
add documentation-impact boilerplate to trivial tasks.
```

## Optional routing block

Add a small map only for documents that actually exist:

```markdown
### Documentation routing

| Question | Read first |
| --- | --- |
| What is this project and how do I start it? | `README.md` |
| How is the system divided and where does data live? | `docs/ARCHITECTURE.md` |
| Which rules apply to agent work? | `AGENTS.md` and scoped instructions |
| Why was a consequential choice accepted? | The project decision records |
| What is proposed for the current change? | The active issue, ticket, or plan |
```

Remove rows whose owners do not exist. Add project-specific rows only when they
prevent a real discovery failure.

## Action boundary

The maintenance contract should produce this behavior:

- Updating a stale existing owner is part of an authorized change when the
  changed behavior makes that owner false.
- Creating a new canonical owner requires explicit documentation scope or user
  approval.
- A conflict between implementation and accepted intent is reported for a
  decision; documentation is not changed merely to legitimize the code.
- Valuable unrelated findings are reported without expanding the current
  mutation scope.

## Fresh-session acceptance

Instruction chains may be assembled when a session starts, so same-session
recall after editing the instruction file is not persistence evidence. When a
safe clean-session mechanism is available, ask the fresh agent to summarize:

1. which document owns current architecture;
2. when existing documentation must be updated;
3. when a new document may be proposed;
4. how it distinguishes current, confirmed, proposed, and unknown information.

Pass only when the answers come from active project guidance and point to the
intended canonical owners. If a clean-session check is unavailable or outside
scope, report the static reachability evidence, provide the exact check to run,
and leave runtime persistence explicitly unverified.
