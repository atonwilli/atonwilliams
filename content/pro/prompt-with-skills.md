---
title: "Prompt With Skills, Pro"
guide: prompt-with-skills
price: 29
pillar: ai
sub: claude
compare_at: 58
tagline: "Ten complete, ready-to-use skills for operators, the skill-writing template, the index file, and the prompts that turn any repeated task into a skill."
includes:
  - "The build prompt: paste it into Claude, fill in the blanks, and it builds the whole system for your business"
  - "Ten finished skills: meeting notes to actions, weekly report, job post, SOP writer, sales email, LinkedIn post, customer reply, decision memo, content repurpose, objection drill"
  - "The skill file template and the folder layout that works in Claude Code, Claude Projects, and ChatGPT"
  - "The skill index file so the AI knows what it has"
  - "The skill-writing checklist"
  - "Two prompts: skill generator from a repeated task, skill tester"
---

# Prompt With Skills, Pro

A skill is a prompt you wrote once, carefully, that the AI can load by name. Instead of typing the same three paragraphs every Tuesday, you type "run weekly-report" and paste the numbers. This pack gives you ten skills that are finished and tested, the template for writing your own, and the file that ties them together.

## Start here: the build prompt

Paste everything below into Claude. Fill in CONTEXT with the tasks you repeat. It builds a working skills folder for your business: ten skill files written for your work, the index, the install steps for your tool, and a test run of each.

Everything after this section explains the method behind what it builds, so you can judge the output and coach with it. You do not need to read it first.

```
You are building a skills library for my business: reusable prompt files I can run by name. Read CONTEXT, then THE SHAPE, then follow BUILD. Ask me up to five questions first if CONTEXT is thin.

CONTEXT
- What we do and who we serve, in two sentences: [ ]
- The AI tool we use most (Claude Code, Claude Projects, ChatGPT, Cursor): [ ]
- Ten tasks I or my team repeat every week (for example: meeting notes to actions, weekly report, job post, SOP from a walkthrough, sales follow-up email, social post, customer reply, decision memo, repurposing content, objection drill). List mine: [ ]
- For each task, what the input usually is and what "done" looks like: [ ]
- Our voice in five words, banned words, formatting rules: [ ]
- Verified facts the skills may use (offers, prices, claims): [ ]

THE SHAPE
Every skill is one file under a page: NAME (lowercase, hyphens, a verb phrase), TRIGGER (when to use it), INPUT (exactly what to paste), OUTPUT (a format block, not a description), RULES (three to six, with at least one "never" and one "if X, stop and ask"), STEPS (numbered verbs), EXAMPLE (one input and its output). An INDEX.md lists every skill in one line each. The tool's instructions get one line: "Skills live in /skills. When I say run <name>, read /skills/<name>.md and follow it." A skill is done when it runs on three inputs (easy, realistic, broken) and holds its rules on all three.

BUILD
1. THE FOLDER: list the ten skill file names for my tasks.
2. THE TEN SKILLS in full, one code block each, written for my business with my voice rules and facts inside their RULES.
3. INDEX.md.
4. INSTALL: the exact steps for my tool, including the one line to add to my instructions or brain file.
5. TEST RUN: for the three skills I use most, run each on a realistic sample input you invent (marked as sample) and show the output, then note any rule that needs tightening.
6. THE SKILL TEMPLATE and a ten-line checklist for writing the next one.

Rules: plain language, no dashes, every skill under a page, nothing invented about my business beyond CONTEXT (mark assumptions [CHECK]).
```

## 1. Folder layout

```
/skills
  INDEX.md
  meeting-notes-to-actions.md
  weekly-report.md
  job-post.md
  sop-writer.md
  sales-email.md
  linkedin-post.md
  customer-reply.md
  decision-memo.md
  content-repurpose.md
  objection-drill.md
```

In Claude Code, keep `/skills` in the project and add one line to `CLAUDE.md`: "Skills live in /skills. When I say 'run <name>', read /skills/<name>.md and follow it." In Claude Projects, upload the files and put the same line in the project instructions. In ChatGPT, upload them to a Project and use the same line.

## 2. The index

```
# SKILLS INDEX
Say "run <name>" and paste the input. Each skill states its input, its output, and its rules.

meeting-notes-to-actions   Raw notes in, owners and dates out.
weekly-report              Numbers in, one-page report out.
job-post                   Role facts in, a post that filters out.
sop-writer                 A walkthrough in, a numbered SOP out.
sales-email                A conversation summary in, a five-line email out.
linkedin-post              One idea in, a post in our voice out.
customer-reply             A customer message in, a reply out.
decision-memo              A question in, a one-page memo out.
content-repurpose          One piece in, five formats out.
objection-drill            A product in, a drill session out.
```

## 3. The ten skills

Each file below is complete. The header block is the same shape every time so the AI and the humans both know what to expect.

### skills/meeting-notes-to-actions.md

```
# SKILL: meeting-notes-to-actions
INPUT: raw meeting notes or a transcript.
OUTPUT: a decisions list and an actions list with owners and dates.
RULES: read the brain file first. Never invent an owner; write "unassigned." Never invent a date; write "no date." One line per item.

STEPS
1. Read the notes once. List every decision that was made, as a one-line statement in past tense. ("We will..." becomes "Decided: ...")
2. List every action. Each needs an owner and a date. If either is missing, mark it.
3. List open questions that were raised and not answered.
4. Flag anything that conflicts with DECISIONS.md.

FORMAT
DECISIONS
- Decided: ...
ACTIONS
- [Owner] [Date] Action
- [unassigned] [no date] Action
OPEN
- ...
CONFLICTS
- ...
```

### skills/weekly-report.md

```
# SKILL: weekly-report
INPUT: this week's numbers and last week's numbers, plus up to five notes from the leader.
OUTPUT: a one-page report in our voice.
RULES: never add a number that is not in the input. Show the change, not just the value. No adjectives about the numbers ("great," "disappointing"); the reader judges.

STEPS
1. Table the leading numbers: this week, last week, change.
2. One paragraph: what moved and the most likely reason, using only the leader's notes.
3. One paragraph: the one thing next week, from the notes.
4. Flags: any number that moved more than 20 percent either way.

FORMAT
WEEK OF [date]
[table]
WHAT MOVED
...
NEXT WEEK
...
FLAGS
...
```

### skills/job-post.md

```
# SKILL: job-post
INPUT: role title, what a day looks like, hours, pay structure, the hard truths, the first step you want applicants to take.
OUTPUT: a job post that makes the wrong people close the tab and the right people feel something.
RULES: the hard truth goes in the second sentence. Describe a day, not a personality. No "self-starter," "rockstar," "ninja," "hungry." The first step is a small test (a specific subject line, a one-question answer, a short video). Under 250 words.

STEPS
1. Sentence one: what the role is, plainly.
2. Sentence two: the hardest true thing about it.
3. A paragraph: a day in the role. Where they are, who they talk to, what a good afternoon looks like.
4. A short list: what they get (pay structure, training, the path).
5. Who this is not for, in two lines.
6. The first step, with the specific instruction.
```

### skills/sop-writer.md

```
# SKILL: sop-writer
INPUT: a walkthrough of a task (transcript, voice note, or bullet points) from the person who does it best.
OUTPUT: a numbered SOP a competent stranger could follow on day one.
RULES: one action per step. Start each step with a verb. Include what "done" looks like at the end. Include the one place people usually get stuck, as a note. Name an owner.

FORMAT
# SOP: [name]
Owner: [name]. Last updated: [date]. Time: about [n] minutes.
WHEN: [the trigger that starts this]
STEPS
1. ...
2. ...
DONE WHEN: ...
WATCH OUT: [the one step people get wrong]
```

### skills/sales-email.md

```
# SKILL: sales-email
INPUT: a summary of the conversation (what the buyer said the decision depends on, what was agreed, next step, date).
OUTPUT: a follow-up email in five lines.
RULES: line one restates what THEY said, not what we pitched. No attachments unless they asked. No "just checking in." One question at the end, answerable in one word.

FORMAT
Subject: [what we agreed], [date]
Line 1: You said the decision depends on [their words].
Line 2: Here is what we agreed: ...
Line 3: What happens next: ...
Line 4: By when: ...
Line 5: One question: ...?
```

### skills/linkedin-post.md

```
# SKILL: linkedin-post
INPUT: one idea, one real example (anonymized), and the lesson.
OUTPUT: a post in our voice, under 180 words.
RULES: first line is the hook and stands alone. One idea only. The example is specific and generic (no client names, no real numbers unless verified). End with one line the reader can use tomorrow. No hashtags. No emoji. No "agree?" No dashes.

STEPS
1. Hook: the lesson as a claim, under twelve words.
2. The example, three to five short lines.
3. The turn: what most people get wrong.
4. The line to use tomorrow.
5. Check against VOICE.md. Remove any banned word.
```

### skills/customer-reply.md

```
# SKILL: customer-reply
INPUT: a customer message and the relevant facts (order, appointment, policy).
OUTPUT: a reply.
RULES: answer the question in the first sentence. Apologize once if we were wrong, never if we were not. Never promise something not in the facts. Give one next step with a time. Sign with a first name.

STEPS
1. What is the customer actually asking? One line.
2. Answer it.
3. If there is a problem: what we will do, by when.
4. One line to close.
Check length: under 120 words unless the facts require more.
```

### skills/decision-memo.md

```
# SKILL: decision-memo
INPUT: a question we need to decide, the options, what we know, what we do not.
OUTPUT: a one-page memo the owner can decide from in five minutes.
RULES: recommend one option. State the strongest case against it. Mark every unknown. Never bury the recommendation.

FORMAT
DECISION NEEDED: [one line]
RECOMMENDATION: [one line]
WHY: three bullets
THE CASE AGAINST: two bullets
WHAT WE DO NOT KNOW: bullets
IF YES, NEXT STEP: owner, date
IF NO, NEXT STEP: owner, date
```

### skills/content-repurpose.md

```
# SKILL: content-repurpose
INPUT: one finished piece (a note, a guide section, a transcript).
OUTPUT: five formats: a LinkedIn post, three short video hooks, a newsletter paragraph, a one-line quote card, and a community post with a question.
RULES: every format keeps the same one idea. No new claims. Follow VOICE.md. Mark any line that needs a real number or a real example as [NEEDS EXAMPLE].
```

### skills/objection-drill.md

```
# SKILL: objection-drill
INPUT: product facts, medium, and the rep's weakest objection type (reflex or reason).
OUTPUT: a fifteen-minute drill session: ten objections in order of difficulty, the classification of each, the model answer, and what the coach listens for.
RULES: use only the product facts. At least two objections should end the conversation and be marked "stop." No pressure tactics.
```

## 4. The skill template

```
# SKILL: [name, lowercase with hyphens]
INPUT: [exactly what to paste]
OUTPUT: [exactly what comes back]
RULES: [three to six hard rules, including at least one "never"]

STEPS
1. ...
FORMAT
...
```

## 5. The skill-writing checklist

- Does the name say what it does in one verb phrase?
- Is the input specific enough that a new person could gather it?
- Is the output a shape (format), not a vibe ("something good")?
- Is there at least one "never" rule?
- Did you run it three times with different inputs and get the same shape each time?
- Is it under a page? Long skills get skimmed by the model too.
- Is it in the index?

## 6. The two prompts

### Prompt A. Skill generator

```
I keep doing this task by hand: [describe the task and paste the last prompt you typed for it]. Turn it into a skill file using this exact shape: name, INPUT, OUTPUT, RULES (at least one "never"), STEPS, FORMAT. Then give me three test inputs of different difficulty and what the output should look like for each. Keep the whole skill under 250 words.
```

### Prompt B. Skill tester

```
Run the skill below against the three inputs. For each output, check: did it follow every RULE, did it produce the FORMAT exactly, did it invent anything not in the input. Report pass or fail per rule, then rewrite the weakest rule to be more specific.

SKILL:
[paste]
INPUT 1:
[paste]
INPUT 2:
[paste]
INPUT 3:
[paste]
```
