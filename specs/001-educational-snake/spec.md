# Feature Specification: Educational Snake Quiz

**Feature Branch**: `001-educational-snake`

**Created**: 2026-09-24

**Status**: Approved

**Input**: User description: "Create an educational retro Snake game in which the player collects the correct answer to each question, with offline play, sound, lives, review, and local ranking."

## User Scenarios & Testing

### User Story 1 - Play a Quiz Snake Match (Priority: P1)

As a student, I want to guide a continuously moving snake toward the correct answer on the playfield so that I can practice secondary-school subjects through active recall.

**Why this priority**: This is the core educational loop and the smallest useful version of the game.

**Independent Test**: Start a new match, answer at least one question correctly, answer one question incorrectly, and verify that movement, feedback, score, lives, and the next question work without a network connection.

**Acceptance Scenarios**:

1. **Given** a new match, **When** the player starts it, **Then** the game shows a question in Brazilian Portuguese, three or four distinct answer items, the score, three lives, and an active playfield.
2. **Given** the snake is moving, **When** the player uses an arrow key, WASD key, or touch swipe, **Then** the snake changes direction on the grid unless the command would reverse directly into its body.
3. **Given** the answer items are visible, **When** the snake collects the correct item, **Then** the score increases by 100, the snake grows by one segment, a positive sound plays, the correct explanation is shown, and a new question with new alternatives is loaded.
4. **Given** the answer items are visible, **When** the snake collects an incorrect item, **Then** the score decreases by 25 but never below zero, an error sound plays, the question is recorded for review, the explanation identifies the correct answer, and the round remains active until the correct item is collected.
5. **Given** the snake collides with a boundary or its own body, **When** the collision occurs, **Then** the match ends and the final score and mistake review are shown.

### User Story 2 - Receive Accessible Arcade Feedback (Priority: P2)

As a student, I want clear visual, audio, and touch feedback so that I can understand what happened immediately while playing on a computer or mobile device.

**Why this priority**: Immediate feedback keeps the learning loop understandable and supports the supported classroom devices.

**Independent Test**: Run a match on desktop and mobile-sized viewports, operate the mute control and keyboard shortcut, and verify that visual feedback remains understandable when sound is muted.

**Acceptance Scenarios**:

1. **Given** a match is active, **When** the player collects an answer, **Then** the interface visibly distinguishes correct and incorrect outcomes and shows the related explanation without obscuring the next action.
2. **Given** sound is enabled, **When** the player starts, answers, or loses, **Then** the game produces distinct chiptune-style feedback for start/correct, incorrect, and game over.
3. **Given** the player toggles mute using the on-screen control or keyboard shortcut, **When** the preference changes, **Then** all game sounds stop or resume and the choice is remembered for the next visit.
4. **Given** a supported mobile viewport, **When** the player swipes on the playfield, **Then** the snake changes direction and the game remains playable without keyboard input.

### User Story 3 - Finish, Review, and Compare Results (Priority: P3)

As a student, I want to review my mistakes and see my result in a local ranking so that I can identify what to study and replay for a better score.

**Why this priority**: Review and ranking extend the value of the core match without being required to begin learning.

**Independent Test**: Finish a match after making mistakes, inspect the review, submit three-letter initials, reload the page, and verify the result appears in the local top ten when browser storage is available.

**Acceptance Scenarios**:

1. **Given** a match ends, **When** the final screen appears, **Then** it shows the final score, the questions answered incorrectly, the correct answer, and each short explanation.
2. **Given** the final score qualifies for the local top ten, **When** the player submits exactly three letters, **Then** the score is stored and displayed in descending order with the initials.
3. **Given** browser storage is unavailable, **When** the player finishes a match, **Then** the game remains playable and explains that the ranking cannot be persisted without crashing.
4. **Given** the player returns to the game, **When** the main screen loads, **Then** the saved ranking and current version are visible when available.

### Edge Cases

- The question bank is missing or empty: the game shows a clear Portuguese warning and disables the start control.
- The question bank has fewer than three alternatives or an alternative is empty: the invalid question is skipped and the player is shown a content warning if no valid question remains.
- An answer item would spawn on the snake body or outside the playable grid: it is relocated before the round starts.
- The grid has insufficient free cells for the snake and all alternatives: the game uses a smaller starting snake or postpones item placement until free cells exist.
- A swipe is too short or ambiguous: it is ignored without changing direction.
- A player presses a direction repeatedly or presses the reverse direction: only valid grid directions are applied.
- The player reloads during a match: the active match is not restored; saved mute preference and ranking remain available.
- Audio playback is unavailable until user interaction: the first eligible interaction unlocks audio, while the game remains playable silently beforehand.
- Score deductions would produce a negative score: the displayed score remains zero.

## Requirements

### Functional Requirements

- **FR-001**: The game MUST allow a player to start an offline match from a clear start control.
- **FR-002**: The game MUST display one current question and exactly three or four distinct alternatives during each active round.
- **FR-003**: The game MUST move the snake continuously on a bounded grid and accept arrow-key, WASD, and touch-swipe direction input.
- **FR-004**: The game MUST prevent direct reverse-direction input and MUST detect collisions with the boundary and the snake body.
- **FR-005**: The game MUST generate answer items only in free grid cells, never on the snake body or outside the playfield.
- **FR-006**: The game MUST award 100 points and one snake segment for a correct answer, then load the next question after showing the correct explanation.
- **FR-007**: The game MUST subtract 25 points for an incorrect answer without going below zero, record the mistake, show the correct explanation, and keep the round active until the correct answer is collected.
- **FR-008**: The game MUST begin with three lives, expose the current score and lives, and end the match on a boundary or self collision.
- **FR-009**: The game MUST provide distinct visual and real-time generated audio feedback for correct answers, incorrect answers, and game over.
- **FR-010**: The game MUST provide an on-screen mute control and a keyboard mute shortcut, and MUST remember the preference between visits.
- **FR-011**: The game MUST show a game-over review containing every question missed, its correct answer, and its explanation.
- **FR-012**: The game MUST maintain a top-ten local ranking with three-letter initials when browser storage is available, and MUST remain playable when it is not.
- **FR-013**: The game MUST show its semantic version on the user-facing interface and in the game README.
- **FR-014**: The game MUST display a clear Portuguese warning and disable starting when the question bank is missing, empty, or has no valid question.
- **FR-015**: The game MUST use original Brazilian Portuguese educational content across the subjects represented in the question bank, with credits in the game README.
- **FR-016**: The game MUST provide a responsive, high-contrast, strict pixel-art arcade presentation with readable text on supported desktop and mobile viewports.

### Key Entities

- **Question**: An educational prompt with a statement, three or four answer alternatives, one correct answer, a short explanation, and a subject label.
- **Match**: A time-bounded play session containing the snake, current question, answer items, score, lives, collected answers, and missed-question review entries.
- **Ranking Entry**: A locally stored result containing three-letter initials, score, and completion order.
- **Player Preference**: The locally remembered sound state for the player.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A first-time player can start a match and see the first question and alternatives within 3 seconds of opening the local game file.
- **SC-002**: In a manual acceptance run, 100% of answer items are placed on free grid cells and no invalid placement is observed across 20 consecutive rounds.
- **SC-003**: At least 90% of test players can complete one correct-answer cycle using keyboard controls without instruction, and at least 80% can do so using touch swipes on a mobile viewport.
- **SC-004**: Correct, incorrect, and game-over outcomes are visually distinguishable within 1 second of the triggering event, including with sound muted.
- **SC-005**: A completed match always presents the final score and every recorded mistake with its correct answer and explanation.
- **SC-006**: The game remains playable start-to-finish without network access and without requiring installation, a server, or external audio files.
- **SC-007**: When storage is available, a submitted qualifying result appears in the local top ten after reload; when storage is unavailable, the match still reaches game over without an uncaught error.

## Assumptions

- The game is a single-player classroom or self-study experience for secondary students aged 12 and above.
- The initial release supports current desktop and mobile browsers that provide standard DOM, touch, local storage, and Web Audio capabilities.
- The default session begins with three lives; lives are displayed for clarity even though boundary and self collisions are the primary game-over conditions.
- The educator maintains content by editing the separate question bank file and follows its documented contract.
- Version `1.0.0` is the initial game release and will be updated using semantic versioning.
- No server, account, network connection, or external asset download is required at runtime.
