# rule-of-8

A skill for AI coding agents (Claude Code, Codex and others) that design screens for **business and operations software**: dashboards, order lists, work queues and factory-floor screens.

It combines two rules of eight:

- **The 8-point grid**: every measure is a multiple of 8 px, checked by a script rather than by eye.
- **Ben Shneiderman's Eight Golden Rules**: consistency, universal usability, informative feedback, closure, error prevention, easy reversal, user control and reduced memory load. Each one becomes something concrete on the screen.

It also teaches the agent to ship a **clickable demo first**, with a *Today / Proposal / Grid / 8 rules* control, before touching the code.

It came out of redesigning a real order, production and sales system for a factory, with the owner signing off on every version.

## What's inside

| File | What it's for |
|---|---|
| `SKILL.md` | The 7-step method and the principles that hold for any screen |
| `references/grid.md` | The size scale and the traps that knock a screen off the grid |
| `references/golden-rules.md` | The eight rules, the pattern that works for each and the mistake each one prevents |
| `references/dashboard-model.md` | One dashboard layout for every area: fixed order, today's target, month-to-date chart |
| `references/demo.md` | How to build the demo, the presenter control and how to read feedback |
| `references/shipping.md` | From demo to production: deploys, data, permissions and working with agents |
| `scripts/measure-grid.mjs` | Uses Playwright to check whether blocks sit on the grid, at 3 widths and in 2 themes |
| `assets/example-demo.html` | A full example demo (Orders + Sales dashboard, fake data; UI in Brazilian Portuguese) |

## Install

With the skills CLI:

```bash
npx skills add zandobaldinho/rule-of-8
```

Or copy the folder to `~/.claude/skills/rule-of-8` (Claude Code) or `~/.agents/skills/rule-of-8` (Codex and others).

Then just ask: *"redesign this dashboard with the rule of 8"*, *"make a demo of the orders screen before we code it"* or *"this list has too many tabs, fix it"*.

## Further reading

- Ben Shneiderman, *The Eight Golden Rules of Interface Design*: https://www.cs.umd.edu/users/ben/goldenrules.html
- *Designing the User Interface*, 6th ed. (Pearson, 2016), section 3.3.4.
- Intro with examples (IxDF): https://ixdf.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces

## License

MIT.
