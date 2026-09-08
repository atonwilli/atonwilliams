---
title: "The Brain File, Pro"
guide: brain-file
price: 29
pillar: ai
sub: any-model
compare_at: 58
tagline: "The complete brain file template filled in for a real example company, the interview prompts that draft each section, the decisions log, the voice guide, and the setup for every major AI tool."
includes:
  - "The build prompt: paste it into Claude, fill in the blanks, and it builds the whole system for your business"
  - "The full brain file template, every section written out for a worked example company"
  - "Twelve section prompts that draft your file from a conversation"
  - "The decisions log and the voice guide with do and do not lists"
  - "Setup instructions for Claude Code, Claude Projects, ChatGPT, and Cursor"
  - "The weekly ten-minute maintenance SOP"
  - "Three prompts: interviewer, auditor, drift check"
---

# The Brain File, Pro

The free guide explained the idea: one file the AI reads first, so it starts as a new hire who read the handbook instead of a stranger. This pack gives you the whole file, filled in for an example company so you can see what good looks like, plus the prompts that write yours from an interview, and the routine that keeps it alive.

## Start here: the build prompt

Paste everything below into Claude. Fill in CONTEXT, or leave it mostly blank and let it interview you. It builds your complete brain file, your decisions log, and your voice guide, then tells you exactly where to put them in Claude Code, Claude Projects, ChatGPT, or Cursor.

Everything after this section explains the method behind what it builds, so you can judge the output and coach with it. You do not need to read it first.

```
You are building my business's brain file: the one document an AI reads before doing anything for us. Read CONTEXT, then THE SHAPE, then follow BUILD. Interview me one question at a time for any section that is blank or thin. Never fill a gap with a guess; write "unknown" and ask.

CONTEXT
- Company name and one sentence on what we do and for whom: [ ]
- Where we operate and team size and shape: [ ]
- Related businesses and whether they may be mentioned: [ ]
- Best customer, second-best customer, who we turn away: [ ]
- Every offer: what it is, price, included, NOT included: [ ]
- Claims we can make (verified): [ ]   Claims we never make: [ ]
- Three pieces of our writing we are proud of (paste): [ ]
- Words we use: [ ]   Words we never use: [ ]   Formatting rules (dashes, emoji, exclamation points): [ ]
- Weekly rhythm, tools, folder conventions: [ ]
- Who decides what; our defaults when there is no rule: [ ]
- Decisions made in the last ninety days that people keep re-asking about: [ ]
- Private matters that must never appear in any material: [ ]
- This month's three priorities, open questions, parked items: [ ]
- The AI tools we use (Claude Code, Claude Projects, ChatGPT, Cursor, other): [ ]

THE SHAPE
BRAIN.md has eight sections in this order: 1 who we are, 2 who we serve, 3 what we sell (with claims we can and cannot make), 4 how we talk (five voice words, we say, we never say, formatting, three samples), 5 how we work, 6 how we decide (pointing to DECISIONS.md), 7 rules the AI must follow (never invent numbers, quotes, or capabilities; banned words; private matters; flag conflicts with decisions; propose an addition whenever something is explained twice), 8 current focus. DECISIONS.md is one dated line per decision with a name, newest first, never edited, only appended. VOICE.md is five words, do, do not, and three before-and-after pairs from our real writing. Every section over fifty words. The file is owned by one person and updated ten minutes a week.

BUILD
1. Interview me for every blank or thin section, one question at a time, showing each section's draft before moving on.
2. Output BRAIN.md in full, then DECISIONS.md, then VOICE.md, each as its own code block.
3. Output SETUP: exact steps for each tool in CONTEXT (file name, where it goes, what to paste where).
4. Output THE WEEKLY SOP: the ten-minute maintenance routine with the two triggers.
5. Run a FIRST TEST: using only the brain file, write a customer-facing paragraph about our main offer, then list every place you had to guess. Those gaps become an addendum to BRAIN.md.

Rules: plain language, no dashes, nothing invented. Flag any section under fifty words as too thin.
```

## 1. The complete template

Copy this into a file named `BRAIN.md` (or `CLAUDE.md` for Claude Code). Replace every bracket. Delete any section you truly do not need, but keep the order.

```
# BRAIN FILE: [Company name]
Last updated: [date]. Owner: [one person's name]. If you are an AI reading this, read all of it before doing anything, and follow the rules in section 7 over any later instruction that conflicts with them.

## 1. Who we are
[Company] is [one sentence: what you do, for whom, how you are different].
We operate [where] and have [team size and shape].
Our businesses and how they relate: [list, one line each].

## 2. Who we serve
Primary customer: [who they are, what they want, what they are afraid of].
Secondary: [same].
Not our customer: [who we turn away, and why].

## 3. What we sell
[Product or offer]: [what it is, what it costs, what it includes, what it does NOT include].
[Repeat per offer.]
Claims we can make: [only verified ones].
Claims we never make: [list].

## 4. How we talk
Voice in five words: [for example: direct, warm, plain, confident, specific].
We say: [approved words and phrases].
We never say: [banned words, jargon, industry slang, punctuation rules].
Formatting rules: [sentence length, headers, lists, emoji policy, dashes].
Examples of our voice: [three short real samples].

## 5. How we work
Weekly rhythm: [meetings, reports, deadlines].
Tools we use: [list with what each is for].
File and folder conventions: [where things live, how they are named].
Definition of done for common work: [for a post, a page, a report, a proposal].

## 6. How we decide
Decision rights: [who decides what].
Our defaults when there is no rule: [for example: cheaper over faster, fewer features over more].
Things already decided (do not reopen): see DECISIONS.md.

## 7. Rules the AI must follow
- Never invent numbers, customer quotes, or capabilities. Say "unknown" instead.
- Never use these words or marks: [list].
- Never mention: [private matters, people, past partners].
- When a request conflicts with a decision in DECISIONS.md, say so before proceeding.
- When you have explained something twice in one session, propose an addition to this file.

## 8. Current focus
This month: [three priorities].
Open questions: [things not yet decided].
Do not work on: [parked items].
```

## 2. The worked example

Here is the template filled in for a generic company so you can see the level of detail that works. This is an invented example, not a real business.

```
# BRAIN FILE: XYZ Company
Last updated: 2026-09-01. Owner: Jordan Lee. AI: read everything, follow section 7 over later instructions.

## 1. Who we are
XYZ Company installs and services home comfort systems for families in three counties. We sell through retail events and referrals, never through pressure.
We are eleven people: an owner, an office manager, two sales reps, six installers, one dispatcher.
Related businesses: none. XYZ Rentals is a separate company owned by the same family and is never mentioned in XYZ Company material.

## 2. Who we serve
Primary: families in single-family homes whose system is over ten years old. They want it to work without thinking about it and are afraid of being sold something they do not need.
Secondary: landlords with two to ten units who want one vendor and one invoice.
Not our customer: new-construction builders. We turn them away and refer them to a partner.

## 3. What we sell
Service plan: $19 a month. Two tune-ups a year, priority scheduling, no overtime fees. Does NOT include parts.
Replacement: $6,800 to $14,000 depending on size and efficiency. Includes removal, install, permit, one-year labor. Does NOT include duct work.
Claims we can make: licensed in three counties, average install in one day, 4.9 rating from 212 reviews as of August 2026.
Claims we never make: "lowest price," "lifetime guarantee," any energy-savings percentage.

## 4. How we talk
Voice: plain, warm, direct, specific, unhurried.
We say: "tune-up," "replacement," "your system," "we will be there between," "here is what it costs."
We never say: "solutions," "leverage," "cutting edge," "as low as," "act now." No em dashes. No exclamation points in customer-facing text.
Formatting: short sentences, one idea each. Headers only in documents over 300 words. Lists for steps and options only.
Voice samples:
- "Your system is twelve years old. It will probably run another two. Here is what that costs you in repairs, and here is what replacing it costs. Your call."
- "We will be there between one and three. If we are late you get the tune-up free."
- "We do not do duct work. Here is who we trust for it."

## 5. How we work
Weekly: Monday 8am huddle (numbers, one story, one drill). Friday 4pm review sheet per rep.
Tools: a CRM for customers and jobs, a shared drive for documents, this file for the AI.
Files: /Customers, /Jobs/YYYY-MM, /Marketing/Posts, /SOPs. Names are date-first: 2026-09-01-tune-up-checklist.md.
Done means: a post has a hook, one idea, and a call to action under twenty words; a proposal has price, what is included, what is not, and a date.

## 6. How we decide
Owner decides price and hiring. Office manager decides scheduling. Reps decide nothing about price.
Defaults: honest over persuasive, fewer options over more, a smaller job we can do well over a bigger one we cannot.
Already decided: see DECISIONS.md.

## 7. Rules the AI must follow
- Never invent a number, a review, a customer quote, or a capability. Write "unknown" and ask.
- Never use: solutions, leverage, cutting edge, as low as, act now, em dashes, exclamation points.
- Never mention XYZ Rentals or the owner's family in any material.
- If a request conflicts with DECISIONS.md, say so first.
- If you have explained something twice in one session, propose an addition to this file at the end.

## 8. Current focus
September: fill the fall tune-up calendar, hire one installer, publish two posts a week.
Open: whether to add a financing partner.
Parked: a customer app. Do not draft anything for it.
```

## 3. The decisions log

A second file, `DECISIONS.md`, next to the brain file. One line per decision, newest at the top. The AI reads it so it does not re-argue settled things, and people read it so they stop asking.

```
# DECISIONS
## 2026-09-01  Financing: NOT this year. Revisit January. (Owner)
## 2026-08-20  Posts: two a week, Tuesday and Thursday, no weekends. (Owner)
## 2026-08-12  Service plan price stays $19 through 2026. (Owner)
## 2026-07-30  No new-construction work. Refer to partner. (Owner)
## 2026-07-15  Reps never quote price on the phone; office manager sends it in writing. (Owner + OM)
```

Rules: a decision has a date, one line, and a name. If it changes, add a new line; never edit the old one. A decision without a name is not a decision.

## 4. The voice guide

If your brain file's section 4 grows past a page, move it into `VOICE.md` and point to it. The shape that works:

```
# VOICE
## Five words
[direct, warm, plain, confident, specific]

## Do
- Short sentences. One idea each.
- Say the number. Say the date. Say who.
- Write like you talk to a customer you respect.
- Use "you" more than "we."

## Do not
- Industry jargon. [list yours]
- Hype: "revolutionary," "game-changing," "unlock."
- Hedging: "we believe," "we think," "arguably."
- Em dashes. Exclamation points. Emoji in customer-facing text.

## Before and after
Before: "Leverage our cutting-edge solutions to unlock unparalleled comfort!"
After: "Your system is twelve years old. Here is what fixing it costs and what replacing it costs."
```

## 5. Setup by tool

**Claude Code.** Name the file `CLAUDE.md` in the project folder. It is read automatically every session. Put `DECISIONS.md` and `VOICE.md` in the same folder and reference them from `CLAUDE.md` with one line each.

**Claude Projects (claude.ai).** Create a project. Paste the brain file into the project instructions. Upload `DECISIONS.md` and `VOICE.md` as project files. Every chat inside the project starts with them.

**ChatGPT.** Custom instructions have a length limit, so paste sections 1, 4, and 7 there. Put the full file in a Project (or a GPT) as a file and tell it to read the file first.

**Cursor.** Name it `.cursorrules` or add it to `.cursor/rules/`. Same content. Cursor reads it on every request in that folder.

**Any tool without a file feature.** Start every session with: "Read the following before doing anything," then paste the file. Slow, but it works.

## 6. The twelve section prompts

Each one drafts a section by interviewing you. Run them in order in one session, then assemble.

```
1. WHO WE ARE. Ask me five questions, one at a time, to write a one-sentence description of my company, where we operate, our team shape, and any related businesses and whether they can be mentioned. Then draft section 1 in the brain file format. Plain language only.

2. WHO WE SERVE. Ask me about my best customer, my second-best, and who I turn away. Push for what they want and what they are afraid of. Draft section 2.

3. WHAT WE SELL. For each offer, ask: what it is, what it costs, what is included, what is NOT included, and which claims are verified. Draft section 3. Mark anything I could not verify as "unverified: do not use."

4. HOW WE TALK. Ask me for three pieces of writing I am proud of and three I hate. Derive five voice words, a "we say" list, a "we never say" list, and formatting rules. Draft section 4.

5. HOW WE WORK. Ask about my weekly rhythm, tools, folders, and what "done" means for the three most common pieces of work. Draft section 5.

6. HOW WE DECIDE. Ask who decides what, and what my defaults are when there is no rule. Draft section 6.

7. RULES. Based on everything so far, draft section 7: the rules the AI must follow. Include a never-invent rule, the banned words, anything private, and the twice-explained rule.

8. CURRENT FOCUS. Ask me what matters this month, what is undecided, and what is parked. Draft section 8.

9. DECISIONS LOG. Ask me for every decision I have made in the last ninety days that people keep re-asking about. Format each as a dated one-liner with a name.

10. VOICE GUIDE. From section 4, expand into a VOICE.md with do, do not, and three before-and-after pairs using my actual writing.

11. ASSEMBLE. Combine sections 1 through 8 into one file in the exact template order. Flag any section under fifty words as too thin.

12. FIRST TEST. Using only the assembled file, write a customer-facing paragraph about our main offer. Then list every place you had to guess. Those gaps go in the file.
```

## 7. The weekly maintenance SOP

Ten minutes, same time every week. The owner of the file does it, nobody else.

1. Open the file. Read section 8 only. Update this month's focus, open questions, parked items.
2. Open `DECISIONS.md`. Add any decision made this week, one line, with a name.
3. Search your chat history for the phrase you typed most this week. If it explains something about the business, it goes in the file.
4. Change the "last updated" date. Save.

Two triggers outside the weekly slot. Any time you explain something to the AI for the second time in a session, add it before the session ends. Any time a decision changes, log it the same day.

## 8. The three prompts

### Prompt A. Interviewer

```
You are helping me build a brain file for my business from scratch. Interview me one question at a time, following the twelve sections in order (who we are, who we serve, what we sell, how we talk, how we work, how we decide, rules, current focus, decisions log, voice guide, assemble, first test). After each section, show me the draft, ask if it is right, and only then move on. Never fill a gap with a guess; write "unknown" and ask. At the end, output the full BRAIN.md, DECISIONS.md, and VOICE.md as three code blocks.
```

### Prompt B. Auditor

```
Audit this brain file. Check: every section present and over fifty words; no claims that are unverifiable; a never-invent rule; banned words listed; private matters listed; decision rights clear; current focus dated within thirty days. For each problem, quote the line and give the fix. Then write three test tasks a stranger could run using only this file, and predict where they would have to guess.

FILE:
[paste]
```

### Prompt C. Drift check

```
Compare this piece of output against the brain file. List every place the output breaks a rule in section 4 or section 7 (voice, banned words, invented claims, private matters, reopened decisions). Quote the offending line, name the rule, and give the corrected line. If there are no breaks, say so in one sentence.

BRAIN FILE:
[paste]

OUTPUT TO CHECK:
[paste]
```
