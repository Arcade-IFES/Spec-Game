# UI Contract: Educational Snake Quiz

## Required visible regions

- `#tela-inicial`: title, version, subject label, start button, mute button, and ranking.
- `#tela-jogo`: question text, score, lives, sound state, feedback/explanation region, and grid playfield.
- `#tela-fim`: final score, mistakes review, initials input, ranking submission, replay control, and storage warning when applicable.
- A persistent warning region for missing or invalid question content.

## Required behavior

- Start is disabled when the question bank has no valid questions.
- Start and replay controls must be keyboard reachable and have Portuguese accessible names.
- Each board answer cell must expose its answer text to assistive technology even when rendered in pixel-art styling.
- Feedback must be announced through a live region and remain visible long enough to read before the next question.
- Mute state must be represented by both icon/text and an accessible label.
- The game must not rely on color alone to distinguish correct and incorrect feedback.
- The layout must remain usable at desktop 1280x800 and mobile 390x844 without horizontal scrolling.

## Input contract

- Arrow keys and WASD map to the four cardinal directions.
- `M` toggles sound.
- Touch swipe uses the dominant axis only and ignores gestures below the minimum threshold.
- Direct reverse direction is ignored.
