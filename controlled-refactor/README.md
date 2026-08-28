# Controlled Refactor

`controlled-refactor` assesses and performs bounded, behavior-preserving
refactors. It treats maintainability metrics as leads and requires evidence that
behavior, architecture, documentation, performance, and other applicable
qualities were not traded away.

The agent contract is [SKILL.md](SKILL.md). This README explains the human
workflow; it does not replace the detailed references.

## Workflow

```text
target
  -> Assess: discover owners, prove the problem, lock behavior, run baseline
       -> STOP: evidence or scope is insufficient
       -> NEEDS_APPROVAL: a consequential decision requires a human
       -> READY: bounded plan, acceptance criteria, mutation intent, verification
  -> explicit Execute authorization
       -> coherent patch
       -> documentation reconciliation
       -> verification and self-review
       -> STOP | NEEDS_APPROVAL | PATCH_READY
  -> human review
  -> separate authorization for commit, merge, publish, or deploy
```

## Modes

- **Assess** decides whether refactoring is worthwhile and safe. It does not
  change production files.
- **Plan** produces a bounded execution contract. It does not change production
  files.
- **Execute** applies an explicitly authorized plan and touches only paths in
  mutation intent.
- **Review** audits an existing refactor. It repairs defects only when explicitly
  requested.

Example invocations:

```text
Use $controlled-refactor to assess <target>.
```

```text
Use $controlled-refactor to execute the approved READY plan. Do not commit.
```

```text
Use $controlled-refactor to review the current refactor and repair only clear
in-scope defects.
```

## Acceptance ownership

Public or product behavior remains owned by the project's canonical requirements,
contracts, or owner documentation. The refactor plan references those criteria
by stable ID and path instead of redefining them.

Refactor-specific criteria, including mutation scope, maintainability,
documentation reconciliation, and applicable performance limits, are owned by
the refactor plan. Execution results map every acceptance ID to `PASS`, `FAIL`,
or `UNKNOWN` with concrete evidence. Tests support criteria; they do not
automatically own them.

## Durable artifacts

Ordinary interactive Assess and Plan work is chat-only. Scheduled, repeated,
handed-off, or explicitly durable work uses one artifact owner. An explicit user
or scheduler path wins; otherwise use:

```text
.refactoring/runs/YYYYMMDDTHHMMSSZ-<target-slug>/
|-- plan.md        required before durable mutation
|-- result.md      terminal record for every durable run
`-- artifacts/     optional large evidence
```

A scheduled read-only assessment writes `result.md` but no fake execution plan.
For scheduled mutation, `plan.md` must exist before production files change and
must not be rewritten to match the result. `result.md` records actual changes,
acceptance results, verification, documentation reconciliation, self-review, and
residual risk. Artifact writes use a separate allowlist from production mutation
intent.

Tickets are opt-in. The agent works within a ticket only when explicitly asked,
and then does not duplicate the same artifacts under `.refactoring/`.

No artifact is committed automatically. Unattended mutation stops when the
selected artifact owner is ephemeral and retention is not guaranteed.

## Safety boundaries

- Refactors are GREEN-to-GREEN; missing critical baseline evidence means `STOP`.
- Behavior or public-contract changes require separate authorization and scope.
- Scheduled mutation requires an isolated workspace and pinned baseline.
- Existing tests cannot be weakened to accept the patch.
- Complexity must not be displaced into new helpers or files.
- Documentation impact is checked before and after implementation.
- `PATCH_READY` means ready for human review, not permission to commit or ship.

Detailed procedures:

- [Assessment and planning](references/assessment.md)
- [Execution and verification](references/execution.md)
- [Documentation reconciliation](references/documentation-reconciliation.md)
- [Scheduled evidence](references/evidence-notes.md)
