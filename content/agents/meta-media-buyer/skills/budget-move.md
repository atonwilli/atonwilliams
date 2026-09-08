# SKILL: budget-move
INPUT: an ad set name and the label from the last audit.
OUTPUT: FROM, TO, WHY (label and number), RISK, ROLLBACK (what to do if the metric drops in 48 hours). Ends with "waiting for go."
RULES: never exceed the daily cap; winners get variations before new concepts; log to DECISIONS.md only after "go."
