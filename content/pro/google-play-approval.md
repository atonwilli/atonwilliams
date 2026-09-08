---
title: "Google Play Approval, Pro"
guide: google-play-approval
price: 12
compare_at: 24
pillar: ai
sub: building
tagline: "The reviewer's forty-item checklist with the policy behind each item, the console walkthrough of every form, the account deletion requirement done right, the permissions and data safety rules, and the response templates."
includes:
  - "The readiness prompt: paste it into Claude with a description of your app and it scores you against every item before you touch the console"
  - "The reviewer's checklist: forty items with the policy each one comes from"
  - "The console walkthrough: every form in order, with the answer that matches your app"
  - "Account deletion done right: in the app and the web request link"
  - "Permissions, data safety, and target audience declared to match the build"
  - "Return response templates and the resubmission plan"
---

# Google Play Approval, Pro

## Start here: the readiness prompt

Paste everything below into Claude with a plain description of your Android app. It scores you against the checklist and tells you what to get right before you touch the console. The App Review Auditor agent runs the same checklist against your actual project and declarations.

```
You are scoring an Android app for Google Play review readiness. Read CONTEXT, then THE CHECKLIST, then produce THE SCORECARD. Use only what I tell you; mark anything you cannot tell as UNKNOWN with what to check. Explain what each failing item means and why the policy exists. Do not give implementation steps.

CONTEXT
- What the app does and for whom: [ ]
- What people buy inside it, and whether it is digital or physical or an outside service: [ ]
- How people pay today: [ ]
- Accounts: create, delete in the app, web deletion link declared: [ ]
- Data collected and shared, and why: [ ]
- Permissions requested: [ ]
- User content: post, message, share, profiles: [ ]
- Audience: could children use it; ads present: [ ]
- Testing: has a closed test run with real testers; is the developer account new: [ ]
- Target API level, crashes known, placeholder screens, links: [ ]
- Screenshots: from which build; any paid features shown: [ ]
- Review credentials in the console: [ ]

THE CHECKLIST (forty items, grouped)
Money: digital goods through Play Billing; physical goods and outside services may use other payment; subscription terms and price shown before purchase; restore and manage subscriptions reachable; no misleading free trials.
Accounts and data: account deletion inside the app; a web link to request deletion declared in the console; the data safety form matches what the app collects and shares; privacy policy linked in the console and in the app; data collected only for stated purposes.
Permissions: every sensitive permission has a visible reason at the moment of need; declaration forms filed for restricted permissions; no requesting permissions the core function does not need.
Completeness and testing: closed testing completed if the account requires it; review credentials in app access and working; no crashes on launch or main paths; no coming soon or placeholder screens; every link resolves; target API level current; app does what the listing says.
Listing: screenshots from the current build; features shown exist; paid features marked; no misleading claims; content rating questionnaire answered for the shipped app; target audience declared correctly; ads declared if present.
Content and users: report, block, moderation, and contact if there is user content; content within the rating; families policy met if children could be an audience; no deceptive behavior or hidden functionality.

THE SCORECARD
For every item: PASS, FAIL, or UNKNOWN, with one line. Then: the items most likely to return the app, in order; what each policy protects; the three declarations to get right first. End with a readiness score out of forty.
```

## 1. The forms are the review

Play checks the data safety form, the content rating, the target audience, the permissions declarations, and your testing status before a person opens the build. A form that does not match the app is treated as a false statement to users. Fill each one in for the app you shipped, then check it again against the build.

## 2. Account deletion, both places

Inside the app: a path a person can find that actually deletes. On the web: a link where someone who uninstalled can request deletion, declared in the console. Both are required when accounts exist.

## 3. Permissions and data safety

Each sensitive permission is requested at the moment the feature needs it, with a reason on screen. Restricted permissions need a declaration. The data safety form lists everything collected and shared, including by the analytics and advertising libraries you added, because those count as you.

## 4. Testing and credentials

New personal accounts must run a closed test with real testers for a period before production. Put review credentials in the app access section and check that they work the day you submit.

## 5. The listing

Screenshots from this build. Features that exist. Paid features marked. A content rating answered for what shipped. Target audience declared honestly, and the families policy applied if children could be there.

## 6. When it comes back

Read the policy named. Fix exactly that. Update the declaration if the declaration was the problem. Reply through the console with what changed. Repeat returns for the same policy risk the account, so the second submission has to be right.

```
RETURN REPLY. Here is the Play policy notice. Write my appeal or resubmission note in under 120 words: the policy named, what I changed in the app and in the declarations, and where a reviewer can verify it. NOTICE: [paste]  WHAT I CHANGED: [paste]
```
