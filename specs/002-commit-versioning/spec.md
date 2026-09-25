# Feature Specification: Automatic Commit Versioning

**Feature Branch**: `002-commit-versioning`

**Created**: 2026-09-24

**Status**: Approved

**Input**: User request to version the game automatically with GitHub Actions so each repository commit results in an updated semantic version such as `0.0.2`.

## User Scenarios & Testing

### User Story 1 - Publish a Version for Each Mainline Commit (Priority: P1)

As a maintainer, I want every push to the main repository branch to receive the next patch version so that every delivered game revision can be identified and released.

**Independent Test**: Push a commit to `main` or `master` and verify that the version file, displayed game version, release documentation, commit history, and Git tag contain the next patch version.

**Acceptance Scenarios**:

1. **Given** the repository version is `1.0.0`, **When** a commit is pushed to `main`, **Then** automation creates version `1.0.1`, commits the updated version files, and creates tag `v1.0.1`.
2. **Given** automation creates its version commit, **When** that commit is pushed, **Then** the workflow does not recursively create another version commit.
3. **Given** the version file is invalid, **When** the workflow runs, **Then** it fails before changing or tagging the repository.

## Requirements

- **FR-001**: The repository MUST store its current semantic version in one canonical file.
- **FR-002**: GitHub Actions MUST increment only the PATCH component on every push to `main` or `master`.
- **FR-003**: Automation MUST update the version displayed by the game and the README.
- **FR-004**: Automation MUST create an annotated `vX.Y.Z` tag for each generated version.
- **FR-005**: Automation MUST avoid triggering an infinite versioning loop from its own commit.
- **FR-006**: Automation MUST fail safely when the canonical version is not valid `MAJOR.MINOR.PATCH`.

## Success Criteria

- **SC-001**: Every successful mainline push produces exactly one new patch tag.
- **SC-002**: The game UI and README show the same version as the generated tag.
- **SC-003**: A workflow-generated commit does not trigger a second version bump.

## Assumptions

- The repository default branch is `main` or `master`.
- GitHub Actions has `contents: write` permission and branch protection permits its release commit.
- Major and minor releases are changed manually by maintainers in `VERSION`; the workflow automates patch releases.
