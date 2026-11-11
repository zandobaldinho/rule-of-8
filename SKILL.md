---
name: rule-of-8
description: Designs and reviews screens for business and operations software (dashboards, order lists, work queues, back-office forms, factory-floor screens) using the 8-point grid and Ben Shneiderman's Eight Golden Rules, and ships a clickable demo that compares today's screen with the proposal before any code changes. Use it whenever someone asks to improve, redesign, standardize or "make clearer" a dashboard, an operational list or a back-office flow; asks for a demo or prototype before coding; mentions the 8pt grid, spacing, golden rules, Shneiderman or internal-tool usability; or when a screen has too many tabs, loose numbers, alerts that take over the page or actions with no undo, even if they don't use these words.
---

# Rule of 8

Two rules of eight that together turn an internal screen into a working tool:

- **The 8-point grid**: every measure (height, padding, gap, column width, line height) is a multiple of 8 px. The screen lines up by itself and changes become predictable.
- **The Eight Golden Rules** (Ben Shneiderman): consistency, universal usability, informative feedback, dialogs that yield closure, error prevention, easy reversal, user in control, and reduced short-term memory load.

The grid settles *how it looks*; the rules settle *how it works*. One without the other gives you a pretty screen that gets in the way, or a useful one that looks patched together.

This skill came out of redesigning a real order, production and sales system for a factory. The lessons live in `references/`. Read only what the task needs.

## How to work (in order)

1. **Read the real screen before designing.** Open the code or the live screen and write down the exact labels, columns, actions and permissions, who uses it and on which device. A redesign that only swaps font and color gets "nothing changed"; one that changes structure but ignores the team's vocabulary gets rejected. Measure the current sizes too, because the demo will show them.
2. **Build the demo before the code.** It is a single clickable page with fake data that mimics the system and has a discreet presenter control: **Today / Proposal / Grid / 8 rules**. See `references/demo.md`.
3. **Apply the 8-point grid** with the numbers in `references/grid.md`, then **measure it**: a script walks the blocks and checks that height and top are multiples of 8. "Looks aligned" is not proof. `scripts/measure-grid.mjs` does this.
4. **Apply the eight rules** with the patterns in `references/golden-rules.md`. Each rule has to show up as something concrete on the screen, not as explanatory text.
5. **For dashboards**, use the fixed layout in `references/dashboard-model.md`.
6. **Show it, listen, adjust.** The system owner reacts to pictures, not specs. Iterate on the demo, which is cheap, until they say "that's it". Only then move to code, through agents or yourself.
7. **When going to code**, follow `references/shipping.md`: one package, one review, one deploy, real verification.

## Principles that hold for any screen

- **One list with queues, not many tabs.** Five tabs showing slices of the same thing force people to remember where each case lives. One list with counted queues ("To collect 3", "Tech spec 2") fixes that.
- **Every row says what is missing and offers the right button.** Use one button per row, named with the action's verb ("Collect payment", "Set shipping"). Strong color goes only on the button that unblocks something.
- **Alerts go in a well-marked tab, not in a fixed block at the top.** Late and overdue items get a queue with a red counter and, in the main list, a red stripe on the row. A big block at the top "takes over the screen for nothing" and pushes the work down.
- **Every write has Undo**, delete included. Destructive actions leave the row (no trash can next to the main button) and ask for strong confirmation, such as typing the record number.
- **Nothing moves on its own.** A resolved row stays in place, marked, until the person switches queues. A list that reorders after a click makes people lose what they were doing.
- **Every number says where it comes from** ("3 late out of 66 in progress"). If data is missing (an order with no amount), the comparison is **suspended** with a note, never half-concluded.
- **The formula is one click away.** Keep "How we calculate" behind a toggle on the card instead of spreading a methodology paragraph across the screen.
- **Real touch targets.** Use 48 px for touch and 40 px for mouse. Factory-floor screens get used with gloves on cheap tablets.

## What to deliver

- The **demo** (one HTML file), published somewhere the owner can open on a phone.
- A **short message** covering what changed on each screen, how each rule shows up (an 8-row table works well), what was measured, and what was **not** proven (for example: "not opened with a real login").
- When moving to code, the spec the implementers will follow. `references/dashboard-model.md` is the skeleton.

## Further reading

- Ben Shneiderman, *The Eight Golden Rules of Interface Design*: https://www.cs.umd.edu/users/ben/goldenrules.html
- *Designing the User Interface: Strategies for Effective Human-Computer Interaction*, 6th ed. (Pearson, 2016), section 3.3.4.
- Intro with examples (Interaction Design Foundation): https://ixdf.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces
