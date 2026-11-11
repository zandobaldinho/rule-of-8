# The 8-point grid: numbers and traps

## The rule
Every height, padding, gap, column width and line height is a multiple of 8 px.
Use 4 px only **inside** small pieces (pill, chip, mini bar, corner radius). One block that ends at 52, 34 or 20 pushes everything below it off the grid.

## A scale that works for internal tools
| Piece | Size |
|---|---|
| Small text / label | 12 / 16 (size / line height) |
| Body text | 14 / 24 |
| Card subtitle | 16 / 24 |
| Dialog title | 20 / 32 |
| Page title, card value | 24 / 32 |
| Headline number | 32 / 40 |
| Button (mouse) | 40 tall, 16 side padding |
| Button (touch, `pointer: coarse` or < 768 px) | 48 |
| Compact button inside a row | 32 |
| Table row | 56 (64 with two text lines plus a pill) |
| Table header | 40 |
| Pill / chip | 24 (16 text + 4 + 4) |
| Progress mini bar | 8 |
| Card | 24 padding (16 on phones), 16 radius |
| Gap between page blocks | 24 |
| Gap between sibling cards | 16 |
| Side menu | 224 wide, 40 items, 8 gap |

## Traps that break the grid (all of these happened)
- **A 1 px border adds height.** A 136 card with `border: 1px` becomes 138. Use `box-shadow: inset 0 0 0 1px <color>` (or `ring-1 ring-inset` in Tailwind), and draw the bottom line of a table row as `box-shadow: inset 0 -1px <color>`.
- **Highlight stripes too.** The 4 px red stripe on a late row is `box-shadow: inset 4px 0 0 <red>`, combined with the bottom line in the same property.
- **Text that wraps.** Two 16 px lines inside a 56 px cell overflow. For support text in a cell, use `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` plus a `title` with the full text. Money is **never** truncated with an ellipsis: if it doesn't fit, change the layout (go from 4 cards per row to 2).
- **A label that wraps on phones.** "Late with pending items" on two lines shifts the value. Shorten the label ("Late") and move the detail to the card footer.
- **Redefined utilities.** Projects often redefine `text-xs` (for example to 13 px). Create the model's own classes instead of trusting the name.
- **A hidden 4 px margin** under a pill or icon. Prefer `gap` in grid or flex over loose margins.
- **Auto grids leave orphan cards.** `auto-fit` with 4 cards on a medium screen becomes 3 + 1. Use fixed column counts based on **container** width (`container-type: inline-size` + `@container`): 4, then 2, then 1.

## Measure, don't eyeball
In the demo and in the code, run a script (Playwright works) that:
1. takes every marked block (for example `[data-m]`),
2. measures `height` and `top` relative to the content container,
3. lists the ones that are not multiples of 8.

Measure at three widths (1440 dark, 1024 light, 390) in both themes, then show the owner the number ("Proposal: 0 of 18 off the grid; Today: 18 of 18 off"). In the demo, a **Grid** button draws 8 px lines and, on hover, shows "height 56 · top 312" in green or red. That sells the idea better than any explanation.

`scripts/measure-grid.mjs <url> [block-selector] [container-selector]` does all of this and exits with code 1 if anything is off.
