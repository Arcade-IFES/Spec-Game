# Research: Educational Snake Quiz

## Decision: Use a static multi-file browser game with no build step

**Rationale**: The constitution requires double-click offline play, educator-editable content, and no package dependencies. Separate script files preserve modularity while remaining understandable and runnable from `index.html`.

**Alternatives considered**: A framework or bundler would improve component abstraction but would violate the zero-install classroom constraint and make direct file opening unreliable.

## Decision: Use a deterministic fixed-step grid loop

**Rationale**: A fixed tick gives predictable collision behavior, makes answer placement testable, and matches the discrete Snake mechanic. Rendering can run between ticks without changing game rules.

**Alternatives considered**: A free-position animation loop would make swipe and collision behavior harder to reason about and would not provide the requested grid precision.

## Decision: Use CSS grid and DOM text for the playfield

**Rationale**: The game needs readable answer text, mobile responsiveness, and a file://-compatible implementation. CSS grid provides stable cells and DOM text remains inspectable and accessible.

**Alternatives considered**: Canvas offers efficient drawing but requires additional text measurement and accessibility work for answer alternatives; it is not needed for this small board.

## Decision: Generate audio with Web Audio API

**Rationale**: This is mandated by the constitution and avoids external files. Short oscillator envelopes can distinguish success, error, and game-over sounds, while a quiet repeating pulse can serve as optional music.

**Alternatives considered**: Audio files would add assets, licensing, and offline path concerns.

## Decision: Guard all browser storage operations

**Rationale**: Private browsing and classroom policies can make localStorage unavailable. A memory-only fallback preserves playability while clearly marking ranking persistence as unavailable.

**Alternatives considered**: Treating storage as guaranteed would create an uncaught error on the final screen and violate the constitution.

## Decision: Keep the full question bank contract in `perguntas.js`

**Rationale**: Educators can change `q`, `a`, `e`, and `m` without touching the game engine, and the first alternative can reliably represent the correct answer before shuffling.

**Alternatives considered**: JSON fetch would fail when opening the game directly from disk in browsers that block local fetch requests.
