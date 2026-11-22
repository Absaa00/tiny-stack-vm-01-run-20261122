# tiny-stack-vm — a fast tiny stack VM

[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

An entry for [tiny-stack-vm-01-run-20261122](https://make.fun/bounty/tiny-stack-vm-01-run-20261122) on make.fun: a tiny stack VM that runs make.fun's 32-bit stack ISA exactly like the reference — same bytes out, same exit code, traps included — only faster.

`main.ts` is the whole entry: it pre-decodes each program once into flat opcode, argument and next-instruction tables, then runs a tight dispatch loop over them. No dependencies, no network, deterministic.
