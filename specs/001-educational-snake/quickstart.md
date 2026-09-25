# Quickstart: Educational Snake Quiz

## Prerequisites

- A current desktop or mobile browser.
- No server, package manager, network connection, or installation.

## Run

1. Open `index.html` directly from the repository folder.
2. Confirm the screen shows the title, version `1.0.0`, mute control, ranking, and the start control.
3. Click the start control and confirm a Portuguese question, three or four alternatives, score `0`, and three lives appear.

## Core acceptance run

1. Use an arrow key or WASD to steer the snake into the visibly correct alternative.
2. Confirm a positive visual state, explanation, +100 score, one additional snake segment, and a new question.
3. Steer into an incorrect alternative.
4. Confirm the score decreases by 25 but stays non-negative, the error is reviewed, the correct explanation appears, and the match continues.
5. Continue steering until the snake collides with the wall or itself.
6. Confirm the final screen shows the score and every missed question with selected answer, correct answer, and explanation.

## Controls and sound

- Test arrow keys and WASD on desktop.
- On a mobile viewport, swipe up/down/left/right on the playfield.
- Toggle mute with the on-screen button and keyboard shortcut `M`.
- Reload the page and confirm the mute state remains selected.
- Start a fresh match after a user gesture and confirm distinct success, error, and game-over sounds.

## Ranking and failure paths

1. Finish a qualifying match, enter exactly three initials, and verify it appears in the top ten.
2. Reload the page and verify the ranking remains.
3. In browser settings or a private context where storage is blocked, finish a match and verify the game remains playable and reports that ranking persistence is unavailable.
4. Temporarily rename or empty `perguntas.js`, reopen `index.html`, and verify a Portuguese warning appears and start is disabled. Restore the file afterward.

## Responsive and performance checks

- Test a desktop viewport at 1280x800 and a mobile viewport at 390x844.
- Confirm no question, answer text, control, or feedback overlaps another element.
- Confirm the board keeps stable cells, answer text remains readable, and controls remain reachable.
- Observe 20 consecutive rounds and confirm no answer item is placed on the snake or outside the board.
- Respect the browser reduced-motion preference and confirm the game remains understandable.

## Logic checks

Open `tests/logic-tests.html` directly. The page must report all checks passing for question validation, shuffling, free-cell placement, direction reversal, scoring, and ranking normalization.
