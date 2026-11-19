# Dashboard model (one per business area)

A single model for every area (sales, production, support, finance, inventory…). When every dashboard has the same order, anyone opening a new one already knows how to read it.

## Fixed order, top to bottom
1. **Header**: title, subtitle with period and scope ("November 2026 · 8 active sellers"), "Updated at HH:MM" (the real time of the last load, refreshed when the data is), and a Shortcuts button.
2. **Period bar**: "Through day" with ‹ › stepping through business days and never past today, a "Today" button when off today, and "Compare with" (previous month; same month last year when available). Changing the filter navigates immediately, with no "Apply" button.
3. **Day card** (the headline): today's main number against today's reference, a progress bar, 4 supporting numbers and a hidden "How we calculate".
4. **4 month cards**, all the same component: label, value, and a footer with the comparison pill ("+9.7% vs. October through day 11") or an action ("Edit target").
5. **Two-column row**: an "Month to date" chart (2/3) and a "To resolve today" list (1/3) with one button per item.
6. **One table per area** (people, departments, items): 56 px rows, sortable header, done/target mini bars, a segmented bar for ordered states, and a filter toggle ("Only those behind today"). When the **container** gets too narrow for the columns (usually around 800 px of table width), each row becomes a card.
7. **Detail** (mix, rankings) in lists using the same component, at most 3 per row and never a lone card.

Alerts (late, overdue) come in as a **tab or filter** with a red counter, never as a fixed block above the day card.

## Today's reference
- With a target: today's target = (month target − sold before today) ÷ remaining business days, counting today. It adjusts itself to what's already done. Splitting it equally among active people is simple and transparent.
- Without a target: the **average of the last 20 business days** of the same measure. Say so in "How we calculate".
- For an area that is a **position** rather than a flow (inventory), the headline is a snapshot ("below minimum right now"). Without reliable history, don't invent a daily chart: replace the chart with a list ("Restock first") and record the gap.
- Use the measure the process owner uses ("count the units released today"), not the easiest one to query. Ask when there are two possible readings.

## Charts: pick the one the question needs
- **Not every number needs a chart.** If people look things up, a searchable, sortable table beats a picture. An "Explore by" switch (product / region / payment…) with clickable bars that filter the table works better than eight loose cards.
- **Daily counts are bars**, one per day, with a reference line (target or 20-day average). A cumulative line only makes sense for a flow with a monthly target, such as sales.
- **Compare like with like:** day 1–11 of this month against day 1–11 of last month, never against the whole previous month.
- **Each chart gets a one-line headline that says the conclusion** ("Through 11/12: $1.02M, 51% above October through 10/12"), so nobody has to read the axes to get the point.

## Month-to-date chart (for flows with a target)
- The X axis runs from day 1 to the **last day of the month**, not to today. That makes room for the dashed pace line, drawn diagonally from today's point to the target on the last day.
- Current line in the data blue, comparison in gray, a dashed pace line, and dots with a ring in the surface color.
- Put direct labels at line ends ("Target 2.4M", "Oct 3.2M"), the legend at the top, and round Y values (0, 1M, 2M). Add a crosshair and tooltip on hover.
- Use one scale. Never two Y axes.

## State bars
Ordered states (nothing received → deposit → partial → product paid → fully paid) use **a single-hue ramp**, light to dark, checked in both themes. Keep a 2 px gap between segments and show the legend once, at the top of the card.

## Missing data
If any record in the period lacks the value you need, the pill becomes "Comparison suspended" and the sentence says how many are missing. A wrong number that looks right is worse than no number. Say it once, in the card it affects, not in a block repeated across the page.

## Numbers people can trust (each of these shipped wrong once)
- **Check every number with a query** against the real database before showing it. Code review doesn't catch a wrong count; a real session against real data does.
- **Business days exclude holidays**, not only weekends. Decide whether "days late" counts calendar or business days, and say which in the label.
- **Comparison with a time before the thing existed is suspended.** A stage created on Oct 13 compared with Oct 1–11 gives "179 vs 0", which is technically true and completely misleading.
- **Use the median when a few cases are extreme.** Three orders 600 days late turn a 4-day typical delay into a 10-day average. If you exclude outliers, state the rule and how many were excluded.
- **Batch entries skew averages.** 233 payments logged in one afternoon are not that day's revenue.
- **One unit per comparison.** Don't project in tickets and report delays in orders on the same page.
- **Name the measure for what it is.** "Queue ÷ daily output" is "days to clear the queue", not "time in the factory".

## Privacy doesn't change with the look
A redesign never widens access. Someone who saw only their own sales still sees only their own sales, and money stays visible only to those who already saw it. The filter lives on the server, in the query, and needs a test.
