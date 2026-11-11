# From demo to production without surprises

Lessons from a system people use all day, where every push to the main branch goes to production. Each item below came from an incident.

## Packaging and deploys
- **One package, one PR, one deploy.** Bundle the changes for the same request on one branch. Back-to-back deploys break open tabs (the old page asks for files that no longer exist) and defeat automatic reload.
- **One deploy at a time.** Wait until it's ready and confirm it's up before the next one.
- **A green build doesn't prove it works.** Check the real route (status and response time), server errors in the following minutes and, for logged-in screens, behavior with a real session. Say clearly what was not proven.
- **Rollback is the first move in an incident, not the last.** Restore the previous version, then investigate. Write down the good version's ID before you publish.
- **Don't pay for previews nobody looks at.** Validate locally: types, tests, lint, dead code and build. Automatic per-branch previews cost money and don't prove a real session.

## Data and rules
- **A new rule applies to new records.** When you add a gate (for example "technical spec required"), set a cutoff date. Applying it retroactively freezes work already in progress.
- **The screen hides, the server blocks.** Every permission and validation lives on the server. A server action using a service key bypasses database policies, so the code's filter is the barrier and needs a test.
- **Type casts hide nulls.** `as Type` on a field that can come back empty breaks the form in production. Validate at the boundary.
- **Optional field plus manual mapping is a blind spot.** If a new field depends on someone remembering to map it, it ships dead. Test the path that writes it, not just the one that reads it.
- **Migrations delivered as text and checked against the database.** Scripts list ID pairs and an invariant ("before: 270, after: 270"), get tested on a throwaway database (PGlite works) and are run by the person responsible. Never a bulk UPDATE from memory.
- **External template or resource names are the provider's, not the plan's.** A name suggested in the plan and hard-coded without existing at the provider made every send fail for weeks. Turn the feature on with an environment variable holding the approved name.

## Working with AI agents
- **The planner doesn't implement everything alone.** A coordinator writes the spec, splits it into tasks with dependencies and sends implementers to isolated workspaces. Then comes integration, followed by an independent review that hunts for permission leaks, numbers that changed value and actions without undo.
- **The spec is the worker's only memory.** It needs the goal, the files it may touch, what it must not touch, the proof of done and what to do if something is missing ("stop and ask").
- **Review the first delivery before starting the parallel ones.** A defect in a shared component multiplies across every area that reuses it.
- **Local integration ≠ the sum of the PRs.** Merge the branches and run the full gate again.

## Asking the owner
Ask one question at a time, the one that changes the design:
1. Repeat what they asked for, in their words.
2. Show the data you found ("4 of the 11 tabs exist only on this screen").
3. Give the options with the practical consequence of each, and say which one you recommend.
4. Move everything else forward on your own.
