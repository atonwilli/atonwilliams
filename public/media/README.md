# Hero motion clip

Drop the approved hero loop here as `hero-loop.mp4`. The home page looks for this exact file. Until it exists, the original still portrait shows and nothing else changes. Reduced-motion visitors always get the still.

| Spec | Value |
|---|---|
| Source | Original footage of Aton only. No generated or retouched likeness. |
| Length | 8 to 12 seconds, cut to loop cleanly |
| Frame | 4:5 portrait or square, subject centered in the top half so the arch crop keeps the face |
| Audio | None. The player is muted. |
| Encode | H.264 MP4, 1080 wide, under 4 MB, `-movflags +faststart` |
| Poster | The page uses `aton.jpg` as the poster automatically |

## Footage already on Google Drive (found September 6, 2026)

Real footage exists. These are the candidates, in order of fit for a muted hero loop:

| Source | Drive file | Why |
|---|---|---|
| Award feature, "Everything is Bigger in Texas" Rising Star 2024 | `leaders___aton_williams_-_employee_vs_entrepreneur__financial_literacy...mp4` (owner jillmegarry@gmail.com) | Produced, lit, B-roll of Aton in the room. Best chance of a walking or working shot. |
| Award feature, equal opportunity and company culture | `ae___aton_williams_-_equal_opportunity___company_culture_v1 (1080p).mp4` | Same shoot, second cut. |
| Drone and event footage, June 16 | `DJI_20260616105614_0082_D.MP4` (owner hello@influenceoptimizer.com) | Establishing footage. Not a face shot, but good for the Front Page Intelligence or proof sections. |
| Reese's July shoots | `vid4.MP4`, `vid6.MP4`, `Q & A 07.22.MP4` (owner reeseg5@gmail.com) | Raw phone footage of Aton at work. Check for a clean 10-second walk-in or look-up. |
| Training series, 22 parts, August 1 | `01 — FOUNDATIONAL SYSTEMS (Intro).mov` through `22 — GUMBALL THEORY.mov` | Talking head. Not for the hero, but the "Watch" section can link these once they are published. |
| VSL, cleaned v1 | `aton vsl cleaned up v1.mp4` (also in Downloads) | Talking head, screen share. Not for the hero. |

Rob and Reese hold the rest of the content folder. Ask for it before shooting anything new.

## Cutting the loop

No video tooling is installed on this machine yet. Once ffmpeg is available:

```bash
ffmpeg -ss 00:00:12 -i source.mp4 -t 10 -an -vf "crop=ih*4/5:ih,scale=1080:-2" -c:v libx264 -crf 24 -preset slow -movflags +faststart hero-loop.mp4
```

Adjust `-ss` to the start of the chosen shot.

## If a photo-based motion pass is made instead (Higgsfield or similar)

Aton's rule stands: never regenerate or retouch his face or body. A tool pass is acceptable only as a camera move or background treatment over the original still, with his pixels untouched. Brief for the operator:

- Source: `aton.jpg`, the armchair portrait, full resolution.
- Motion: slow push-in, about 4 percent over 10 seconds, plus a subtle parallax on the staircase and window behind him. No change to face, hands, clothing or pose.
- Loop: ease in and out so the cut back to frame one is invisible.
- Output: 4:5, 1080 wide, MP4, no audio.
- Review: compare frame one and the last frame against the original at 200 percent. Any drift in the face means the pass is rejected.

Any subscription for this comes out of the $200 a month content ceiling and needs Aton's sign-off before purchase.
