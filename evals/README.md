# Evals

Two checks were run before release (November 2026, Claude Code). They are small: read them as smoke tests, not benchmarks.

## 1. Does it trigger when it should, and stay quiet when it shouldn't?

`trigger-queries.json` has 20 requests: 10 that should load the skill (vague ones included, like *"the sales dashboard has like 14 KPI cards"*) and 10 near-misses that shouldn't (a SaaS landing page, a photographer's portfolio, unit tests for `billing.ts`, a slow SQL query).

Each request ran once with `claude -p`, alongside more than 100 other installed skills (frontend-design, ui-ux-pro-max and more). A request counts as triggered when the skill is called within the first five tool calls.

**Result: 20/20.** In all 10 positive requests the skill was the agent's first tool call; none of the 10 near-misses loaded it. An earlier description, without the "confusing, cluttered, misaligned, gloves, deletes by accident" phrases, missed the vaguest requests; the current one is the fix.

## 2. Is the output better with the skill?

`orders-today.html` is a deliberately messy back-office orders screen: 52 px rows, 1 px borders, 5 tabs, a red alert block on top, a trash can on every row and no undo.

Two agents (same model, same prompt) redesigned it: one was told to use this skill, the other wasn't allowed to read it. A third agent got both files renamed to A and B, opened them in a real browser at 1440 and 390 px, clicked through the flows (resolve, undo, delete, search) and scored them 0–10 on ten criteria: the eight golden rules, visual rhythm/tablet use and data honesty.

| | Without the skill | With the skill |
|---|---|---|
| Blind score | 54 / 100 | 78 / 100 |
| Closure (clear end to a task) | 4 | 9 |
| User in control (nothing moves on its own) | 4 | 9 |
| Error prevention | 3 | 7 |
| Easy reversal | 3 | 7 |
| Top-level blocks on the 8 px grid (1440 / 1024 / 390) | 0/19 · 0/19 · 1/19 | 6/6 · 6/6 · 6/6 |

The skill's version had defects too: Undo broke after a search, amounts weren't sanity-checked, and the queue chips overflowed on phones with no hint. Each one became a rule in `references/golden-rules.md` or `references/grid.md`.

## Running them yourself

- **Grid, contrast and touch targets:** `node scripts/measure-grid.mjs "file://$PWD/your-demo.html"`, run from a folder where Playwright is installed.
- **Trigger:** put the skill's description in a project's `.claude/commands/rule-of-8.md`, run each query with `claude -p "<query>" --output-format stream-json --verbose`, and check whether a `Skill` call to `rule-of-8` shows up early. Anthropic's skill-creator has a `run_eval.py` for this; on a machine with many plugins, give it a longer timeout than the 30-second default.
