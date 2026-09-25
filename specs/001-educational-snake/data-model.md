# Data Model: Educational Snake Quiz

## Question

Represents one original educational prompt.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `q` | string | yes | Non-empty Brazilian Portuguese prompt.
| `a` | string[] | yes | Exactly three or four non-empty alternatives; index 0 is correct before shuffle.
| `e` | string | yes | Short Brazilian Portuguese explanation shown after every answer.
| `m` | string | yes | Subject label used to balance question selection, such as `matematica`, `fisica`, `biologia`, `historia`, `web`, or `programacao`.

Validation rejects a question when `q`, `e`, or `m` is empty, `a` is not an array of three or four non-empty strings, or duplicate alternatives exist.

## Match State

| Field | Type | Rules |
|---|---|---|
| `status` | enum | `inicio`, `jogando`, `pausado`, `fim`.
| `snake` | coordinate[] | Ordered head-first cells; starts with three cells and grows after correct collection.
| `direcao` | enum | `cima`, `baixo`, `esquerda`, `direita`; direct reverse is invalid.
| `proximaDirecao` | enum | Latest valid queued direction for the next tick.
| `perguntaAtual` | Question | One validated question for the active round.
| `itens` | answer item[] | Three or four alternatives, all in free cells.
| `pontuacao` | integer | Starts at zero; correct adds 100; incorrect subtracts 25, minimum zero.
| `vidas` | integer | Starts at three; displayed throughout the match.
| `erros` | mistake[] | One entry per incorrect item collected, including question, selected answer, correct answer, and explanation.
| `versao` | string | Current game version, initially `1.0.0`.

State transitions: `inicio -> jogando` on start; `jogando -> jogando` after answer feedback and next-question setup; `jogando -> fim` on wall/body collision or exhausted session condition; `fim -> inicio` on replay.

## Answer Item

| Field | Type | Rules |
|---|---|---|
| `texto` | string | One current alternative.
| `correta` | boolean | Exactly one visible item is true.
| `posicao` | coordinate | Must be within the board and not overlap the snake or another item.

## Mistake Review

Stores the educational information needed at game over: question statement, selected wrong answer, correct answer, and explanation. Duplicate entries are retained when a player makes separate mistakes in the same match.

## Ranking Entry

| Field | Type | Rules |
|---|---|---|
| `iniciais` | string | Exactly three uppercase A-Z letters after normalization.
| `pontuacao` | integer | Non-negative final score.
| `data` | string | Local ISO timestamp for stable tie ordering.

Only the ten highest scores are retained; ties preserve the earlier completion time.

## Player Preference

`somAtivo` is a boolean persisted independently from the ranking. Missing, malformed, or inaccessible storage falls back to `true` in memory.
