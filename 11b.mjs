import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import memoize from './lib/memoize.mjs';

const lines = readLines({ split: true, integers: true });

let input = lines[0];

// If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
// If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
// If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

const seen = new Set();

// numbers do not interact with their peers.
// so if I've seen what "1" does for 10 generations,
// I can substitute that, or even the count for that.

const simulate = memoize(simulateBody);

let sum = 0;
for (const val of input) {
  sum += simulate(val, 75);
}
log(sum);

function simulateBody(val, generations) {
  if (val === 0) {
    return next(1);
  }
  const s = val.toString();
  if (!(s.length % 2)) {
    const half = s.length / 2;
    const left = parseInt(s.substring(0, half));
    const right = parseInt(s.substring(half, s.length));
    return next(left) + next(right);
  }
  return next(val * 2024);
  function next(val) {
    if (generations === 1) {
      return 1;
    }
    return simulate(val, generations - 1);
  }
}
