# The demo comes before the code

## Why
The system owner decides by looking, not by reading specs. A clickable demo costs hours; a wrong redesign in the code costs days and a deploy. Iterate on the demo until you hear "that's it".

## What it is (and isn't)
- It is a **simulation** that mimics the system: same menu, same labels, same buttons, realistic fake data, and state that changes (marking an order paid clears its pending item and the count drops).
- It is **not a tutorial.** No captions, arrows or "what happens next". The presenter narrates. A step-by-step guide with screenshots is a different deliverable.
- It is one HTML file with no server dependency, published where the owner can open it on a phone.

## The presenter control
A discreet group in a corner (low opacity, full on hover):
- **Today**: the screen as it is now, with the **real sizes from the code** (52, 34, 13 px…). Copy the actual structure.
- **Proposal**: the new screen.
- **Grid**: turns on the 8 px grid and shows each block's height and top on hover (green on the grid, red off it).
- **8 rules**: numbered markers on the blocks and a side panel explaining where each rule shows up.

If the demo has more than one screen, the side menu switches between them (with a `#hash` so you can send a direct link).

`assets/example-demo.html` is a complete example with an Orders screen and a Sales dashboard. Its UI is in Brazilian Portuguese, the language of the original project.

## Checklist before showing it
- You read the real screen's code: labels, columns, actions and permission rules.
- The fake data is coherent: sums add up, dates land on business days, the "How we calculate" math works.
- Every button does something (changes state or shows a toast). No dead buttons.
- You measured the grid at 1440, 1024 and 390, in both themes.
- You looked at the real screenshots: clipped text, wrapping labels, lone cards, the control covering content.
- No console errors and no horizontal scroll.

## Listening to feedback
Short remarks from the owner usually hide a design rule. Turn each one into a written rule and apply it on every screen:
- "nothing changed" → color and font changed, but the structure stayed the same.
- "it's still not complete" → ask what's missing, showing an inventory of what the real screen has.
- "this takes over the screen for nothing" → the alert goes into a marked tab, not a fixed block.
- "that's it" → freeze this version as the reference, and only then move to code.
