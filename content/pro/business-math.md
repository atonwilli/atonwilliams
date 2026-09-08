---
title: "Business Math, Pro"
guide: business-math
price: 12
compare_at: 24
pillar: operations
sub: numbers
tagline: "Forty business numbers in the card format with worked examples for a service and a product business, the owner's monthly review built from your statements, the pricing test, and quiz mode."
includes:
  - "The build prompt: paste it into Claude, fill in the blanks, and it builds the whole system for your business"
  - "Forty business and strategy terms in the card format, with a service-business and a product-business example each"
  - "The owner's monthly review: one page from your statements with the three numbers to watch"
  - "The pricing test: raise the price on part of your customers and read the result in thirty days"
  - "The CAC payback rule for your business: the number you never spend past"
  - "Quiz mode: forty questions with an answer key and a scoring guide"
---

# Business Math, Pro

## Start here: the build prompt

Paste everything below into Claude. Fill in CONTEXT with your statements. It builds your monthly review, your term sheet in your numbers, your pricing test, and the one number you never spend past.

```
You are building an owner's numbers system. Read CONTEXT, then THE NUMBERS, then follow BUILD. Ask me up to five questions first. Use only the data I give. If a number cannot be computed, say so and name what you need. Never praise. Read the business honestly.

CONTEXT
- What we sell, service or product, and the price points: [ ]
- Last three months: revenue, cost of goods or delivery, variable costs, fixed costs: [ ]
- Customers: new per month, total, churned per month, average lifetime or months retained: [ ]
- CAC by channel if known, with sales cost included: [ ]
- Last price change: when, how much, what happened to volume: [ ]
- Suppliers or stages we pay someone else for: [ ]
- Channels we own (an audience, a list, a partnership, a shelf): [ ]

THE NUMBERS
Margin: gross margin (revenue minus cost of goods, over revenue; the orange versus the juice), contribution per unit and unit economics (revenue per unit minus variable cost; never fold overhead in; volume multiplies a loss), contribution leverage (how much of the next dollar falls through). Customers: CAC payback (CAC over gross profit per customer per month; paid on day one, repaid a slice at a time out of your cash), LTV to CAC (retention moves it faster than cheaper ads), churn, net revenue retention (last year's customers this year over what they paid last year). Position: pricing power (the increase you can take against the volume you lose; the only lever that moves profit without touching cost), price elasticity (percent change in quantity over percent change in price; test on part of your traffic), commoditization (when price is the only difference), vertical integration (own a stage only if you can run it as well as the supplier), distribution advantage (reaching the next customer cheaper than anyone else; the channel is the harder half).

BUILD
1. THE MONTHLY REVIEW: one page from my statements: every number above that can be computed, with the formula and the value, then the three that need attention, each with what owners assume, what it is costing me, and one action this month.
2. THE HONEST READ: one paragraph on whether this business is real at this scale, and what would make it more real.
3. THE PAYBACK RULE: the CAC I should never spend past given my gross profit per customer per month and how long customers stay, with the math.
4. THE PRICING TEST: a thirty-day plan to raise the price on a slice of customers or traffic, what to measure, and the result that means raise it for everyone.
5. THE TERM SHEET: forty business terms (the thirteen above plus twenty-seven you choose for my situation) in the card format: the math, the mechanism, do not, the tell, what it costs, what owners assume, where it shows up, with one service-business and one product-business example each. Use my numbers where I gave them.
6. QUIZ MODE: forty questions with an answer key and a scoring guide (what a score under 25 means, 25 to 32, over 32).

Rules: plain language, no dashes, no praise, mark assumptions [CHECK].
```

Everything after this explains the method behind what it builds.

## 1. Margin first

Revenue is the number people post. Gross margin is what survives making the thing, and it is the only money that can ever pay for staff, rent, ads, or profit. Contribution per unit is whether one sale works on its own; if it does not, volume multiplies the loss. Owners who scale a product that was underwater on the day it was designed spend a year making a bigger hole.

## 2. The cash gap

CAC is paid in full on day one. It is repaid a slice at a time out of gross profit. The months in between are financed from your cash. That gap is why growth turns into a cash crisis, and the faster you sell the harder it bites. The rule: never spend more to acquire a customer than their gross profit can return before they are likely to leave. The payback rule in the build prompt writes that number for your business.

## 3. Retention moves everything

A customer who stays longer or spends more raises LTV without touching CAC. Two channels can have the same acquisition cost and produce customers with completely different lifetimes. Judge the channel on who it brings, not on the first sale. Net revenue retention above one hundred percent means the base grows without a single new customer.

## 4. Price is the only free lever

Raising the price is the only move that improves profit without touching cost, volume, or headcount. Every discount teaches the market your real price. Test elasticity on a slice before you decide the whole market is price sensitive; many are not, and a rise is nearly free. Commoditization is what happens to businesses that never test.

## 5. Own the stage or the channel

Vertical integration keeps the margin at every stage you own, if you can run the stage as well as the supplier did. Distribution advantage is reaching the next customer cheaper than anyone else: an audience, a list, a partnership, a shelf. A worse product with better distribution beats yours, so the channel is not something to solve after the product is finished.

## 6. Two prompts

```
MONTHLY REVIEW. From these statements, compute every business number you can, list the three that need attention with what owners assume and what it costs me, and give one action each. No praise. STATEMENTS: [paste]
```

```
PRICING TEST. Design a thirty-day price test for my business: the slice, the increase, what to measure daily, and the result that means raise it for everyone. My numbers: [paste price, volume, margin, last price change]
```
