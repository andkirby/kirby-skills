# Assessment and planning

Use this reference to select a worthwhile target and design the smallest safe
refactor.

## Discover project truth

Read the nearest applicable project and directory instructions first. Discover,
rather than assume, the canonical documentation and verification commands.
Common candidates include:

- root instructions and contributor guidance;
- `README*`, architecture or design overviews, ADRs, and domain documentation;
- `docs/ARCHITECTURE*`, `docs/architecture/`, or source-adjacent owner docs;
- build, test, lint, type/static-analysis, benchmark, and runtime-debug entrypoints;
- public API, schema, file-format, configuration, and deployment contracts.

Treat a document as normative only when the project establishes that ownership.
When docs, code, tests, and runtime disagree, record the conflict and determine
the intended owner before changing either side.

Apply the owner-map and impact-classification procedure in
[documentation-reconciliation.md](documentation-reconciliation.md). Search both
for exact identifiers (paths, symbols, routes, commands, configuration keys) and
for the responsibilities or flows that may change. An exact-name search alone
cannot prove that documentation is unaffected.

## Establish why now

Prefer candidates supported by more than one signal:

- high change frequency or repeated defects;
- changes are slowed by coupling, duplication, unclear ownership, or unsafe seams;
- complexity or maintainability metrics identify a hotspot;
- runtime, incident, profiling, or resource evidence exposes a concrete cost;
- architecture or contract drift repeatedly causes implementation mistakes.

Reject random cleanup. Complexity in stable code can be less costly than moderate
complexity in a frequently changed path. Record metric granularity: file-level
evidence does not prove which method or component is responsible.

## Select applicable quality dimensions

Do not mechanically score every category. Examine the ones the target can affect:

| Dimension | Evidence to seek |
| --- | --- |
| Behavior and compatibility | Public outputs, errors, side effects, schemas, file formats, CLI or API contracts |
| Architecture and data | Ownership, cohesion, dependencies, data flow, state transitions, special cases |
| Maintainability | Churn, coupling, duplication, naming, complexity, test seams, change surface |
| Performance and resources | Latency, throughput, allocations, memory, I/O, queries, bundle or startup cost |
| Reliability | Concurrency, ordering, cancellation, idempotence, retries, partial failure, recovery |
| Security and privacy | Trust boundaries, authorization, validation, secret or sensitive-data flow |
| Operability | Logs, metrics, tracing, configuration, migration, rollback, deployment behavior |
| UX and accessibility | User-visible flow, focus, semantics, responsiveness, assistive behavior |

Do not claim improvement without before/after evidence appropriate to the
dimension. If a consequential risk cannot be observed, select `NEEDS_APPROVAL`
or `STOP`.

## Lock behavior before design

Identify the smallest set of observable invariants that defines preservation.
Map each invariant to existing evidence. If critical behavior is untested, plan
characterization tests before structural changes; never encode a suspected bug
as the desired contract without confirmation.

Baseline checks must run before mutation. Distinguish:

- green and trustworthy;
- known unrelated failure with reproducible evidence;
- missing or non-executing checks;
- flaky or environment-dependent evidence.

A broken or ambiguous baseline is not silently repaired as part of the refactor.

## Design the change

Inspect data structures, responsibilities, dependencies, state ownership, and
call flow. Consider at least the smallest plausible alternative, including doing
nothing. Extraction is a tactic, not the goal.

Metaphors may suggest candidate boundaries, but they are not design evidence.
Translate them into concrete state and invariant ownership, inputs, outputs,
allowed dependencies, lifecycle, and failure responsibility. Reject a boundary
whose justification remains metaphorical. In particular, an organizational
metaphor does not justify adding managers, controllers, factories, or adapters.

Start comparison with established patterns already working in the project. When
the design is consequential or unfamiliar, or local precedent is inadequate,
compare it with an applicable language, framework, platform, standard, or mature
external solution. Compare constraints and trade-offs, not names or popularity:

```yaml
design_comparison:
  candidate: <local or established solution>
  comparable_constraints: <why it applies here>
  useful_property: <what problem it solves>
  imported_cost: <complexity and trade-offs>
  decision: adopt | adapt | reject
```

Do not force external research onto routine extraction or renaming. Use it when
persistence, concurrency, security, public contracts, performance, or
cross-component ownership makes a wrong boundary consequential. If the selected
solution requires redesign or observable behavior change, return
`NEEDS_APPROVAL` or `STOP` instead of smuggling it into the refactor.

The plan must state:

- target and exclusions;
- invariants and public contracts;
- current structural problem and evidence;
- proposed boundary or transformation;
- local precedent and applicable established alternatives, or why comparison is
  not warranted;
- documentation owners, impact classification, discovery evidence, exact
  documentation changes, and validation;
- intended creates, modifications, and deletions;
- performance-sensitive paths and other applicable risks;
- exact verification available in this project;
- re-plan and stop conditions.

Prefer one coherent slice. Do not force an arbitrary metric threshold when it
requires broad churn; require meaningful improvement without moving the problem.

Do not return `READY` if documentation ownership or impact remains unknown.
Required documentation changes are part of the refactor, not an optional
follow-up. If they are consequential, ambiguously owned, or outside the approved
slice, return `NEEDS_APPROVAL` instead of expanding scope.
