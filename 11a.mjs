import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import { swap } from './lib/array.mjs';

const lines = readLines({ split: true, integers: true });

let input = lines[0];

// If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
// If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
// If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

for (let i = 0; (i < 25); i++) {
  const next = [];
  for (const val of input) {
    if (val === 0) {
      next.push(1);
      continue;
    }
    const s = val.toString();
    if (!(s.length % 2)) {
      const half = s.length / 2;
      const left = parseInt(s.substring(0, half));
      const right = parseInt(s.substring(half, s.length));
      next.push(left, right);
      continue;
    }
    next.push(val * 2024);
  }
  input = next;
}

log(input.length);
