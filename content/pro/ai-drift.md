---
title: "Prevent AI Drift, Pro"
guide: ai-drift
price: 12
pillar: ai
sub: any-model
compare_at: 24
tagline: "The five kinds of drift and how each shows up, the guardrail file, the weekly audit, a regression set you can run in ten minutes, reset rules, and three prompts."
includes:
  - "The build prompt: paste it into Claude, fill in the blanks, and it builds the whole system for your business"
  - "The five drift types: voice, facts, scope, format, decisions, with the early warning for each"
  - "The guardrail file template that sits next to the brain file"
  - "The weekly ten-minute drift audit checklist"
  - "A regression set: ten canonical tasks with expected shapes, so you can test any tool or model in minutes"
  - "Reset rules: when to start a fresh session and how to carry state over"
  - "Three prompts: drift detector, style diff, fact check against the brain file"
---

# Prevent AI Drift, Pro

Drift is what happens when the AI's output slowly stops matching what you set up. It is rarely one bad answer. It is fifty answers, each one percent off, until a customer email sounds like nobody who works here. This pack names the kinds of drift, gives you the file that stops most of it, and a ten-minute weekly routine that catches the rest.

## Start here: the build prompt

Paste everything below into Claude. Fill in CONTEXT, or paste your brain file where marked. It builds your guardrail file, your weekly audit, a regression set of ten tasks with expected answers for your business, and the reset rules, then runs the first audit on a piece of your recent output.

Everything after this section explains the method behind what it builds, so you can judge the output and coach with it. You do not need to read it first.

```
You are building a drift-prevention system for the AI work in my business. Read CONTEXT, then THE METHOD, then follow BUILD. Ask me up to five questions first if CONTEXT is thin.

CONTEXT
- My brain file (paste it, or describe our voice rules, banned words, offers and prices, and private matters): [ ]
- Our decisions log, or the five decisions people keep reopening: [ ]
- The kinds of output we produce most (customer emails, posts, reports, SOPs, code, other): [ ]
- Three recent outputs I was happy with (paste or describe): [ ]
- Three recent outputs that felt off, and what was off: [ ]
- The tools and models we use: [ ]
- How long our typical AI session runs and how many pieces of work it produces: [ ]

THE METHOD
Five kinds of drift: VOICE (longer sentences, adjectives, banned words return), FACTS (numbers rounded, then estimated, then invented; unverified capabilities), SCOPE ("I also" in a report; a post becomes a campaign), FORMAT (a skill's output shape changes), DECISIONS (a settled decision gets reopened because the session forgot it). A GUARDRAILS.md sits next to the brain file with checks to run before producing and before returning anything. A weekly ten-minute audit pulls five outputs, runs a drift detector on each, and any break that appears twice becomes a guardrail line. A regression set is ten small tasks with a known expected shape, run whenever the tool, model, or brain file changes, compared against a saved baseline. Reset a session after ten pieces of work, two failed regression tasks, one self-contradiction, or the same correction twice; carry over only a 150-word state summary.

BUILD
1. GUARDRAILS.md for my business, with our actual banned words, our offers and prices as the fact source, our private matters, and our reopened decisions.
2. THE WEEKLY AUDIT checklist, ten minutes, with the exact steps and where to record results.
3. THE REGRESSION SET: ten tasks for our kinds of output, each with the expected shape and the specific facts the answer must contain. Then produce the BASELINE by answering all ten yourself using only CONTEXT.
4. RESET RULES and the state-summary template.
5. THREE PROMPTS with our rules inside them: a drift detector, a style diff against our approved samples, and a fact check against our offers.
6. FIRST AUDIT: run the drift detector on the three outputs that felt off, name the drift type for each, and give the corrected version.

Rules: plain language, no dashes, nothing invented about my business beyond CONTEXT (mark assumptions [CHECK]).
```

## 1. The five kinds of drift

**Voice drift.** Sentences get longer. Adjectives creep in. The banned words return. Early warning: an exclamation point, a dash, or the word "leverage" in anything customer-facing.

**Fact drift.** A number gets rounded, then estimated, then invented. A capability gets described that was never verified. Early warning: any number or claim you cannot find in the brain file's section 3.

**Scope drift.** You asked for a post and got a campaign. You asked for one fix and got a refactor. Early warning: the phrase "I also" in a report.

**Format drift.** The weekly report has a new section. The SOP steps became paragraphs. Early warning: output that does not match the FORMAT block of its skill.

**Decision drift.** The AI reopens a settled decision because the session forgot it. Early warning: a recommendation that contradicts a line in DECISIONS.md.

## 2. The guardrail file

Sits next to the brain file. Short. The AI reads it after the brain file. Its job is to make the rules checkable.

```
# GUARDRAILS
Read after BRAIN.md. These are checks, not suggestions.

BEFORE PRODUCING ANYTHING
- Which skill or format applies? Name it. If none, use plain prose under 200 words.
- Which decisions in DECISIONS.md touch this? List them.

BEFORE RETURNING ANYTHING
- Banned words present? [list] If yes, remove and say so.
- Any number, quote, or capability not in BRAIN.md section 3? Mark [UNVERIFIED].
- Did the scope grow past the request? If yes, cut it and list what was cut.
- Does the output match the FORMAT of its skill? If no, reformat.
- Does anything contradict DECISIONS.md? If yes, stop and say which line.

WHEN IN DOUBT
- Ask one question instead of guessing.
- Shorter is safer.
```

## 3. The weekly drift audit

Ten minutes, Friday, same slot as the brain file maintenance.

```
[ ] Pull five outputs from this week (one customer-facing, one internal report, one post, one SOP or skill output, one anything).
[ ] Run Prompt A (drift detector) on each. Count the breaks.
[ ] Any break that appears twice becomes a line in GUARDRAILS.md.
[ ] Run the regression set (section 4) on the tool you use most. Note any task whose shape changed.
[ ] Check DECISIONS.md against this week's recommendations. Any reopened decision? Log it and add the decision to the brain file's section 6.
[ ] Update the "last audited" date at the top of GUARDRAILS.md.
```

## 4. The regression set

Ten small tasks with a known expected shape. Run them when you change tools, models, or the brain file. If the shape changes, something drifted.

```
1. "Describe what we sell in two sentences."           Expect: exact offer names and prices from section 3.
2. "Write a two-line customer reply to a late arrival." Expect: one apology, one next step with a time, under 40 words.
3. "List our banned words."                             Expect: the exact list from section 4.
4. "What did we decide about [a logged decision]?"     Expect: the decision, the date, no re-argument.
5. "Write a LinkedIn hook about coaching."             Expect: under 12 words, no dashes, no emoji.
6. "Turn these three bullets into an SOP."             Expect: numbered verbs, owner line, DONE WHEN line.
7. "Give me our average install time."                 Expect: the verified figure, or "unknown."
8. "Summarize this week's numbers." (with three given)  Expect: a table and three sentences, no adjectives.
9. "Add a feature to our service plan."                Expect: a refusal to invent, and a question.
10. "Rewrite this paragraph in our voice." (a hype paragraph)  Expect: short sentences, specifics, no hype words.
```

Save the first clean run's outputs as the baseline. Compare against it, not against memory.

## 5. Reset rules

Long sessions drift more than short ones. Reset when:

- The session has produced more than ten pieces of work.
- The output fails two regression tasks.
- The AI has contradicted itself once.
- You have corrected the same thing twice.

How to reset without losing the thread: ask for a state summary under 150 words (what is done, what is next, what is blocked), start a new session, paste the brain file reference and the summary, and continue. The summary is the only thing that crosses over. Chat history does not.

## 6. The three prompts

### Prompt A. Drift detector

```
Compare the output below against BRAIN.md and GUARDRAILS.md. Report every break in five categories: VOICE (banned words, sentence length, tone), FACTS (numbers, quotes, capabilities not in section 3), SCOPE (anything beyond the request), FORMAT (does it match the skill's format), DECISIONS (contradicts DECISIONS.md). For each break: quote the line, name the rule, give the corrected line. End with a count per category and a one-line verdict: clean, minor drift, or reset recommended.

BRAIN FILE AND GUARDRAILS:
[paste]
THE REQUEST THAT PRODUCED THIS OUTPUT:
[paste]
OUTPUT:
[paste]
```

### Prompt B. Style diff

```
Here are two pieces of writing: one from our baseline (approved) and one from this week. Ignore the topic. Compare only style: average sentence length, adjectives per sentence, banned words, punctuation habits, hedging phrases, and opening patterns. Show the numbers side by side, then name the three habits that changed and give a one-line rule for GUARDRAILS.md that would catch each.

BASELINE:
[paste]
THIS WEEK:
[paste]
```

### Prompt C. Fact check against the brain file

```
Check every factual claim in the text below against BRAIN.md section 3 (what we sell, claims we can make, claims we never make). For each claim: found (quote the source line), not found (mark [UNVERIFIED]), or contradicted (quote both). Do not rewrite the text. Just the list, then a count.

BRAIN FILE SECTION 3:
[paste]
TEXT:
[paste]
```
