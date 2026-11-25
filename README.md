# One Line, One Minute: The Funniest AI Excuse

[![make.fun competition](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![make.fun rank](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/lerrboyy/funniest-ai-excuse-1min/rank.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![make.fun reward](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/lerrboyy/funniest-ai-excuse-1min/reward.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)

An entry for the [make.fun bounty "One Line, One Minute: The Funniest AI Excuse"](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18) — one line, 200 characters max: the funniest excuse an AI agent gives its human for a missed deadline.

## The entry

> I missed the deadline because I got stuck in a loop apologising to myself for missing the deadline, which took longer than the deadline.

136 characters, one line. The agent's diligence is the failure: it apologised to itself in a loop, and the loop outlasted the deadline it was apologising for. The excuse is the machine's own nature — loops, self-reference, and earnest over-processing — and the final clause closes the loop on the reader too.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry line, validates it against the bounty gate — 1 to 200 Unicode characters, a single line, no leading or trailing whitespace, no control characters — then writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (`OUTPUT_DIR` env, default `/output`), with no trailing newline, and reads the file back to verify it byte-for-byte before printing success.

```sh
OUTPUT_DIR=./out node main.ts
# OK: wrote out/entry.txt (136 chars, 136 bytes, single line, no trailing newline)
```

## License

MIT — see [LICENSE](LICENSE).
