---
title: "Marketing Math, Pro"
guide: marketing-math
price: 12
compare_at: 24
pillar: operations
sub: numbers
tagline: "Forty marketing numbers in the card format, the fifteen-minute owner's ad audit, the agency-honesty test, a weekly one-page read built from your exports, and quiz mode."
includes:
  - "The build prompt: paste it into Claude, fill in the blanks, and it builds the whole system for your business"
  - "Forty marketing terms, each with the math, the mechanism, do not, the tell, what it costs, where it shows up"
  - "The fifteen-minute ad audit an owner can run without logging into Ads Manager"
  - "The agency-honesty test: ten questions and the answers that should worry you"
  - "The weekly one-page read, generated from your exports"
  - "Quiz mode: forty questions, three levels, answer key"
---

# Marketing Math, Pro

## Start here: the build prompt

Paste everything below into Claude. Fill in CONTEXT and paste an export. It builds your weekly read, your audit, your agency questions, and the term sheet in your numbers.

```
You are building a marketing numbers system for an owner who does not run the ads personally but needs to know whether they are working. Read CONTEXT, then THE NUMBERS, then follow BUILD. Ask me up to five questions first. Use only the data I give. If a number cannot be computed, say so and name the column needed.

CONTEXT
- What we sell, the value of a customer, and how long they stay: [ ]
- Who runs our ads (me, an employee, an agency) and what they report today: [ ]
- Platforms and monthly spend: [ ]
- The optimization event per campaign and the attribution window in use: [ ]
- Our funnel stages and any rates we track (apply, book, show, close): [ ]
- An export from the ad platform (paste or describe columns): [ ]
- Our sales numbers for the same period, from our own records: [ ]

THE NUMBERS
Cost: ROAS (revenue from ads over spend; never call above 1.0 profitable), CAC (ad spend plus sales cost over new customers; the whole cost, not just the ads), CPM, CPC (the first number reflecting a viewer's decision; a cheap click next to an expensive result means the page is the problem), CPR (per optimization event; never compare across different events; rising cost with falling volume is the earliest honest sign of tiring). Counting: attribution windows (a counting rule about time, not a claim of cause; the ledger you keep is the scoreboard), conversions API and match rate (server-sent events; never send the same conversion from browser and server without a shared identifier), schedule events (booked calls sent back; optimize for the booked call, not the application), media mix modeling (measure a channel by what happens when you move its spend; never on one month). Creative: fatigue (cost rising and volume falling together; duplicate with nothing changed and give it three days before blaming the creative), diversity (distinct concepts over active ads; edits are not concepts), frequency capping (impressions over reach; a dosage, not a punishment). Funnel: clicks x apply x book x show x close; fix the stage losing the most people, not the cheapest; back-end selling systems are what make the front-end math work.

BUILD
1. THE WEEKLY READ from my export: the cost numbers, the tells (yes or no with the numbers), creative diversity, the funnel with the stage losing the most, and the one fix.
2. THE FIFTEEN-MINUTE AUDIT: a checklist I can run every Monday from the report my ad person sends, with the number to look at and the question to ask for each item.
3. THE AGENCY-HONESTY TEST: ten questions to ask whoever runs my ads, the answer that is fine, and the answer that should worry me.
4. THE TERM SHEET: forty marketing terms (the fifteen above plus twenty-five more you choose for my situation) in the card format: the math, the mechanism, do not, the tell, what it costs, what owners assume, where it shows up. Use my numbers in the examples wherever I gave them.
5. MY LEDGER: the columns of the sales ledger I should keep myself so the platform count is a delivery signal and my ledger is the scoreboard.
6. QUIZ MODE: forty questions in three levels with an answer key.

Rules: plain language, no jargon without a one-line definition, no dashes, mark assumptions [CHECK].
```

Everything after this explains the method behind what it builds.

## 1. The card format

Every term is taught the same way, because the format is what makes forty of them stick. The math: the formula and a worked number. The mechanism: what it actually measures. Do not: the mistake owners make. The tell: the pattern that means something is wrong. What it costs: the price of getting it wrong. What owners assume: the belief that causes the mistake. Where it shows up: the report, the screen, or the moment.

## 2. The fifteen core terms, short

ROAS is a ratio, not a profit. CAC is the whole cost, not the ad cost. CPM is the auction price that week. CPC is the first chosen number. CPR changes meaning when the event changes. Attribution windows count, they do not explain. Conversions API sends the sale from your server; match rate says how many events found a person. Schedule events tell the platform which clicks became real appointments. Media mix modeling reads a channel by moving its spend. Creative fatigue needs two numbers moving together. Creative diversity counts reasons to buy, not edits. Frequency capping is a dose you choose. Full funnel metrics multiply. Back-end systems are why any of it pays. LTV is what makes CAC a decision.

## 3. The fifteen-minute audit

Open last week's report. Check five things: did cost per result rise while results fell (tiring), did any campaign's optimization event change (a meaning change), did events sent match bookings made (reporting), is the same three-concept problem hiding behind twelve ads (diversity), and which funnel stage lost the most people. Ask one question about each. Fifteen minutes, every Monday, and nobody can tell you a story the numbers do not support.

## 4. The agency-honesty test

Ten questions. What optimization event is each campaign on and why. What attribution window are we on, and what does our own ledger say. How many distinct concepts are live. What is the match rate. Which stage of the funnel lost the most people last week. What did you kill and why. What did you duplicate before you called it fatigued. What is our CAC with sales cost included. What is our CAC payback. What would you do with twenty percent less budget. A good operator answers in numbers. A worrying one answers in adjectives.

## 5. Two prompts

```
WEEKLY READ. From this export and these sales numbers, produce the one-page read: cost numbers, tells, diversity, funnel, one fix. Say which file and date range you used. Never estimate a missing metric. EXPORT: [paste]  SALES: [paste]
```

```
REPORT TRANSLATOR. Here is the report my ad person sent. Translate every claim into a number I can check, list what is missing, and write the three questions to send back. REPORT: [paste]
```
