# Scheduled runs and durable evidence

Read this reference when refactoring is scheduled, repeated, handed off, or must
leave an auditable project artifact.

## Persistence boundary

Ordinary interactive Assess and Plan runs are chat-only by default. Do not create
project files merely because a candidate was inspected.

When durable artifacts are required, use exactly one owner:

1. a path explicitly supplied by the user or scheduler;
2. otherwise `.refactoring/runs/` at the project root.

Do not infer ticket ownership from the presence of a ticket system. Create or
modify ticket-owned artifacts only when the user or scheduler explicitly asks to
work within that ticket. When a ticket or another explicit path is selected, do
not mirror the same plan and result into `.refactoring/`.

Do not create a mutable global index or a second maintenance backlog.

## Run layout

Use a unique, sortable run directory:

```text
.refactoring/runs/YYYYMMDDTHHMMSSZ-<target-slug>/
|-- plan.md        required before durable mutation
|-- result.md      terminal record for every durable run
`-- artifacts/     optional large logs, diffs, profiles, or reports
```

Never overwrite an earlier run. Do not create `artifacts/` when there are no
large artifacts to retain.

Before relying on `.refactoring/`, check whether it is ignored, untracked, or
located inside a disposable workspace. Do not edit ignore rules or commit
artifacts automatically. A production-read-only assessment may disclose limited
retention and continue. Unattended mutation must `STOP` when neither the
scheduler nor the workspace guarantees that `plan.md` and `result.md` will
survive for review.

## Scheduled-mode boundary

The safe default for scheduled work is production-read-only assessment. An
unattended run may create a draft patch only when all of these are predetermined:

- target-selection policy and one bounded target;
- isolated workspace and pinned baseline;
- allowed mutation paths and forbidden operations;
- applicable verification commands and stop conditions;
- durable artifact owner and reviewer handoff;
- no automatic commit, merge, publish, deploy, ticket mutation, or external
  update.

Treat a tool's documented finding exit code separately from execution failure.
Do not let a scheduler interpret “hotspot found” as “job crashed” or vice versa.

## Plan contract

For scheduled mutation, write `plan.md` before changing production files. Once
authorized, treat it as immutable. Re-planning creates a new run directory that
identifies the superseded plan; do not rewrite the contract being executed.

Record:

```yaml
status: READY
target: <target>
baseline: <revision or content identity>
skill_identity: <source commit plus dirty state, or content digest>
mode: execute
```

Then include:

- problem evidence, target, exclusions, and quality risks;
- inherited behavior criteria with stable IDs and canonical-owner references;
- refactor-specific acceptance criteria with stable IDs;
- proposed design and applicable design comparison;
- documentation owner map and impact classification;
- exact planned creates, modifications, and deletions;
- exact allowed artifact writes and retention mechanism;
- verification commands, required observations, and stop conditions;
- authorization and reviewer handoff supplied by the environment.

Tests are evidence for acceptance criteria, not automatically their owner. If no
canonical behavior document exists, the plan may own confirmed preservation
invariants for this refactor only. Unknown intended behavior requires `STOP` or
`NEEDS_APPROVAL`.

## Result contract

Write `result.md` for every durable Assess, Plan, Execute, or Review run. For an
attempted execution, write it even when the run stops or fails. Never modify
`plan.md` to match what happened.

Record:

```yaml
status: STOP | NEEDS_APPROVAL | READY | PATCH_READY
target: <target>
baseline: <revision or content identity>
plan_identity: <plan content digest, or not applicable>
skill_identity: <source commit plus dirty state, or content digest>
mode: assess | plan | execute | review
```

For Assess or Plan, include the complete decision contract, executed baseline
evidence, unknowns, and required human decision.

For Execute or Review, include:

- actual creates, modifications, and deletions versus mutation intent;
- actual artifact writes versus their separate allowlist;
- one `PASS`, `FAIL`, or `UNKNOWN` result for every acceptance ID;
- commands, exit codes, executed tests, skips, metrics, benchmarks, and runtime
  observations used as evidence;
- documentation changes and validation;
- self-review findings and repairs;
- residual drift, unknowns, and the smallest required human decision.

Redact secrets, credentials, personal data, and environment-specific sensitive
values. Link to large artifacts instead of copying noisy logs into `result.md`.
