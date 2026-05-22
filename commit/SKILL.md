---
name: commit
description: Use when the user asks to create a git commit, commit current changes, prepare a conventional commit message, stage files for a commit, or inspect diffs before committing.
---

# Commit Changes

Follow conventionalcommits.org. If unfamiliar, load `SKILL.extended.md`.

Our scope rule: ticket key when related to a ticket (`fix(ABC-012): summary`), otherwise module (`feat(auth): summary`). First line under 72 chars. No AI attribution.

Workflow:

1. Inspect changes (`git status --short`, `git diff`).
2. Stage only files related to the current task. Leave unrelated changes unstaged unless asked.
3. Present a commit plan before committing — files, message, and body if any.
4. After approval, stage and commit.
5. Verify with `git log -1 --stat`.

With `-y`: skip the plan, immediately stage related files and commit.
