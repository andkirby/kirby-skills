---
name: controlled-refactor
description: Assess, plan, execute, or review behavior-preserving refactors with explicit scope, architecture, documentation and performance checks, deterministic evidence, and authorization gates. Use for maintainability hotspots, complexity reduction, structural cleanup, scheduled refactor proposals, or isolated draft patches; do not use for feature work or behavior-changing redesigns.
---

# Controlled Refactor

Improve maintainability without trading away behavior, architecture, performance,
security, reliability, or operability. Treat metrics as discovery evidence, not as
the objective.

## Select the mode

- **Assess** (default): inspect and return `STOP`, `NEEDS_APPROVAL`, or `READY`.
  Do not mutate files.
- **Plan**: produce a bounded refactor contract. Do not mutate files.
- **Execute**: mutate only when the user explicitly requested implementation.
- **Review**: inspect an existing refactor, fix clear in-scope defects only when
  repair was requested, and rerun affected verification.

Read [references/assessment.md](references/assessment.md) for Assess or Plan.
Read [references/execution.md](references/execution.md) before Execute or a
repairing Review. For scheduled work or durable evidence, also read
[references/evidence-notes.md](references/evidence-notes.md).
Read [references/documentation-reconciliation.md](references/documentation-reconciliation.md)
in every mode. Documentation impact must be investigated before it can be
declared absent.

## Stewardship rules

1. Discover project instructions, owner documents, build and test entrypoints,
   runtime boundaries, and the actual target before proposing a solution.
2. State the concrete maintenance cost. A high score, large file, or disliked
   style alone is not permission to refactor.
3. Establish observable invariants and a green baseline. Refactors are
   GREEN-to-GREEN; missing proof is a risk to resolve, not a reason to guess.
4. Examine data shape, responsibilities, dependency direction, and call flow
   before extracting helpers. Prefer the smallest change that fixes the actual
   structural problem.
5. Evaluate only applicable quality dimensions and name the evidence. Never
   claim correctness, performance, security, or full preservation from a test
   exit code alone.
6. Preserve public behavior and compatibility unless the user explicitly
   authorizes a change. Do not weaken, delete, skip, or rewrite tests merely to
   accept the patch.
7. Keep mutation intent explicit: allowed creates, modifications, and deletions.
   Include untracked or otherwise unregistered files when comparing planned and
   actual changes.
8. Treat owner documentation as part of the maintained system. Identify what
   each normative document owns, classify documentation impact with evidence,
   and include required documentation edits in mutation intent. Never rewrite
   documentation merely to make questionable code appear intentional.
9. Never commit, merge, publish, deploy, install dependencies, or update an
   external system unless explicitly requested.

Project stewardship does not grant broad mutation authority. Record valuable
unrelated maintenance findings instead of silently expanding the patch.

## Decision contract

Before implementation, report:

```yaml
decision: STOP | NEEDS_APPROVAL | READY
target: <file, symbol, component, or subsystem>
problem_evidence: <why this is worth changing now>
invariants: <observable behavior and compatibility to preserve>
quality_risks: <only applicable dimensions>
baseline: <revision, checks, metrics, and known failures>
proposed_change: <smallest coherent transformation>
design_comparison: <local precedent and applicable established alternatives, or not applicable>
documentation:
  impact: UNKNOWN | NONE | UPDATE_REQUIRED | NEEDS_APPROVAL
  owners: <normative documents and the claims each owns>
  evidence: <searches and claim comparisons performed>
  planned_changes: <exact documentation paths and claims, or none>
  validation: <project-owned doc checks or explicit manual verification>
mutation_intent: <allowed create, modify, and delete paths>
verification: <exact available checks and required observations>
unknowns: <facts that prevent stronger claims>
```

`READY` requires executed baseline evidence for every critical invariant.
Planned post-change verification, unexecuted relevant suites, and unrelated
green checks do not satisfy the baseline; use `STOP` until the missing evidence
is obtained.

`READY` is forbidden while `documentation.impact` is `UNKNOWN`. Use
`UPDATE_REQUIRED` only when the normative owner and required correction are
clear and every affected path is authorized in `mutation_intent`. Use
`NEEDS_APPROVAL` when documentation conflicts expose an architectural or public
contract decision, ownership is ambiguous, or the required repair would expand
the authorized scope. `NONE` requires recorded discovery evidence; silence or
zero exact-name matches is not evidence.

Use `NEEDS_APPROVAL` before behavior-preserving work that crosses persisted data,
security or trust boundaries, concurrency, cross-component ownership, deployment
shape, or performance-sensitive behavior. If the proposed result requires a
public-contract or observable-behavior change, use `STOP` and reclassify the work
unless that separate scope was already explicitly authorized. Also use `STOP`
when the baseline is not trustworthy, the invariant is unknown, the proposed
scope is uncontrolled, or required authority is missing.

## Completion contract

An executed refactor is `PATCH_READY` only when:

- planned behavior and compatibility remain supported by evidence;
- relevant tests, static checks, build checks, and runtime probes pass as
  applicable;
- performance or resource behavior is measured when the change could affect it;
- metrics are compared at their real granularity across every changed artifact,
  with no hidden displacement into new files or helpers;
- actual changes match mutation intent and unrelated user changes are preserved;
- documentation impact was re-evaluated against the actual patch, required
  owner-document changes were validated, and no in-scope stale claim remains;
- self-review found no unresolved in-scope defect or owner-document drift.

Otherwise stop with the failing evidence, residual risk, and smallest next
decision. Do not broaden the refactor to make a gate pass.
