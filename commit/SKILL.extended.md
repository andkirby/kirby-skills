---
name: commit
description: Use when the user asks to create a git commit, commit current changes, prepare a conventional commit message, stage files for a commit, or inspect diffs before committing.
---

# Commit Changes

Use this workflow to create focused git commits with a clear message.

## Message Format

Use:

```text
type(scope): description
```

Common types:

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code change |
| `test` | Tests |

- Use a ticket key or module as the scope, such as `ABC-012` or `auth`.
- Write the description in present tense.
- Keep the first line under 72 characters when practical.
- Do not include AI attribution in commit messages.

Examples:

```text
fix(ABC-012): add GitHub blob URL support
feat(auth): add OAuth login
```

## Workflow

1. Inspect changes before staging:

```bash
git status --short
git diff
git diff --staged
```

2. Read the actual diffs and identify which files belong to the current task.

3. If unrelated changes exist, leave them unstaged unless the user explicitly asks to include them.

4. Present a short commit plan before staging or committing:

```text
Commit plan

Files:
- path/to/file.ts
- path/to/other.ts

Message:
type(scope): description

Details:
Short explanation of the change.
```

5. After approval, stage only the intended files:

```bash
git add <files>
```

6. Commit with a concise subject and useful body when needed:

```bash
git commit -m "type(scope): description

Short explanation of the change."
```

7. Verify the created commit:

```bash
git log -1 --stat
```
