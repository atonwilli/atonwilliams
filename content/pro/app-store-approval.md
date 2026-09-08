---
title: "App Store Approval, Pro"
guide: app-store-approval
price: 29
compare_at: 58
pillar: ai
sub: building
tagline: "The reviewer's forty-item checklist with the guideline behind each item, the payment decision tree, the review-notes template, the screenshot rules, and the response templates for when something comes back."
includes:
  - "The readiness prompt: paste it into Claude with a description of your app and it scores you against every item before you submit"
  - "The reviewer's checklist: forty items with the guideline each one comes from"
  - "The payment decision tree: in-app purchase or not, with the edge cases"
  - "The review-notes template, the demo-account rules, and what to write when a feature needs context"
  - "The screenshot and metadata rules, with the disclosure line for paid features"
  - "Rejection response templates and the resubmission plan"
---

# App Store Approval, Pro

## Start here: the readiness prompt

Paste everything below into Claude with a plain description of your app. It scores you against the checklist and tells you what to fix before you submit. It does not fix anything; the App Review Auditor agent does that against your actual project.

```
You are scoring an iOS app for App Store review readiness. Read CONTEXT, then THE CHECKLIST, then produce THE SCORECARD. Use only what I tell you. Where you cannot tell from my description, mark the item UNKNOWN and tell me what to check. Explain what each failing item means and why the rule exists. Do not give implementation steps.

CONTEXT
- What the app does and for whom: [ ]
- What people buy inside it, if anything, and whether it is digital (used in the app) or physical or a service used outside the app: [ ]
- How people pay today (in-app purchase, a card form, a web checkout, nothing): [ ]
- Accounts: can people create one, delete one inside the app, sign in with a third party: [ ]
- User content: can people post, message, share, or see each other: [ ]
- Devices: iPhone only, or iPad too; portrait only or both: [ ]
- What is unfinished, placeholder, or coming soon: [ ]
- Screenshots: from which build, and do any show paid features: [ ]
- Links in the app and listing (privacy policy, support, terms): [ ]
- Demo account for review: exists, works, in the review notes: [ ]

THE CHECKLIST (forty items, grouped)
Money: digital purchases use in-app purchase; physical goods and outside services may use a card or web checkout; no links or buttons that steer digital purchases outside the app except where Apple's current rules allow; restore purchases works for anything that persists; subscription terms, price, and renewal shown before purchase; free trial terms clear; no purchase required to see what the app does.
Accounts: Sign in with Apple (or an equivalent that limits data) offered whenever a third-party social login is offered; account deletion inside the app, not by email; accounts not required for features that do not need them; privacy policy linked in app and listing; data collection matches the privacy labels.
Completeness: demo credentials in review notes and working; no crashes on launch or common paths; no coming soon, placeholder, or empty screens; every link resolves; the app is more than a web page in a frame; permissions requested with a clear reason at the moment of need; no references to other platforms' pricing or stores.
iPad and design: installs and runs on iPad if universal; layouts hold in both orientations if both are supported; text and buttons not cut off; no stretched iPhone UI; iPad screenshots are real iPad screenshots.
Metadata: screenshots from the current build; every feature shown exists; paid features shown are marked as paid; description does not promise features that do not exist; app name and subtitle not keyword stuffed; age rating matches content; support URL and marketing URL resolve.
Safety: report content, block users, and a way to contact you if there is any user-generated content; no content the rating does not allow; no hidden features or functionality that changes after review; health, finance, and kids categories meet their extra rules.

THE SCORECARD
For every item: PASS, FAIL, or UNKNOWN, with one line. Then: the items most likely to send the app back, in order; what each rule protects; and the three questions to answer before submitting. End with a readiness score out of forty.
```

## 1. The payment decision tree

Is the thing they buy used inside the app? If yes, it is digital, and it goes through in-app purchase. If it is a physical good or a service delivered outside the app (a haircut, a delivery, a consultation), a card form or web checkout is allowed. Mixed products: split them. Credits used in the app are digital. A subscription to content in the app is digital. A membership to something in the real world is not. When in doubt, the reviewer will decide it is digital, so decide first.

## 2. Accounts

Third-party sign-in requires an equivalent option that limits data, and Sign in with Apple is the accepted one. Account deletion is inside the app, in a place a person can find, and it actually deletes. If deletion needs a waiting period for legal reasons, say so on the screen. Do not require an account to browse what the app does.

## 3. The review notes

Reviewers read the notes. Write them like a colleague's handoff: the demo credentials, what the app does in three lines, where the features that need explanation are and why they exist, what hardware or account state is needed to see them, and what changed since the last submission. A good note prevents most returns before they happen.

## 4. Screenshots and metadata

Screenshots come from the build you are submitting. Every feature shown exists in that build. If a screenshot shows something behind a purchase, the screenshot or the listing says so. iPad screenshots are taken on an iPad. The description describes the app, not the roadmap.

## 5. iPad

If the app installs on iPad, the reviewer opens it on iPad. Every screen. Both orientations if you support both. If you only support iPhone, say so in the project settings so the reviewer never opens it on an iPad.

## 6. User content

Report, block, contact. If people can post, message, or see each other, those three exist and are easy to find. Reports go somewhere a person reads.

## 7. When it comes back

Read the rejection twice. It names the guideline. Fix exactly that, and anything you now notice nearby. Reply in the resolution center with what changed, in three lines, and resubmit. If you believe the reviewer is wrong, appeal once with the guideline text and your reasoning, calmly. Most returns clear on the second submission when the reply is specific.

```
REJECTION REPLY. Here is the rejection message. Write my resolution-center reply in under 120 words: what the reviewer flagged, what I changed, where they can see it, and the demo steps. No argument, no apology, just the fix. REJECTION: [paste]  WHAT I CHANGED: [paste]
```
