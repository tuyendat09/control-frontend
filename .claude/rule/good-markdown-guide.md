# Good markdown guide (CLAUDE.md & agent docs)

Source: HumanLayer, "Writing a good CLAUDE.md" (Kyle, 2025-11-25) — https://www.humanlayer.dev/blog/writing-a-good-claude-md. Also applies to `AGENTS.md` (OpenCode, Zed, Cursor, Codex).

Follow this whenever asked to **create** or **optimize** a markdown file meant for the agent (CLAUDE.md, files under `.claude/`). Treat the rules as defaults: break one only when you understand why it exists and have a good reason.

## 1. Why this matters
- LLMs are stateless: weights are frozen at inference, nothing is learned over time. The only thing the model knows about the codebase is the tokens put into the context.
- Agent harnesses make you manage memory explicitly. `CLAUDE.md` is the **only file that goes into every conversation by default**.
- So: the agent knows nothing at the start of each session; everything important must be told each session; `CLAUDE.md` is the preferred way to do it.
- Because it affects every phase and every artifact, it is the highest-leverage point of the harness — for better or worse. A bad line here propagates into research, plans, then code.

## 2. What it is for: onboarding (WHAT / WHY / HOW)
- **WHAT** — tech, stack, project structure. Give a map of the codebase. Critical in monorepos: say what the apps are, what the shared packages are, what everything is for, so the agent knows where to look.
- **WHY** — purpose of the project and of each part of the repo.
- **HOW** — how to work on it: e.g. `bun` instead of `node`. Everything needed to do meaningful work, including **how to verify changes**: run tests, typecheck, compile.
- Do NOT stuff in every command the agent could ever need. That gives sub-optimal results.

## 3. Why Claude ignores CLAUDE.md
- Claude Code injects the file into the user message wrapped with a system reminder: *"this context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task."*
- Claude skips the content if it judges it irrelevant to the current task. The more non-universal content the file has, the more likely **all** of it gets ignored.
- Likely reason for the reminder: many files became piles of "hotfixes" (instructions appended to correct one-off behavior). Telling Claude to ignore bad instructions improved results.
- Implication: never use the file as a dumping ground for one-off fixes.

## 4. Rules

### 4.1 Less (instructions) is more
- Frontier thinking LLMs follow ~150–200 instructions with reasonable consistency. Smaller models fewer; non-thinking models fewer than thinking ones.
- Smaller models decay **exponentially** as instruction count grows; large frontier thinking models decay **linearly**. Avoid small models for multi-step tasks or complex plans.
- LLMs bias toward the edges of the prompt: the very beginning (system prompt + CLAUDE.md) and the very end (latest user messages).
- As instruction count rises, quality drops **uniformly** — the model does not just ignore the later lines, it starts ignoring all of them.
- Claude Code's own system prompt already holds ~50 instructions — nearly a third of the budget before rules, plugins, skills or user messages.
- Therefore: as few instructions as reasonably possible, ideally only universally applicable ones. Never omit what is truly necessary.

### 4.2 Length and applicability
- A context full of focused, relevant material (examples, related files, tool results) beats one padded with irrelevant material.
- Everything in CLAUDE.md must be universally applicable. Example of what to exclude: how to structure a new database schema — it distracts when working on anything else.
- Length: no official Anthropic number; consensus is **< 300 lines**, shorter is better. HumanLayer's root file is **< 60 lines**.

### 4.3 Progressive disclosure
- Keep task-specific instructions in separate markdown files with **self-descriptive names**, and tell Claude where they are.
- Example layout:
  ```
  agent_docs/
    building_the_project.md
    running_tests.md
    code_conventions.md
    service_architecture.md
    database_schema.md
    service_communication_patterns.md
  ```
- In CLAUDE.md list each file with a one-line description and tell Claude to decide which (if any) are relevant and read them **before** starting. Alternative: have Claude show the files it wants to read and get approval first.
- **Prefer pointers to copies.** Avoid code snippets in these docs — they go stale. Use `file:line` references to the authoritative code.
- Conceptually the same as Claude Skills, but skills focus on tool use rather than instructions.

### 4.4 Claude is not a linter
- Never send an LLM to do a linter's job: slower and far more expensive than linters/formatters. Use deterministic tools whenever possible.
- Style guidelines add many instructions and mostly-irrelevant snippets, which degrades instruction-following and wastes context.
- LLMs learn in-context: if the code follows consistent patterns, a few searches are enough for the agent to follow them without being told.
- If you feel strongly: add a Claude Code **Stop hook** that runs the formatter + linter and feeds errors back to Claude. Don't make Claude find formatting issues itself.
- Bonus: use an auto-fixing linter (e.g. Biome) and tune which rules are safe to auto-fix.
- Or make a **slash command** holding the code guidelines that points Claude at the version-control changes / `git status`, so implementation and formatting are handled separately — better results for both.

### 4.5 Do not auto-generate it
- Don't use `/init` or any harness auto-generation (OpenCode etc.) for CLAUDE.md / AGENTS.md.
- Think carefully about **every single line** — one bad line multiplies downstream (bad research → bad plan → bad code).

## 5. Checklist when creating or optimizing a markdown file
1. Does it answer WHAT / WHY / HOW (for the root file) — briefly?
2. Is every line relevant to nearly every task? If not, move it to a topic file and link it.
3. Is it short (root: well under 300 lines, aim for ~60)? Count instructions; cut the rest.
4. Are topic files named by what they contain, and listed with a one-line description?
5. Pointers (`path` / `file:line`) instead of copied code or duplicated content?
6. No style/formatting rules a linter, formatter or hook can enforce?
7. No one-off "hotfix" instructions for a single past mistake?
8. Verification commands (test / typecheck / build / lint) present and exact?
9. Written by hand, each line deliberate — not generated and pasted?
10. Existing content preserved unless the task requires removing it (see `.claude/rule/convenction/file-change.md`).

## 6. Summary
- Onboard Claude: WHY, WHAT, HOW.
- Less is more; concise; universally applicable.
- Progressive disclosure: tell Claude *how to find* information, not all the information.
- Claude is not a linter: use linters, formatters, hooks, slash commands.
- Craft by hand; don't auto-generate.
