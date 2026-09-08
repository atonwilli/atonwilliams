---
title: "Build a Custom Skill, Pro"
guide: custom-skill
price: 29
pillar: ai
sub: claude
compare_at: 58
tagline: "The anatomy of a skill that holds up, five fully written operator skills, the testing rubric, versioning rules, and two prompts to draft and stress-test your own."
includes:
  - "The build prompt: paste it into Claude, fill in the blanks, and it builds the whole system for your business"
  - "The seven-part anatomy of a skill: name, trigger, input, output, steps, guardrails, examples"
  - "Five complete skills: interview scorecard, weekly numbers, onboarding checklist builder, incident write-up, pricing page audit"
  - "The testing rubric and the three-input rule"
  - "Versioning: how to change a skill without breaking what depends on it"
  - "Two prompts: skill drafter, skill red-team"
---

# Build a Custom Skill, Pro

The free guide showed what a skill is and how to write a first one. This pack is for the skills you will actually run every week: the ones with judgment in them. It gives you the anatomy that keeps a skill reliable, five finished examples with that anatomy, and the testing habit that separates a skill from a prompt you got lucky with once.

## Start here: the build prompt

Paste everything below into Claude. Fill in CONTEXT with the task you want turned into a skill. It drafts the skill with all seven parts, tests it on three inputs, tries to break it, fixes it, and hands you the final file with a version line.

Everything after this section explains the method behind what it builds, so you can judge the output and coach with it. You do not need to read it first.

```
You are building one custom skill for my business and proving it works. Read CONTEXT, then THE ANATOMY, then follow BUILD. Ask me up to five questions first if the task is unclear.

CONTEXT
- The task, in one sentence: [ ]
- Who runs it and when (the trigger): [ ]
- What they have in hand when they start (the input): [ ]
- What a great result looks like, with a real past example if I have one: [ ]
- What must never happen (invented numbers, wrong tone, scope creep, sharing something private): [ ]
- Our voice rules and banned words: [ ]
- Verified facts the skill may use: [ ]
- The tool it will run in: [ ]

THE ANATOMY
Seven parts in order: NAME (lowercase, hyphens, verb phrase), VERSION line with a date, TRIGGER (one line), INPUT (an exact list), OUTPUT (a format block), STEPS (numbered verbs, one action each), GUARDRAILS (at least one "never" and one "if X, stop and ask"), EXAMPLE (one input and its expected output). A skill is done only when it has been run on three inputs (easy, realistic, broken) and every guardrail held, especially on the broken one. Changing the OUTPUT format bumps the major version.

BUILD
1. DRAFT the skill in full, under 300 words, with all seven parts, in one code block.
2. THREE TEST INPUTS: easy, realistic, broken (missing fields, a contradiction, something a guardrail should catch). Invent them, marked as samples, based on CONTEXT.
3. RUN the skill on all three and show the outputs.
4. RED-TEAM: list five ways a model could still get this wrong, and rewrite the STEP or GUARDRAIL that prevents each.
5. FINAL: the improved skill in full, version 1.0 with today's date, in one code block, plus a one-line entry for my skills INDEX.md.
6. INSTALL: where the file goes in my tool and the one line to add so I can run it by name.

Rules: plain language, no dashes, the skill stays under a page, nothing invented about my business beyond CONTEXT.
```

## 1. The seven parts

Every durable skill has these, in this order.

1. **Name.** Lowercase, hyphens, a verb phrase. `interview-scorecard`, not `Interview Helper`.
2. **Trigger.** When to use it, in one line. This is what the index shows.
3. **Input.** Exactly what to paste, as a list. If gathering the input needs a checklist, the checklist goes here.
4. **Output.** The shape of what comes back. A format block, not a description.
5. **Steps.** The order of operations. Numbered. Each step a verb.
6. **Guardrails.** Hard rules. At least one "never," at least one "if X, stop and ask."
7. **Examples.** One good input and its expected output. This is the part most people skip and the part that improves consistency the most.

## 2. Five complete skills

### skills/interview-scorecard.md

```
# SKILL: interview-scorecard
TRIGGER: after any hiring interview, before the interviewer talks to anyone else.
INPUT: the role, the interviewer's raw notes or transcript, and our hiring criteria for the role (from /sops or the brain file).
OUTPUT: a scorecard with evidence, a hire / no hire / second round recommendation, and the two questions for the next round.

STEPS
1. List our criteria for the role. If none were provided, stop and ask for them.
2. For each criterion, find evidence in the notes. Quote it. If there is none, write "no evidence."
3. Score each criterion 1 to 4: 1 no evidence, 2 weak, 3 solid, 4 strong with a specific story.
4. Look for hunger: something they wanted badly enough to be bad at for a while. Quote it or mark absent.
5. Recommend: hire, no hire, or second round. One sentence why.
6. Write the two questions the next interviewer should ask to close the biggest gaps.

GUARDRAILS
- Never score on personality words ("energetic," "confident"). Behavior and stories only.
- Never infer age, family status, health, or anything protected. If the notes contain it, ignore it and flag that it was recorded.
- If the notes are under 100 words, stop and say the interview was not documented well enough to score.

FORMAT
ROLE: ...
CRITERION | SCORE | EVIDENCE
...
HUNGER: quote / absent
RECOMMENDATION: hire / no hire / second round. Why: ...
NEXT ROUND QUESTIONS: 1. ... 2. ...
FLAGS: ...

EXAMPLE
Input: role "sales rep"; criteria: coachable, hunger, comfort with rejection, follow-through; notes: "Told a story about learning to cook for a restaurant job, got fired twice, kept going, now cooks for family every Sunday. When I asked about being told no, said 'I sold gym memberships, no is Tuesday.' Did not follow up after our first call for four days."
Output: coachable 3 (restaurant story), hunger 4 (fired twice, kept going), rejection 3 (gym line), follow-through 2 (four-day gap). HUNGER: "got fired twice, kept going." RECOMMENDATION: second round. Why: strong hunger, follow-through unproven. NEXT ROUND: 1. Walk me through the four days after our call. 2. Tell me about a time you kept a commitment nobody was checking on.
```

### skills/weekly-numbers.md

```
# SKILL: weekly-numbers
TRIGGER: Friday, when the week's numbers are in.
INPUT: a list of metrics with this week's value and last week's value; the target for each if one exists; the leader's notes (optional).
OUTPUT: a table, three sentences, and flags.

STEPS
1. Build the table: metric, this week, last week, change, target, on or off target.
2. Sentence one: the number that moved the most and the most likely reason from the notes. If no notes, say "reason not recorded."
3. Sentence two: the leading number for next week and where it needs to be.
4. Sentence three: the one thing to do about it, from the notes, or "no action recorded."
5. Flags: any metric more than 20 percent off target, any metric missing.

GUARDRAILS
- Never add a metric that was not provided.
- Never use adjectives about performance. Numbers only.
- If more than two metrics are missing, stop and ask for them before writing.

FORMAT
WEEK OF ...
| Metric | This week | Last week | Change | Target | Status |
...
[three sentences]
FLAGS: ...
```

### skills/onboarding-checklist-builder.md

```
# SKILL: onboarding-checklist-builder
TRIGGER: a new hire has a start date.
INPUT: the role, the start date, who their leader is, the systems they need access to, the first-two-weeks plan from /sops if one exists.
OUTPUT: a day-by-day checklist for days 1 to 10 with an owner for every item.

STEPS
1. Day 1: access, introductions, the one document they read (the brain file section 1 and 4), and the first small win.
2. Days 2 to 5: training blocks from the plan, one debrief per day with the leader, the day-three check-in question.
3. Days 6 to 10: the first real work, the day-ten conversation ("how is it going, what surprised you, what do you need"), and the week-two activity number to watch.
4. Every item gets an owner: the leader, the office, or the hire.
5. Add the two dates the leader must not miss: the first bad-shift debrief (whenever it happens) and day ten.

GUARDRAILS
- Never leave an item without an owner.
- Never schedule more than three training blocks in one day.
- If the role has no two-weeks plan in /sops, build the checklist and flag that the plan should be written.

FORMAT
NEW HIRE: name, role, start date, leader
DAY 1
- [owner] item
...
DAY 10
- [leader] The day-ten conversation
WATCH: week-two activity number: ...
```

### skills/incident-writeup.md

```
# SKILL: incident-writeup
TRIGGER: anything went wrong with a customer, a hire, a payment, or a system that someone will ask about later.
INPUT: what happened, in the words of the person closest to it; the timeline if known; what has already been done.
OUTPUT: a one-page write-up that is honest, blame-free, and ends in one change.

STEPS
1. Timeline: what happened, in order, with times if known. Facts only.
2. Impact: who was affected and how.
3. Cause: the most likely cause, marked "likely" unless confirmed.
4. What we did: actions already taken.
5. The one change: the single process or rule change that would prevent a repeat. One, not five.
6. Owner and date for the change.

GUARDRAILS
- Never name a person as the cause. Name the step in the process.
- Never speculate about motive.
- If the incident involves a legal, safety, or payment matter, add the line "escalate to the owner before sharing" at the top and stop after the timeline.

FORMAT
INCIDENT: one line
TIMELINE
...
IMPACT
...
LIKELY CAUSE
...
WHAT WE DID
...
THE ONE CHANGE: ..., owner ..., by ...
```

### skills/pricing-page-audit.md

```
# SKILL: pricing-page-audit
TRIGGER: before any pricing, offer, or checkout page goes live or changes.
INPUT: the page text, the brain file section 3 (what we sell), and DECISIONS.md.
OUTPUT: a pass / fail list and the corrected lines.

STEPS
1. Every price on the page matches section 3. Quote any mismatch.
2. Every "included" item is in section 3. Every "not included" item from section 3 appears on the page.
3. Every claim on the page is in the "claims we can make" list. Quote any that are not.
4. Billing interval, cancellation, and refund terms are stated before any button.
5. No banned words from section 4.
6. Nothing on the page reopens a decision in DECISIONS.md.

GUARDRAILS
- Never approve a page with an unverified claim. Fail it.
- Never rewrite a price. Flag it for the owner.

FORMAT
CHECK | PASS/FAIL | LINE | FIX
...
VERDICT: ready / not ready
```

## 3. Testing: the three-input rule

A skill is not done until it has been run on three inputs: an easy one, a realistic one, and a broken one (missing fields, contradictions, something the guardrails should catch). Record all three in the skill's EXAMPLE section or in a `tests/` folder next to it.

The rubric, per run:

```
[ ] Followed every STEP in order
[ ] Produced the FORMAT exactly
[ ] Every GUARDRAIL held (especially on the broken input)
[ ] Added nothing that was not in the input
[ ] A second person could tell which skill produced this output
```

Five out of five on all three inputs, or the skill goes back for another edit.

## 4. Versioning

Skills change. The things that depend on them (other skills, your weekly rhythm, an AI loop) break silently when they do. Three rules:

1. Add a version line under the name: `VERSION: 1.2 (2026-09-07)`. Bump the number every edit.
2. Never change the OUTPUT format without bumping the first number (1.x to 2.0) and checking what reads that output.
3. Keep the last version's file as `name.v1.md` for thirty days. If nothing broke, delete it.

## 5. The two prompts

### Prompt A. Skill drafter

```
Draft a skill using the seven parts: NAME, TRIGGER, INPUT, OUTPUT (a format block), STEPS, GUARDRAILS (at least one "never" and one "if X, stop and ask"), EXAMPLE (one input and its output). The skill is for: [describe the task, who runs it, and when]. Here is how I do it by hand today: [paste your notes or last prompt]. Keep it under 300 words. Then list three test inputs: easy, realistic, broken.
```

### Prompt B. Skill red-team

```
Try to break this skill. Give me five inputs designed to make it fail: missing fields, contradictory facts, something a guardrail should catch, an input that tempts it to invent, and an input outside its trigger. For each, predict what a model would do wrong and rewrite the STEP or GUARDRAIL that would prevent it. Then give me the improved skill in full.

SKILL:
[paste]
```
