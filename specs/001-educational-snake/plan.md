# Implementation Plan: Educational Snake Quiz

**Branch**: `001-educational-snake` | **Date**: 2026-09-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-educational-snake/spec.md`

## Summary

Deliver an offline, zero-install educational Snake game for Brazilian Portuguese-speaking students.
The implementation will use the repository's mandated plain HTML, CSS, and vanilla JavaScript structure:
a DOM-based shell for accessible interface text, a grid-based playfield for deterministic collision logic,
real-time Web Audio effects, and browser storage guarded by failure handling for mute preference and ranking.
Question content will remain isolated in `perguntas.js` using the constitution's `PERGUNTAS` contract.

## Technical Context

**Language/Version**: Vanilla JavaScript using browser ECMAScript features supported by current desktop and mobile browsers

**Primary Dependencies**: None; Web Audio API, localStorage when available, Pointer/Touch Events, and standard DOM APIs

**Storage**: `localStorage` for top-10 ranking and mute preference, wrapped in a failure-tolerant storage adapter

**Testing**: Manual browser validation from `quickstart.md`, deterministic pure-function checks in `tests/logic-tests.html`, and Playwright/browser inspection when available; no package runner

**Target Platform**: Offline current desktop and mobile browsers opening `index.html` directly from disk

**Project Type**: Single-project static web game

**Performance Goals**: Maintain a stable 60 FPS render loop and update gameplay at a fixed 120 ms tick on supported devices; first screen usable within 3 seconds

**Constraints**: No framework, bundler, package dependency, server, network request, external font requirement, image asset, or audio file; all player-facing text must be pt-BR

**Scale/Scope**: One active match, one question per round, three or four alternatives, top ten local scores, responsive desktop/mobile layout

## Constitution Check

- **I. Language**: PASS. Design documents are English; game UI, content, and README will be Brazilian Portuguese.
- **II. Technology Stack**: PASS. The plan uses only plain HTML, CSS, and vanilla JavaScript and runs by double-clicking `index.html` offline.
- **III. Arcade Identity**: PASS. Cabinet presentation, short matches, immediate feedback, score, lives, and CRT styling are included.
- **IV. Sound**: PASS. Web Audio API generates effects and music; keyboard and on-screen mute controls persist the choice.
- **V. Ranking**: PASS. A guarded local top-ten ranking uses three-letter initials and degrades gracefully if storage is unavailable.
- **VI. Question Bank Contract**: PASS. `perguntas.js` declares `const PERGUNTAS = [{ q, a, e, m }, ...]`; invalid or missing content disables start with a warning.
- **VII. Educational Purpose**: PASS. Correct explanations are shown after every answer and mistakes are reviewed; wrong answers deduct points only.
- **VIII. Content Originality**: PASS. Original pt-BR content and credits will be documented in the README.
- **IX. Versioning and Releases**: PASS. Version `1.0.0` is displayed in the UI and README.
- **X. Spec-Driven Workflow**: PASS. This plan follows the approved spec and precedes tasks and implementation.
- **XI. Quality Gates**: PASS. The quickstart covers start-to-finish play, sound/mute, README, and desktop/mobile checks.
- **Part II game rules**: PASS. The design uses three lives, 100/-25 scoring, keyboard/WASD/swipe controls, the declared audience, and the declared multidisciplinary school-subject content.

## Architecture and Data Flow

1. `index.html` provides semantic controls, status regions, question area, ranking area, and the playfield container.
2. `perguntas.js` provides the 250-question multidisciplinary educational bank before `jogo.js` runs.
3. `jogo.js` owns match state, question selection, input, fixed-step movement, collision, and orchestration.
4. `renderizador.js` maps state to DOM/grid cells and feedback panels without owning game rules.
5. `audio.js` creates oscillator-based effects and music, honoring the shared mute preference.
6. `persistencia.js` reads/writes ranking and mute state with guarded browser-storage access.
7. `estilos.css` supplies responsive cabinet presentation, pixel typography fallback, scanlines, contrast, and reduced-motion support.
8. `tests/logic-tests.html` loads pure helpers and reports deterministic checks without a package runner.

## Project Structure

### Documentation (this feature)

```text
specs/001-educational-snake/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html
estilos.css
perguntas.js
jogo.js
renderizador.js
audio.js
persistencia.js
README.md
tests/
└── logic-tests.html
```

**Structure Decision**: Use a flat static-game root so an educator can double-click `index.html`, edit
`perguntas.js` directly, and understand the complete code without build tooling. Split responsibilities
into focused vanilla JavaScript files rather than a framework or module loader that could complicate
file:// execution.

## Implementation Notes

- The game uses CSS grid coordinates as the authoritative board dimensions; JavaScript keeps coordinates as `{ x, y }`.
- Every round shuffles alternatives while preserving the first `a` entry as correct, then places each visible item only in free cells.
- The main loop separates fixed gameplay ticks from rendering so movement remains predictable.
- DOM text is used for questions and explanations; board cells use accessible labels and data attributes.
- Audio starts or resumes only after a user gesture and never blocks gameplay.

## Complexity Tracking

No constitution violations or exceptions require justification.
