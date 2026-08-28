# Documentation impact and reconciliation

Use this procedure in every mode. Its purpose is to keep normative project
knowledge true without turning every incidental mention into refactor scope.

## Build an owner map

Start from project instructions and documentation indexes. Identify only
documents that the project treats as authoritative for the affected area. For
each candidate, record:

- path;
- the claim or contract it owns;
- evidence that it is authoritative rather than historical, illustrative, or
  ticket-local context.

Likely owners include architecture and domain documents, ADRs, public API or
schema specifications, configuration references, runbooks, deployment guides,
and source-adjacent contracts. Names such as `README*`, `docs/ARCHITECTURE*`, or
`docs/architecture/` are discovery hints, not automatic authority.

When two apparent owners conflict, do not silently select the convenient one.
Record the conflict and classify the impact as `NEEDS_APPROVAL` unless project
precedence resolves it.

## Detect affected claims

Derive search terms from both the current target and the proposed or actual
change:

- old and new paths, modules, types, symbols, routes, commands, configuration
  keys, events, schemas, and public names;
- responsibilities, ownership boundaries, dependency direction, data flow,
  state transitions, trust boundaries, runtime topology, and operational steps;
- diagrams, examples, snippets, links, or generated references that encode the
  same claims.

Use project-appropriate search tools over the documented documentation scope.
Read matches in context and compare their claims with code, tests, configuration,
and observed runtime behavior as applicable. Also inspect the relevant owner
sections even when exact-name searches return no matches: documentation often
describes concepts without naming implementation files.

Historical tickets, changelogs, archived decisions, and evidence records usually
remain historical. Update them only when the project explicitly treats them as
living owners. Do not erase history to remove a stale-looking name.

## Classify impact

Use exactly one classification:

- `UNKNOWN`: discovery is missing, incomplete, or blocked. Overall decision must
  be `STOP`.
- `NONE`: named owners and searches were checked, and the refactor leaves every
  normative claim true. Record the evidence that supports this conclusion.
- `UPDATE_REQUIRED`: the refactor makes a normative claim stale, the intended
  owner and correction are unambiguous, and the exact paths can be included in
  mutation intent.
- `NEEDS_APPROVAL`: the mismatch exposes an architectural or public-contract
  decision, owner precedence is ambiguous, or repair requires broader scope or
  authority.

A pure internal move may be `NONE` when logical ownership, behavior, and
contracts remain accurately documented. A behavior-preserving refactor is
`UPDATE_REQUIRED` when it changes documented internal ownership, dependency
direction, data flow, module boundaries, or operationally relevant locations.
Public behavior or contract change is not documentation maintenance: stop and
reclassify the work unless that change is separately authorized.

## Authorize and plan edits

For `UPDATE_REQUIRED`, put every documentation path in `mutation_intent` before
editing production code. State the exact stale claim and its intended replacement
or deletion. Avoid broad “update docs as needed” authorization.

If required documentation impact is discovered only after mutation:

- edit it only when the path is already authorized and the correction is clear;
- otherwise stop, report the evidence, and obtain approval;
- never weaken or rewrite a normative document merely to legitimize an
  accidental implementation change.

Unrelated pre-existing drift is not part of the patch. Record it as a bounded
follow-up with evidence.

## Verify the result

After implementation, repeat detection against the actual complete diff. Check
for unplanned path, name, boundary, dependency, contract, configuration, and
runtime changes.

Run project-owned documentation checks when available, including lint, links,
diagram rendering, snippet tests, or documentation builds. These checks prove
syntax and reachability, not truth. Manually re-read each affected normative
claim against the final code, tests, configuration, or runtime evidence.

Report:

```yaml
documentation:
  impact: NONE | UPDATE_REQUIRED | NEEDS_APPROVAL
  owners:
    - path: <path>
      owns: <claim or contract>
  evidence:
    - <search scope/query and claim comparison>
  changed:
    - path: <path>
      claim: <what was corrected>
  validation:
    - <command and result, or exact manual comparison>
  residual_drift: <none or bounded unresolved items>
```

`PATCH_READY` is forbidden if the final impact is `UNKNOWN`, a required owner
document remains stale, a documentation change is unvalidated, or residual
in-scope drift remains.
