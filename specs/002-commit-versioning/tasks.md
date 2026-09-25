# Tasks: Automatic Commit Versioning

## Phase 1: Setup

- [X] T001 Create canonical semantic version in `VERSION`.
- [X] T002 Create browser version bridge in `versao.js`.

## Phase 2: Implementation

- [X] T003 Add GitHub Actions patch-version workflow in `.github/workflows/version-on-commit.yml`.
- [X] T004 Load the canonical browser version before the game scripts in `index.html` and consume it in `jogo.js`.
- [X] T005 Document automatic versioning and release tags in `README.md`.

## Phase 3: Validation

- [X] T006 Validate semantic version format, workflow permissions, loop prevention, and generated tag behavior.
