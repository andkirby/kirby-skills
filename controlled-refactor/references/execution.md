# Execution, reconciliation, and verification

Use this reference only after mutation is authorized.

## Prepare the workspace

- Record the project root, revision or equivalent baseline, and initial
  version-control or workspace status, including untracked files when applicable.
- Preserve unrelated user changes. For unattended or scheduled mutation, use an
  isolated workspace pinned to the approved baseline; never mutate a shared
  working checkout.
- Resolve allowed paths explicitly. Do not use broad cleanup, formatting, or
  dependency updates to hide the refactor.
- Confirm that every planned owner-document edit is explicitly included in the
  allowed paths. Snapshot the affected claims before mutation.
- Run the approved baseline checks before changing production code.

If the environment cannot provide isolation, baseline identity, or reliable
verification proportional to the risk, stop.

## Implement a coherent slice

Make the smallest structural change that resolves the diagnosed problem.
Preserve public contracts and observable behavior. Characterization tests may be
added when they record confirmed behavior; existing tests must not be weakened,
skipped, deleted, or rewritten to bless a regression.

When a metric is used:

- record the tool, configuration, scope, and granularity;
- measure before and after for all changed artifacts;
- inspect new helpers and files so complexity is not merely displaced;
- do not optimize a score at the expense of cohesion, readability, performance,
  or compatibility.

For performance-sensitive paths, use an existing benchmark, profiler, runtime
probe, or representative measurement. Control material variables and record the
command and observation. If no credible measurement exists, report performance
as unknown rather than improved.

## Reconcile drift

After implementation, compare the patch against project-native owners:

- code versus behavior and public contracts;
- tests versus invariants and actual execution;
- architecture/data-flow docs versus current ownership and dependencies;
- configuration and operational docs versus live defaults and runtime behavior;
- planned creates/modifications/deletions versus the complete workspace change
  set, including untracked or otherwise unregistered files.

Re-run the documentation impact procedure from
[documentation-reconciliation.md](documentation-reconciliation.md) against the
actual diff, not merely the plan. Inventory changed paths, names, ownership,
dependencies, data flow, public contracts, configuration, and operational
behavior. Search for both stale identifiers and stale semantic claims, then read
matches in context. Do not bulk-replace documentation strings without verifying
the claim each occurrence makes.

Repair drift only when it is directly caused or exposed by this refactor, the
intended owner is clear, and the repair is within authorized scope. Do not update
documentation to rationalize questionable code. Record unrelated or
consequential drift as follow-up instead of starting a second project.

If an unexpected in-scope documentation repair is clear but its path was not
authorized, stop and request approval before editing it. If the mismatch reveals
that code and the normative architecture or public contract disagree, do not
choose a winner silently: report `NEEDS_APPROVAL` or `STOP` as required by the
decision contract.

## Self-review the patch

Review the complete diff as if it came from another engineer:

1. Does it solve the stated maintenance problem, or only move/rename it?
2. Are data shape, ownership, and dependencies simpler and more coherent?
3. Did any behavior, error, ordering, compatibility, or resource use change?
4. Are tests honest, executing, and sufficient for the affected invariants?
5. Are there unplanned files, generated churn, stale docs, dead code, or new
   abstraction without concrete payoff?
6. Could a smaller patch achieve the same result?

Fix clear in-scope defects, then rerun every affected check and refresh evidence.
Stop if a fix requires expanded authority, a new architectural decision, or the
same unresolved failure recurs after a reasoned repair attempt.

## Verify and report

Use project-owned commands. As applicable, verify:

- targeted behavior tests and the owning package or subsystem suite;
- static/type checks, lint, compilation/build, and unused/dependency checks;
- integration, runtime, migration, or deployment-contract probes;
- performance/resource evidence for affected hot paths;
- before/after maintainability evidence at the tool's actual granularity;
- project-owned documentation lint, link, diagram, snippet, or build checks for
  changed documentation; when none exist, re-read and report the exact claims
  manually verified;
- executed test count, failures, unexpected skips, and exit codes;
- final status and change set against the recorded baseline, including untracked
  or otherwise unregistered files.

`PATCH_READY` means the patch is ready for human review, not permission to commit,
merge, publish, or deploy. If verification is partial, say exactly what remains
unknown and why.
