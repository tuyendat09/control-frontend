# Safe editing rules

Apply to every task in this repository. A small request should produce a small diff.

## Principles
- Make the smallest change that completes the task.
- Treat existing content as intentional. When uncertain, preserve it and change less.
- Preserve unrelated code, comments, formatting, configuration, and behavior.
- Match the existing structure and conventions of the code you touch.

## Editing
- Before modifying a file, read the relevant surrounding code.
- Edit only the specific function, block, field, import, query, or config that needs to change.
- Never replace a whole existing file when a targeted edit works. Avoid whole-file writes too (`cat > file`, `echo > file`, generated full replacements).
- If a large rewrite seems necessary, first verify the task really requires it.
- No unrelated refactors, cleanup, formatting sweeps, dependency upgrades, or architecture changes.

## Deleting
- Don't remove code just because it looks unused, duplicated, old, or unnecessary — only when the task requires it.
- Don't delete, rename, move, truncate, or recreate existing files unless the user asks or the change strictly requires it.
- Never run destructive commands (`rm`, `git clean`, `git reset --hard`, truncation, equivalents) unless explicitly requested.

## Verify after implementing
1. `git diff --stat` (from the project: `git diff --stat -- .`)
2. `git diff`
3. Confirm only files and lines relevant to the task changed.
4. Look for unexpected deletions or large rewrites.
5. If unrelated changes are present, revert only those before finishing.
