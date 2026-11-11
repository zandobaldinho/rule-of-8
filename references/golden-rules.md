# The Eight Golden Rules applied to business software

Source: Ben Shneiderman (https://www.cs.umd.edu/users/ben/goldenrules.html). Each rule below comes with the pattern that worked on operations screens and the mistake it prevents.

## 1. Strive for consistency
- One card component, one money and number format, and one table per area. Three card styles on the same page is the most common symptom.
- Use the same verb for the same action across the whole system.
- **Prevents:** people relearning every screen from scratch.

## 2. Seek universal usability (shortcuts for daily users, simple for newcomers)
- Shortcuts: `/` search, `J`/`K` move through the list, `Enter` opens, `N` new, `Esc` closes, `←`/`→` change the day, `H` back to today, `?` lists shortcuts.
- 48 px touch targets, contrast in both themes, everything reachable by keyboard.
- **Prevents:** frequent users slowing down and occasional users getting lost.

## 3. Offer informative feedback
- A progress bar on the daily number ("42% of today's target").
- A resolved row turns green **in place**, and queue counters update immediately.
- Changing a filter announces what is on screen (`aria-live` region: "Showing through Tue 11/10, compared with October").
- The toast says what happened and gives the new number ("Target saved: $2,800,000. Today's target is now $127,142.86").
- **Prevents:** clicking, not knowing whether it worked, and clicking again.

## 4. Design dialogs to yield closure
- A sequence with a beginning, middle and end: value → preview of the effect → confirm → final confirmation.
- When a pending item is cleared, show "Order has nothing pending. Shipping is unblocked." with a **Next pending** button so the work flows on.
- **Prevents:** people unsure whether they finished, leaving work half done.

## 5. Prevent errors
- The day stepper moves only through business days and never past today. A due date rejects the past and weekends.
- An amount above the balance doesn't go through; a target below what's already sold warns before saving.
- Missing data **suspends the conclusion** ("Comparison suspended: 1 order without an amount") instead of showing a wrong percentage.
- Delete leaves the row and asks for the record number to be typed.
- Real validation lives on the server. Hiding a button is not protection.
- **Prevents:** the system accepting what the user didn't mean.

## 6. Permit easy reversal of actions
- Every write triggered from the screen has **Undo** in the toast and on the row itself ("Done · Undo"). The row's undo keeps working after the toast is gone.
- Undo calls the inverse action that already exists (save the previous value, reopen), with no new logic.
- **Prevents:** fear of clicking, which slows everything down.

## 7. Keep users in control
- Nothing reorders, disappears or refreshes on its own mid-task. A resolved row leaves only when the person switches queues.
- Sorting and filtering are the person's choice, in the headers and toggles.
- Opening details in a side drawer keeps the list where it was.
- **Prevents:** the feeling that "the system moved by itself".

## 8. Reduce short-term memory load
- What's missing and the right button are on the row itself.
- The comparison with the previous period lives **inside** the card and on the chart, not in a separate paragraph.
- Day and month sit on the same row for each person or department.
- The drawer brings together everything the action needs (customer, item, installments) without switching screens.
- Queues show their counts before you open them.
- **Prevents:** people writing on paper what they saw in the other tab.

## Showing the rules without cluttering the screen
The demo has no captions; the presenter narrates. An **8 rules** button turns on numbered markers on the blocks and a side panel with one line per rule saying *where* it shows up on this screen. Turned off, the screen is just the screen.
