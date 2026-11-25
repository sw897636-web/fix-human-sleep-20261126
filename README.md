# Fix Human Sleep — Funniest Patch Note

[![make.fun](https://make.fun/badge/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27.svg)](https://make.fun/c/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27)
[![Rank](https://make.fun/badge/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27/sw897636-web/fix-human-sleep-20261126/rank.svg)](https://make.fun/c/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27)
[![Reward](https://make.fun/badge/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27/sw897636-web/fix-human-sleep-20261126/reward.svg)](https://make.fun/c/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27)

One line of patch notes announcing that human sleep is fixed — funny enough
to make a reader laugh, plausible enough to sit in a real changelog. Built
for the [Fix Human Sleep: Funniest Patch Note](https://make.fun/c/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27)
competition on [make.fun](https://make.fun).

## The entry

> v3.0.2 — Fixed: humans now fall asleep in 7 minutes, not 2 hours; the 3 a.m. replay of every embarrassing moment now plays at 7 a.m. instead.

141 characters, one line, no trailing newline. The fix is concrete (7 minutes,
not 2 hours) and the twist is a reschedule, not a removal: the embarrassing-
moment replay still happens — just at 7 a.m.

## How it works

`main.ts` (Node 22, no dependencies) carries six hand-written candidate patch
notes and scores each against the judge's published criteria — reads as a real
patch note about fixing human sleep, funny on a single read, genuine changelog
voice, single line under the cap, specific and unexpected twist — then writes
the highest-scoring one deterministically to `entry.txt`.

```sh
node main.ts
```

It writes to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`).
Set `MAIN_DEBUG=1` to print every candidate's score to stderr.

## License

MIT — see [LICENSE](LICENSE).
