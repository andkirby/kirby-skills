# Scheduled runs and durable evidence

Read this reference when refactoring is scheduled, repeated, handed off, or must
leave an auditable project note.

## Scheduled-mode boundary

The safe default for scheduled work is read-only assessment. An unattended run
may create a draft patch only when all of these are predetermined:

- target-selection policy and one bounded target;
- isolated workspace and pinned baseline;
- allowed mutation paths and forbidden operations;
- applicable verification commands and stop conditions;
- artifact destination and reviewer handoff;
- no automatic commit, merge, publish, deploy, or external update.

Treat a tool's documented finding exit code separately from execution failure.
Do not let a scheduler interpret “hotspot found” as “job crashed” or vice versa.

## Note ownership and path

Use this precedence:

1. an existing project-native ticket, maintenance, engineering-log, or evidence
   location when it clearly owns the work;
2. a path explicitly supplied by the user or scheduler;
3. `.refactoring/runs/` at the project root as a fallback for scheduled evidence.

Do not create `.refactoring/` for an ordinary interactive assessment unless the
user requests a durable note. Before relying on the fallback, check whether it is
ignored or untracked and disclose that durability limitation. Do not add a
mutable index or second maintenance backlog unless the project explicitly adopts
one.

Suggested filename:

```text
.refactoring/runs/YYYY-MM-DD-<target-slug>.md
```

## Evidence note

Record conclusions and reproducible evidence, not hidden reasoning or full noisy
logs:

```yaml
status: STOP | NEEDS_APPROVAL | READY | PATCH_READY
target: <target>
baseline: <revision or content identity>
skill_identity: <source commit plus dirty state, or content digest>
mode: assess | plan | execute | review
```

Then include:

- problem evidence and why the target was selected;
- invariants, exclusions, and applicable quality risks;
- documentation owner map, impact classification, discovery queries, affected
  claims, changed documentation paths, and documentation validation;
- planned and actual creates/modifications/deletions;
- commands, exit codes, executed tests, metrics, benchmarks, and runtime evidence;
- self-review findings and repairs;
- reconciled drift, unresolved drift, unknowns, and required human decision.

Redact secrets, credentials, personal data, and environment-specific sensitive
values. Link to large logs or machine artifacts instead of copying them into the
note.
