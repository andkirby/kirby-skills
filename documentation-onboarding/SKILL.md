---
name: documentation-onboarding
description: Bootstrap or repair a repository's minimal durable documentation system for humans and coding agents. Use for initial project docs, agent onboarding, canonical document ownership, documentation architecture, or cross-session documentation stewardship; do not use for routine document edits or broad instruction audits unrelated to onboarding.
---

# Documentation Onboarding

Build the smallest documentation system that helps a person and a fresh coding
agent make correct decisions. Establish durable ownership and a maintenance
loop; do not generate a documentation warehouse.

## Choose the operating mode

- **Assess**: inspect the repository and propose a documentation system. This is
  the default for requests to review, challenge, explain, or suggest. Do not
  edit files.
- **Bootstrap**: create or repair the initial documentation when the user asks
  for implementation. If the user explicitly wants an interactive learning
  exercise, present the assessment and wait before writing. Otherwise, do not
  add an approval pause that the user did not request.
- **Reconcile**: repair reachability, ownership overlap, or drift in an existing
  documentation system. Edit only when requested.

The user's requested scope and authorization take precedence over the default
mode. Never treat documentation stewardship as permission to change product
behavior, install tooling, commit, publish, or modify unrelated files.

## Discover the live project

Before recommending structure:

1. Resolve the repository root and inspect the working tree. Preserve unrelated
   changes.
2. Read the active project-instruction entrypoints and determine their scope and
   precedence. Do not assume nested instructions load automatically.
3. Inspect existing documentation indexes and likely owner documents before
   proposing new ones.
4. Inspect only enough live evidence to understand the project: manifests,
   runtime entrypoints, top-level components, configuration, data stores,
   tests, deployment files, and project-owned validation commands.
5. Record conflicts between documentation and implementation instead of
   silently resolving them.

Prefer targeted searches and representative entrypoints over exhaustive file
summaries. Increase inspection depth only when a proposed architectural claim
depends on it.

## Classify knowledge without clutter

Keep these states distinct in reasoning and in the assessment:

- **Observed**: supported by current code, configuration, tests, or runtime
  evidence.
- **Confirmed**: product intent or a decision explicitly accepted by the user or
  an authoritative project artifact.
- **Proposed**: a possible future direction that is not accepted current state.
- **Unknown**: consequential information that the available evidence cannot
  establish.

Use labels where status could be confused. Do not prefix every ordinary
sentence with a status label.

Current implementation evidence can disprove a stale current-state claim, but
it cannot invent product intent. A proposed target must not be written as
implemented architecture.

## Apply the durable-knowledge gate

Document a fact when it affects future decisions, safe operation, a public or
cross-component contract, or a costly-to-rediscover invariant. For less
critical facts, use the following as supporting signals rather than a numeric
checklist:

- future tasks are likely to need it;
- it should remain valid beyond the current task;
- rediscovering it requires non-obvious investigation;
- misunderstanding it would produce repeated rework.

Do not preserve temporary task narration, obvious file-by-file descriptions,
speculation, transient debugging state, or implementation details better
expressed by clear code and tests.

Before creating a new canonical document, require all of the following:

- no existing document clearly owns the subject;
- the subject has a distinct and explainable responsibility;
- the new document will be reachable from an active entrypoint;
- its maintenance triggers can be named;
- creating it is within the user's request or has been approved.

Read [references/document-system.md](references/document-system.md) when
selecting initial documents, splitting an owner, or resolving overlap.

## Assess before writing

Return a concise, decision-ready assessment:

1. **Stage**: absent, emerging, fragmented, or established documentation.
2. **Project understanding**: purpose and system shape, with confidence and
   evidence.
3. **Instruction topology**: active entrypoints, scoped guidance, links,
   precedence, and unreachable instructions.
4. **Ownership gaps**: the few durable subjects that currently lack an owner.
5. **Unknowns**: no more than five questions whose answers would materially
   change the initial documentation.
6. **Smallest useful change**: normally no more than three files in the first
   pass, with what each owns and must not own.

Show a system diagram only when it materially improves understanding and the
evidence supports its edges. Otherwise use a short component-and-flow list.

In Assess mode, stop after the assessment. In Bootstrap mode, continue when the
user already authorized creation and the consequential unknowns are resolved;
otherwise request only the missing decisions.

## Bootstrap the minimum system

Prefer improving existing owners. When the project truly has no useful
documentation, the default starting set is:

- `README.md`: human front door—purpose, audience, current maturity, setup, and
  the shortest verified path to first success.
- `AGENTS.md`: agent operating contract and router—commands, constraints,
  validation expectations, instruction precedence, and links to owner docs.
- `docs/ARCHITECTURE.md`: compact current-system map—components,
  responsibilities, runtime entrypoints, data authorities, integrations,
  critical flows, invariants, and verification paths.

These are candidates, not mandatory filenames. Adapt to the repository's
existing conventions and the host agent's supported instruction mechanism.
Keep the first pass to three created or materially rewritten files unless the
user explicitly asks for more.

For each durable document:

- state what it owns and what belongs elsewhere;
- link to evidence and deeper owners instead of copying them;
- expose consequential unknowns or proposed material clearly;
- name the events that require maintenance;
- avoid empty template sections and claims unsupported by the repository.

Read [references/agents-maintenance-contract.md](references/agents-maintenance-contract.md)
before adding or repairing ongoing documentation guidance in `AGENTS.md` or an
equivalent instruction file. Merge with existing guidance; do not add a second
competing policy.

## Reconcile after real work

An always-active project instruction, not this conditionally loaded skill, must
carry the ongoing maintenance rule across fresh sessions.

For each non-trivial change, evaluate documentation impact internally:

- `NONE`: no durable claim became false and no high-value knowledge was found;
- `UPDATE_REQUIRED`: an existing canonical owner would otherwise become stale;
- `SUGGEST_NEW`: durable knowledge has no suitable owner;
- `NEEDS_DECISION`: evidence conflicts with accepted intent or ownership is
  ambiguous.

Update an existing owner as part of authorized implementation when leaving it
unchanged would make it false. Propose a new canonical owner unless document
creation is already authorized. Do not emit routine `NONE` boilerplate for
trivial tasks; report documentation impact when an update, suggestion, conflict,
or meaningful omission exists.

## Verify durability and reachability

Before reporting success:

1. Confirm every new document is linked from an entrypoint a fresh agent or
   human will actually read.
2. Check version-control status and ignore rules. An ignored or untracked file
   is not shared durable documentation unless the user intentionally chose
   local-only guidance.
3. Verify commands, paths, links, and architecture claims against current
   evidence.
4. Run repository-owned Markdown or documentation checks when available.
5. When the environment can safely start a clean agent session without
   expanding the user's scope, verify behavior using the host's supported
   instruction-loading mechanism. Otherwise provide the exact check as a
   handoff and report that runtime persistence was not executed. Never infer
   persistence merely because a file was written or remembered in the current
   session.

For Codex, a repository skill must be placed in a discoverable
`.agents/skills/<name>/SKILL.md` path, while project-wide maintenance guidance
belongs in the active `AGENTS.md` instruction chain. For another host, discover
and use its canonical equivalent instead of assuming Codex conventions.

## Final report

State:

- files created or changed and the responsibility of each;
- evidence and checks completed;
- unresolved confirmed/proposed/unknown boundaries;
- static reachability evidence and the status of any fresh-session check;
- the single most valuable next documentation step, without executing it unless
  requested.

Keep the report short enough for a new agent user to understand and challenge.
