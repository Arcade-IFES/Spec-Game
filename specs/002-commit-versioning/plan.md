# Implementation Plan: Automatic Commit Versioning

**Branch**: `002-commit-versioning` | **Date**: 2026-09-24 | **Spec**: [spec.md](spec.md)

## Summary

Use a GitHub Actions workflow triggered by pushes to `main` and `master`. The workflow reads the canonical `VERSION` file, validates semantic versioning, increments PATCH, updates `versao.js` and the README, then creates a bot commit and annotated tag. The bot commit includes `[skip ci]` so it cannot recursively bump the version.

## Technical Context

**Language/Version**: GitHub Actions YAML and Bash on `ubuntu-latest`

**Primary Dependencies**: `actions/checkout@v4`; GitHub Actions built-ins

**Storage**: Git files `VERSION` and `versao.js`, plus annotated Git tags

**Testing**: Workflow YAML inspection, local semantic-version script checks, and GitHub Actions execution on a test push

**Target Platform**: GitHub repository with Actions enabled and `contents: write` permission

**Constraints**: Patch-only automatic increments; no package manager or server; no recursive workflow execution

## Constitution Check

- **I. Language**: PASS. Workflow comments and repository documentation remain compatible with project conventions.
- **II. Technology Stack**: PASS. The game remains plain HTML, CSS, and vanilla JavaScript; Actions only automates releases.
- **IX. Versioning and Releases**: PASS. Semantic version, annotated tags, and displayed version are kept aligned.
- **X. Spec-Driven Workflow**: PASS. This feature has its own spec, plan, and tasks.

## Project Structure

```text
VERSION
versao.js
.github/workflows/version-on-commit.yml
README.md
index.html
jogo.js
specs/002-commit-versioning/
├── spec.md
├── plan.md
└── tasks.md
```

**Structure Decision**: Keep the canonical version in a root text file, load it through a tiny browser script, and let one workflow own patch increments and tags.
