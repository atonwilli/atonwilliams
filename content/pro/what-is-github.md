---
title: "GitHub for Operators, Pro"
guide: what-is-github
price: 29
tagline: "The setup walkthrough, the daily cheat sheet, commit and PR conventions, the folder structure for running a business (not just code) on GitHub, recovery recipes, and three prompts."
includes:
  - "Setup in twenty minutes: account, first repository, desktop app or command line"
  - "The twelve-command daily cheat sheet with what each one actually does"
  - "Commit message convention, branch naming, and a pull request template"
  - "A folder structure for running content, SOPs, and the brain file on GitHub"
  - "Recovery recipes: undo, restore, find when something changed"
  - "Three prompts: explain this change, write the PR description, git recovery helper"
---

# GitHub for Operators, Pro

GitHub is a place where a project's files live with a full history of every change, who made it, and why. Software teams use it for code. Operators can use it for everything that is text: SOPs, the brain file, content, contracts in draft, the weekly report. Once it is there, an AI can read it, propose changes, and you approve them before they land. This pack gets you set up and productive without learning more than you need.

## 1. Setup in twenty minutes

**Step 1. Account.** Sign up at github.com with a work email. Turn on two-factor authentication before you do anything else.

**Step 2. First repository.** A repository ("repo") is one project folder. Create one called `operations` and make it private. Check "add a README." That README is the front page of the project.

**Step 3. Pick how you will work.**
- GitHub Desktop (an app) if you do not want a terminal. Install it, sign in, and "clone" the `operations` repo to your computer. Cloning means downloading a copy that stays connected.
- The command line if you or your AI tools will use it. Install git, then in a terminal: `git clone https://github.com/YOURNAME/operations.git`.

**Step 4. The first commit.** A commit is a saved snapshot with a message. Add a file called `BRAIN.md` (your brain file), then commit with the message "Add the brain file." Push it. Refresh github.com and you will see it.

**Step 5. Invite one person.** Settings, Collaborators, add them. Now two people can change the same files without emailing versions back and forth.

## 2. The twelve commands

You can do everything below with GitHub Desktop buttons too. The commands are here because AI tools use them and it helps to recognize them.

```
git status              What changed since the last snapshot? Run this constantly.
git add .               Stage everything that changed, ready to be snapshotted.
git commit -m "..."     Take the snapshot with a message.
git push                Send your snapshots to GitHub.
git pull                Get everyone else's snapshots from GitHub.
git log --oneline       The history, one line per snapshot.
git diff                Exactly what changed, line by line, not yet committed.
git checkout -b name    Start a branch: a parallel copy to work on safely.
git switch main         Go back to the main copy.
git merge name          Bring a branch's changes into the copy you are on.
git restore file.md     Throw away uncommitted changes to one file.
git stash               Set aside uncommitted changes without losing them.
```

## 3. Conventions that keep it clean

**Commit messages.** One line, present tense, says what the change does, not what you did. "Add the September tune-up SOP" beats "updated stuff." If it needs explaining, a blank line then a short paragraph.

**Branch names.** `topic/short-description`: `sop/tune-up-checklist`, `content/september-posts`, `brain/voice-update`. Main stays clean. Work happens on branches. Branches merge when reviewed.

**The pull request.** A PR is a request to merge a branch into main, with a description and a place for comments. It is the review step. Use this template and save it as `.github/pull_request_template.md` so it fills in automatically.

```
## What this changes
[one or two lines]

## Why
[the reason, or the decision it comes from]

## How to check it
[what a reviewer should read or run]

## Anything the brain file needs to learn from this?
[yes: what / no]
```

## 4. Running a business on GitHub

The folder structure that works for a small operation. Every file is plain text or markdown so the AI can read and write all of it.

```
/operations
  README.md                  What this repo is and how to use it
  BRAIN.md                   The brain file
  DECISIONS.md               The decisions log
  VOICE.md                   The voice guide
  /skills                    Reusable AI skills
  /sops                      One file per procedure
    2026-09-tune-up-checklist.md
    2026-08-new-hire-week-one.md
  /content
    /notes                   Drafts and published notes, date-first names
    /posts                   Social posts by week
    CALENDAR.md              What publishes when
  /reports
    /weekly                  2026-W36.md, 2026-W37.md
  /templates                 Proposal, email, job post shells
```

**The weekly flow.**
1. Monday: the AI (or you) opens a branch `content/week-37`, drafts the week's posts and the note into `/content`, opens a PR.
2. You read the PR on your phone. Comment on anything wrong. Approve.
3. Merge. If your site reads from this repo, it publishes on its own.
4. Friday: `reports/weekly/2026-W37.md` gets written from the numbers, same flow.

This is the whole "auto-publishing" system in practice: the AI proposes, you approve, the merge publishes. No logins, no bots clicking buttons.

## 5. Recovery recipes

**I changed a file and want the old version back (not committed yet).**
`git restore path/to/file.md`

**I committed something wrong and have not pushed.**
`git reset --soft HEAD~1` undoes the commit and keeps the changes so you can fix them.

**I need a file exactly as it was three commits ago.**
`git log --oneline -- path/to/file.md` to find the commit, then `git checkout <commit> -- path/to/file.md`.

**When did this line change, and who changed it?**
`git blame path/to/file.md` shows every line with its commit and author. `git log -p -S "the exact phrase"` finds every commit that added or removed that phrase.

**I have uncommitted work and need to switch to something urgent.**
`git stash` sets it aside. Do the urgent thing. `git stash pop` brings it back.

**Something is broken and I do not know what.**
`git status` first. Then `git log --oneline -5`. Then paste both into Prompt C below.

## 6. Reviewing AI work with a PR

When an AI opens a PR, review it like a new hire's work: fast, specific, and in writing.

- Read the description first. If it does not say why, ask why.
- Read the diff (the changes), not the whole file. GitHub shows only what changed.
- Comment on the line, not in a separate message. The comment stays with the change forever.
- Approve or request changes. Do not merge something you did not read.

## 7. The three prompts

### Prompt A. Explain this change

```
Explain this diff to a non-technical owner in plain language. What changed, why it probably changed, and anything that looks risky or contradicts the brain file. Under 150 words. If a line changes a number, a price, a date, or a claim, quote it.

DIFF:
[paste from git diff or the PR]
```

### Prompt B. Write the PR description

```
Write a pull request description for these changes using this template: What this changes (two lines), Why (one line or the decision it comes from), How to check it (specific files to read), Anything the brain file needs to learn from this (yes with the addition, or no). Use only what is in the diff.

DIFF:
[paste]
```

### Prompt C. Git recovery helper

```
I am not a developer. Here is my git status and recent log. Tell me, in numbered steps, exactly what to run to get back to a clean working state without losing any uncommitted work. Explain what each command does in one sentence. If any step could lose work, say so before the step and give me the safer alternative.

STATUS:
[paste git status]
LOG:
[paste git log --oneline -5]
WHAT I WAS TRYING TO DO:
[one sentence]
```
