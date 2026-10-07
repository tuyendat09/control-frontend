# Training rules

## Exercises
- Source: the shared exercise library (VI/EN names, muscle group) + user-created exercises. See `library-moderation.md`.
- Typing free text ("nằm ghế kéo lưng") → AI suggests matching approved exercises (e.g. chest-supported row, chest-supported dumbbell row). Create a new exercise only when nothing matches.
- History and progress are keyed by exercise id, never by name.

## Sets
- Per set: **kg/lb, reps, RPE, note, type** (e.g. warm-up, working, drop). Add / delete sets; tick = done.
- Defaults come from the previous set, else the last session of that exercise ("last time" column).

## Rest timer
- Default 2:00, configurable **per exercise** and remembered.
- Ticking a set starts it; at zero, notify (vibration/sound when the device allows) and let the user turn that off.

## Sessions
- Create: empty · copy a previous session (exercises + set counts; old kg/reps become targets, not ticked) · from a saved **template** (e.g. Push A, Legs).
- Past days are read-only until the user taps Edit, then Save.
- A day with no session shows "Create session".

## Metrics
- **Volume** = Σ kg × reps of completed working sets (exclude warm-up).
- **PR** = highest estimated 1RM (Epley: `kg × (1 + reps/30)`) for that exercise.
- Weekly figures use the user's week start (default Monday, changeable).

## Open
"Beat the log" (target reps from the last session) — undecided.
