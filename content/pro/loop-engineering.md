---
title: "Loop Engineering, Pro"
guide: loop-engineering
price: 29
tagline: "The full loop packet template, the four prompts in full (planner, worker, auditor, handoff), the report and slice queue templates, a twelve-slice example, cost controls, and the failure catalog."
includes:
  - "The complete loop packet: laws, definition of done, report format, deploy rules, slice queue"
  - "Four prompts in full: planner, worker kickoff, auditor, cross-model handoff"
  - "The report template and a twelve-slice example queue for a website build"
  - "Cost controls: budget per slice, the split rule, when to stop a run"
  - "The failure catalog: ten ways loops go wrong and the fix for each"
  - "A real-shaped run log so you know what normal looks like"
---

# Loop Engineering, Pro

A loop is how you get an AI to build something real over hours instead of minutes. One planner writes short briefs. One worker does one slice and reports honestly. You sit at the boundaries and decide what ships. The free guide gave the method. This pack is the operating kit: every file, every prompt, and the failure list learned from running loops on real projects.

## 1. The loop packet

One folder, five files. The planner reads all of them every pass. The worker reads the brief plus the laws.

```
/loop
  LAWS.md          The standing rules. Short. Never changes mid-run without a note.
  DONE.md          Definition of done for the project and for a slice.
  REPORT.md        The format every worker report must use.
  DEPLOY.md        Who approves what, and what never ships without a human.
  QUEUE.md         The slices, in order, with status.
  /reports         One file per pass: 001.md, 002.md ...
```

### LAWS.md

```
# LAWS
1. One slice per pass. A slice is the smallest thing that works end to end.
2. The worker never decides scope. If the brief is unclear, the worker reports "blocked: unclear" and stops.
3. Every report ends with PASS or FAIL and one reason. "Should work" is FAIL.
4. Nothing is done until it has been verified by running it, opening it, or reading it back. Say which.
5. Never touch files outside the slice. If you must, report it as a deviation.
6. Never invent data, copy, names, or numbers. Use placeholders marked [NEEDS REAL].
7. The brand and voice rules in BRAIN.md apply to everything produced.
8. When two passes fail the same slice, stop the run and escalate to the human.
9. Cost: log the model and the rough token spend per pass in the report.
10. The human ships. The loop proposes.
```

### DONE.md

```
# DEFINITION OF DONE
PROJECT DONE WHEN
- [the three to five things that must be true, observable, testable]

A SLICE IS DONE WHEN
- It runs, renders, or reads end to end.
- The report shows how it was verified (command run, page opened, file read).
- Nothing outside the slice changed, or the deviation is reported.
- The next slice can start without cleanup.
```

### REPORT.md

```
# REPORT [pass number]
SLICE: [name from QUEUE.md]
MODEL: [name]   SPEND: [rough tokens or dollars]
DID
- ...
VERIFIED BY
- [command / opened / read back] ...
DEVIATIONS
- [none] or what and why
BLOCKERS
- [none] or what is needed
RESULT: PASS / FAIL. Reason: [one line]
NEXT SLICE SUGGESTION: [optional, one line]
```

### DEPLOY.md

```
# DEPLOY RULES
- Anything customer-facing: human reads it before it ships.
- Anything touching money, access, or data: human approves in writing.
- Anything reversible and internal: ships on PASS.
- Rollback for every deploy is named before the deploy.
```

### QUEUE.md

```
# QUEUE
| # | Slice | Status | Pass |
| 1 | ... | todo / doing / done / blocked | 003 |
```

## 2. The four prompts, in full

### Planner (strongest model)

```
You are the planner for a build loop. You never write code or content yourself. Read /loop/LAWS.md, /loop/DONE.md, /loop/QUEUE.md, and the most recent file in /loop/reports before every pass.

Each pass:
1. Read the last worker report. If it says FAIL, decide: retry the same slice with a sharper brief, or split it into two smaller slices. Two FAILs on one slice means stop and write "ESCALATE" with the reason.
2. If PASS, mark the slice done in QUEUE.md and pick the next one.
3. Write the brief for the next slice under 200 words with exactly these headings: SLICE, WHAT IS REAL WHEN IT IS DONE, FILES IT TOUCHES, LAWS THAT APPLY (by number), REPORT FORMAT (point to REPORT.md).
4. Audit the previous report against DONE.md. If "verified by" is missing or vague, the slice is not done: reopen it.

Never accept "should work." Never let two workers touch the same file in one pass. Never expand scope. If the human's original ask is unclear, write one question at the top of the brief and stop.

Output only: the QUEUE.md update and the brief.
```

### Worker kickoff (cheaper model)

```
You are the worker in a build loop. Read /loop/LAWS.md and the brief below. Do the slice and nothing else.

Rules: one slice, no scope changes, no files outside the list, no invented data (use [NEEDS REAL]). Verify by running, opening, or reading back, and say which. If anything in the brief is unclear, stop and report "blocked: unclear" with the question.

When done, write /loop/reports/[next number].md in the exact REPORT.md format. End with PASS or FAIL and one reason. "Should work" is FAIL.

BRIEF:
[planner pastes the brief here]
```

### Auditor (any model, separate session)

```
You are auditing a build loop's last five reports against /loop/LAWS.md and /loop/DONE.md. Do not fix anything. For each report: was the slice actually verified (quote the line), did any file outside the slice change, did the worker invent anything, and does the PASS hold up. Then answer: is the loop drifting (scope growing, briefs getting longer, same slice retried, verification getting vaguer)? Give one sentence of advice to the human.
```

### Cross-model handoff

```
You are taking over a build loop from another model. Read, in order: /loop/LAWS.md, /loop/DONE.md, /loop/QUEUE.md, and the last three reports. Then write a 150-word state summary: what is done, what is in progress, what is blocked, what the last failure was, and what the next slice should be. Do not start work until the human replies "go."
```

## 3. Example: a twelve-slice queue for a small website

```
| #  | Slice                                              | Status |
| 1  | Repo, folder layout, brain file linked             | done   |
| 2  | Layout shell: nav, footer, one blank page renders  | done   |
| 3  | Design tokens and base styles applied to the shell | done   |
| 4  | Home page hero with real copy from BRAIN.md        | done   |
| 5  | Home page sections 2 to 4                          | doing  |
| 6  | Contact page with a working form                   | todo   |
| 7  | Content folder and loader (notes, date-gated)      | todo   |
| 8  | Notes index and note page                          | todo   |
| 9  | Mobile pass on every page                          | todo   |
| 10 | Metadata, titles, descriptions, favicon            | todo   |
| 11 | Production build passes, no console errors         | todo   |
| 12 | Deploy to staging, human review, rollback named    | todo   |
```

Notice the shape: the first three slices produce nothing a customer would see, and that is right. Get a blank page rendering before a beautiful one.

## 4. Cost controls

- **The split rule.** The strongest model plans. A cheaper model works. Moving execution to the cheaper worker on day one is not an optimization; it is the starting position. Runs that skip this burn half the weekly budget before lunch.
- **Budget per slice.** Set a rough ceiling per pass (in dollars or tokens). A worker that blows the ceiling reports it. Two blown ceilings on one slice means the slice is too big.
- **Brief length.** Under 200 words. Long briefs get re-read on every pass. Standing rules belong in LAWS.md, not in the brief.
- **Fan-out width.** Twenty parallel research tasks beat a hundred. Past twenty, the planner spends more reading reports than the work saved.
- **Flaky checks.** If a verification keeps failing for tool reasons, fix the tool, not the retry count.
- **Stop conditions.** Stop the run on: two FAILs on one slice, any deviation touching money or data, a report without a verification line, or the budget for the day.

## 5. The failure catalog

1. **The worker decides scope.** Symptom: the report says "also fixed." Fix: law 2 and law 5, and reopen the slice.
2. **"Should work."** Symptom: no verification line. Fix: the planner reopens it; the worker learns that PASS needs proof.
3. **Scope creep by brief.** Symptom: briefs grow past 200 words. Fix: move the rules to LAWS.md and split the slice.
4. **The same slice forever.** Symptom: three passes on one slice. Fix: law 8, escalate, then split.
5. **Invented content.** Symptom: real-looking names, numbers, quotes. Fix: law 6, search every report for [NEEDS REAL], and fail any that have none but should.
6. **Two workers, one file.** Symptom: changes overwrite each other. Fix: the planner never assigns the same file twice in a pass.
7. **The strong model typing.** Symptom: cost spikes, slow passes. Fix: the split rule.
8. **The loop that never ships.** Symptom: twenty PASS reports and nothing live. Fix: slice 12 exists from day one; the human ships at milestones, not at the end.
9. **Drift from the brand.** Symptom: voice changes across slices. Fix: law 7, and run the drift check prompt from the AI drift pack every five passes.
10. **Silent tool failure.** Symptom: verification "passes" because the check never ran. Fix: the report must quote the command output, not summarize it.

## 6. What a normal run log looks like

```
001  PASS  Repo and folder layout. Verified: ls output pasted.              spend: low
002  PASS  Layout shell renders. Verified: opened localhost, screenshot.     spend: low
003  FAIL  Tokens applied, but the nav lost its sticky behavior.            spend: low
004  PASS  Tokens applied, nav fixed. Verified: scrolled, screenshot.        spend: low
005  PASS  Hero with real copy. Verified: read back against BRAIN.md.        spend: medium
006  FAIL  Sections 2 to 4: worker touched globals.css outside the slice.   spend: medium
007  PASS  Sections 2 to 4, deviation removed. Verified: diff shows 1 file.  spend: medium
```

Two FAILs in seven passes is normal. Zero FAILs in twenty passes is suspicious: the worker is grading itself generously. Run the auditor.
