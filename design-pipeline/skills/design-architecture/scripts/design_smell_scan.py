#!/usr/bin/env python3
"""Fast, dependency-free scan for common UI design-system smells.

This is intentionally heuristic. Findings are leads for review, not proof of a violation.
By default findings do not fail the command; use --fail-on-findings in CI-style checks.
"""

from __future__ import annotations

import argparse
import os
import re
from pathlib import Path

EXTENSIONS = {".css", ".scss", ".sass", ".less", ".tsx", ".jsx", ".ts", ".js", ".vue", ".svelte", ".html"}
DEFAULT_SKIP_DIRS = {".git", "node_modules", "dist", "build", ".next", ".nuxt", "coverage", "vendor"}
TOKEN_HINTS = {"token", "theme", "palette", "color", "variables", "vars"}

PATTERNS = [
    (
        "raw-color",
        re.compile(r"(?<![\w-])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![0-9a-fA-F])|\b(?:rgb|rgba|hsl|hsla)\s*\("),
        "Literal color; verify that application/component code should use a semantic token instead.",
    ),
    (
        "inline-style",
        re.compile(r"\bstyle\s*=\s*(?:\{|\"|')"),
        "Inline style; verify that it is not bypassing shared tokens/components.",
    ),
    (
        "tailwind-arbitrary-color",
        re.compile(r"\b(?:bg|text|border|ring|fill|stroke)-\[(?:#|rgb|hsl)"),
        "Arbitrary Tailwind color; prefer a semantic theme role when reusable.",
    ),
]


def is_token_source(path: Path) -> bool:
    lowered = {part.lower() for part in path.parts}
    stem = path.stem.lower()
    return any(hint in stem for hint in TOKEN_HINTS) or any(
        any(hint in part for hint in TOKEN_HINTS) for part in lowered
    )


def iter_files(root: Path, skip_dirs: set[str]):
    for current, dirs, files in os.walk(root):
        dirs[:] = sorted(d for d in dirs if d not in skip_dirs and not d.startswith("."))
        current_path = Path(current)
        for filename in sorted(files):
            path = current_path / filename
            if path.suffix.lower() in EXTENSIONS:
                yield path


def scan_file(path: Path, root: Path):
    try:
        lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError as exc:
        return [("read-error", path, 0, str(exc), "")]

    findings = []
    token_source = is_token_source(path.relative_to(root))

    for lineno, line in enumerate(lines, 1):
        for kind, regex, advice in PATTERNS:
            if kind == "raw-color" and token_source:
                continue
            if regex.search(line):
                findings.append((kind, path, lineno, advice, line.strip()[:180]))
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description="Scan frontend files for common design-system smells.")
    parser.add_argument("path", nargs="?", default=".", help="Project directory (default: current directory)")
    parser.add_argument("--max", type=int, default=200, help="Maximum findings to print (default: 200)")
    parser.add_argument(
        "--exclude-dir",
        action="append",
        default=[],
        metavar="NAME",
        help="Directory name to exclude; repeatable in addition to built-in exclusions",
    )
    parser.add_argument(
        "--fail-on-findings",
        action="store_true",
        help="Exit 1 when findings are present; default is exit 0 because findings are heuristic",
    )
    args = parser.parse_args()

    root = Path(args.path).resolve()
    if not root.exists() or not root.is_dir():
        parser.error(f"Not a directory: {root}")

    skip_dirs = DEFAULT_SKIP_DIRS | set(args.exclude_dir)
    findings = []
    for path in iter_files(root, skip_dirs):
        findings.extend(scan_file(path, root))
        if len(findings) >= args.max:
            break

    findings = findings[: args.max]
    if not findings:
        print("No configured design-system smells found. This does not constitute a full design audit.")
        return 0

    counts = {}
    for kind, path, lineno, advice, excerpt in findings:
        counts[kind] = counts.get(kind, 0) + 1
        rel = path.relative_to(root)
        print(f"[{kind}] {rel}:{lineno}")
        print(f"  {excerpt}")
        print(f"  -> {advice}")

    print("\nSummary")
    for kind in sorted(counts):
        print(f"  {kind}: {counts[kind]}")
    print("\nHeuristic scan only. Confirm each finding against the project's design contract and source-of-truth files.")
    return 1 if args.fail_on_findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
