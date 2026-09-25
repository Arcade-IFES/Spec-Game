# Tasks: Educational Snake Quiz

**Input**: Design documents from `/specs/001-educational-snake/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui.md, quickstart.md

**Tests**: Deterministic browser checks are included because the plan requires validation of collision, placement, scoring, and ranking behavior.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the zero-install static game shell and shared file structure.

- [X] T001 Create the static game entry point in `index.html` with the three screen regions, semantic controls, live feedback region, version `1.0.0`, and references to `estilos.css`, `perguntas.js`, `persistencia.js`, `audio.js`, `renderizador.js`, and `jogo.js`.
- [X] T002 [P] Create the educator-editable 250-question bank in `perguntas.js` using `const PERGUNTAS = [{ q, a, e, m }, ...]` with original pt-BR multidisciplinary content, three or four alternatives per question, and credits-ready metadata.
- [X] T003 [P] Create the responsive retro arcade styling in `estilos.css` with high contrast, pixel-art presentation, scanlines, stable grid dimensions, mobile layout, focus states, and reduced-motion support.
- [X] T004 [P] Create the deterministic browser test harness in `tests/logic-tests.html` with a visible pass/fail report and no external dependencies.
- [X] T005 Update the Portuguese project documentation in `README.md` with offline launch instructions, educator content-editing guidance, controls, credits, version `1.0.0`, and the required manual validation scenarios.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared contracts and pure utilities before match stories.

- [X] T006 Implement validated question loading and content warnings in `jogo.js`, including the missing/empty/invalid-bank path that disables start in `index.html`.
- [X] T007 [P] Implement guarded ranking and preference persistence helpers in `persistencia.js`, including top-ten ordering, three-letter normalization, storage failure fallback, and mute preference handling.
- [X] T008 [P] Implement Web Audio API sound primitives and mute preference integration in `audio.js`, covering start/correct, incorrect, game-over, and optional quiet music without audio files.
- [X] T009 [P] Implement board coordinate, direction, shuffle, free-cell, and question-validation helpers in `jogo.js` with no DOM dependencies so they can be exercised by `tests/logic-tests.html`.
- [X] T010 Implement the shared application state shape and screen transitions in `jogo.js` for `inicio`, `jogando`, `pausado`, and `fim`, including score, lives, snake, current question, answer items, and mistake review.

**Checkpoint**: The static shell, content contract, persistence/audio adapters, and pure game helpers are ready for user stories.

## Phase 3: User Story 1 - Play a Quiz Snake Match (Priority: P1) MVP

**Goal**: Deliver the complete educational Snake loop: start, continuous grid movement, answer placement, correct/incorrect outcomes, collision, score, lives, and next questions.

**Independent Test**: Open `index.html` offline, start a match, steer into a correct answer, steer into an incorrect answer, and collide with a wall or body; verify all P1 acceptance scenarios and the final review.

### Tests for User Story 1

- [X] T011 [P] [US1] Add deterministic tests for question validation, three-or-four alternative generation, alternative shuffling, and balanced subject selection in `tests/logic-tests.html`.
- [X] T012 [P] [US1] Add deterministic tests for free-cell answer placement, snake growth, score updates, minimum-zero deduction, and wall/body collision in `tests/logic-tests.html`.

### Implementation for User Story 1

- [X] T013 [US1] Implement fixed-step continuous snake movement at 120 ms ticks and valid arrow/WASD direction queuing in `jogo.js`.
- [X] T014 [US1] Implement touch-swipe direction input with dominant-axis threshold and reverse-direction protection in `jogo.js`.
- [X] T015 [US1] Implement round setup that shuffles three or four alternatives and places every answer item only on free board cells in `jogo.js`.
- [X] T016 [US1] Implement correct-answer handling in `jogo.js` for +100 points, one-segment growth, positive audio, explanation feedback, and next-question loading.
- [X] T017 [US1] Implement incorrect-answer handling in `jogo.js` for -25 points not below zero, mistake recording, error audio, explanation feedback, and continuing the current question until correct collection.
- [X] T018 [US1] Implement wall and self-collision game-over handling in `jogo.js`, including score/lives updates and transition to the final screen.
- [X] T019 [US1] Render question text, score, lives, snake, answer items, feedback, and stable board cells through `renderizador.js` without putting game rules in the renderer.
- [X] T020 [US1] Wire start, replay, keyboard, touch, and fixed-loop events from `index.html` through `jogo.js` and ensure the core loop runs without network access.

**Checkpoint**: User Story 1 is independently playable start-to-finish and demonstrates the MVP educational loop.

## Phase 4: User Story 2 - Receive Accessible Arcade Feedback (Priority: P2)

**Goal**: Make outcomes legible and responsive across desktop/mobile, with sound, mute, feedback announcements, and CRT arcade presentation.

**Independent Test**: Run the match at desktop and mobile viewport sizes, test keyboard and touch input, toggle mute via the button and `M`, reload, and verify visual feedback still works with sound disabled.

### Tests for User Story 2

- [X] T021 [P] [US2] Add browser checks for keyboard/WASD mapping, mute shortcut, feedback live-region updates, and reduced-motion behavior in `tests/logic-tests.html`.
- [X] T022 [P] [US2] Add manual responsive assertions and accessible-name checks for controls, answer cells, and feedback regions in `specs/001-educational-snake/quickstart.md`.

### Implementation for User Story 2

- [X] T023 [US2] Implement distinct oscillator-based start/correct, incorrect, game-over, and optional music patterns in `audio.js`, unlocking audio only after user interaction.
- [X] T024 [US2] Implement on-screen mute control, keyboard `M` shortcut, persistent preference, and accessible mute state in `jogo.js` and `renderizador.js`.
- [X] T025 [US2] Add Portuguese live-region announcements and non-color feedback markers for correct, incorrect, and game-over states in `index.html` and `renderizador.js`.
- [X] T026 [US2] Tune `estilos.css` for 1280x800 and 390x844 layouts, readable alternatives, stable board cells, focus visibility, scanlines, and no horizontal scrolling.
- [X] T027 [US2] Add touch gesture cancellation and resize/orientation handling so the board remains playable after supported viewport changes in `jogo.js`.

**Checkpoint**: User Stories 1 and 2 are both playable, understandable, and responsive with sound enabled or muted.

## Phase 5: User Story 3 - Finish, Review, and Compare Results (Priority: P3)

**Goal**: Provide educational mistake review, local top-ten ranking, storage fallback, and replay flow.

**Independent Test**: Complete a match with at least one mistake, verify the review, submit three initials, reload to see the saved ranking, then repeat in a storage-blocked context.

### Tests for User Story 3

- [X] T028 [P] [US3] Add deterministic tests for mistake-review formatting, three-letter initials normalization, top-ten sorting, tie ordering, and storage-unavailable fallback in `tests/logic-tests.html`.
- [X] T029 [P] [US3] Add final-screen acceptance assertions for score, missed questions, correct answers, explanations, ranking submission, replay, and storage warning in `specs/001-educational-snake/quickstart.md`.

### Implementation for User Story 3

- [X] T030 [US3] Render the final score and every missed question with selected answer, correct answer, and explanation in `renderizador.js`.
- [X] T031 [US3] Implement qualifying-score detection, exactly-three-letter initials input, top-ten insertion, descending display, and tie ordering in `persistencia.js` and `jogo.js`.
- [X] T032 [US3] Implement the storage-unavailable warning and memory-only behavior without uncaught errors in `persistencia.js` and `renderizador.js`.
- [X] T033 [US3] Implement ranking reload, replay reset, and final-screen navigation in `jogo.js` and `renderizador.js`.

**Checkpoint**: All user stories are independently functional and the match teaches, reviews, and records results locally.

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate all requirements and remove delivery risks.

- [X] T034 [P] Run all deterministic checks in `tests/logic-tests.html` and fix failures in the owning source file.
- [X] T035 [P] Run the complete desktop/mobile and offline acceptance flow from `specs/001-educational-snake/quickstart.md` and fix any layout, control, audio, or persistence failures.
- [X] T036 [P] Verify every player-facing string, question, explanation, warning, and README instruction is Brazilian Portuguese and every educational item is original with credits documented in `README.md`.
- [X] T037 Verify the game displays semantic version `1.0.0`, has no network or external asset requests, and opens from a double-clicked `index.html`.
- [X] T038 Update `specs/001-educational-snake/tasks.md` checkboxes only after each task is completed and confirm all tasks are marked `[X]` before handoff.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T002, T003, and T004 can proceed in parallel after T001 establishes the shell.
- **Foundational (Phase 2)**: Depends on Setup; T007, T008, and T009 can proceed in parallel, while T006 and T010 consume their contracts.
- **User Stories (Phase 3+)**: Depend on Foundational completion. US2 and US3 build on the active match but can be tested independently after US1's core loop.
- **Polish (Phase 6)**: Depends on all desired user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2 and is the MVP; no dependency on later stories.
- **User Story 2 (P2)**: Starts after Phase 2 and integrates with the US1 loop; it cannot replace US1's core match.
- **User Story 3 (P3)**: Starts after Phase 2 and consumes mistake/final state from US1; its storage adapter remains independently testable.

### Parallel Opportunities

- T002, T003, and T004 are parallel after T001.
- T007, T008, and T009 are parallel foundational modules.
- T011/T012, T021/T022, and T028/T029 are parallel validation tasks because they touch separate test/document regions.
- T034, T035, and T036 are parallel final validation passes.

## Parallel Example: User Story 1

```text
Task T011: question and alternative logic checks in tests/logic-tests.html
Task T012: placement, scoring, and collision checks in tests/logic-tests.html
Task T019: renderer implementation in renderizador.js
```

These tasks can begin together only after the foundational contracts exist; T013-T018 and T020 then integrate the behavior sequentially in `jogo.js`.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3, including its deterministic checks.
3. Run the independent US1 test and the core section of `quickstart.md`.
4. Stop for a playable classroom demo before adding ranking polish.

### Incremental Delivery

1. Add US1 for the educational match.
2. Add US2 for accessible feedback and responsive play.
3. Add US3 for review, ranking, and replay.
4. Run Phase 6 and the full quickstart before review.

## Notes

- Every task uses the required checkbox, sequential ID, parallel marker where applicable, story label in story phases, and an exact file path.
- No package installation or server task is permitted by the constitution.
