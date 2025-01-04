import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import { swap } from './lib/array.mjs';

const lines = readLines();

const rules = [];
const updates = [];

for (const line of lines) {
  if (line.includes('|')) {
    rules.push(line.split('|').map(s => parseInt(s)));
  } else if (line.includes(',')) {
    updates.push(line.split(',').map(s => parseInt(s)));
  } else {
    throw new Error(`Unexpected line: ${line}`);
  }
}

let sum = 0;
for (const update of updates) {
  let good;
  let fixed = false;
  do {
    good = true;
    for (const [before, after] of rules) {
      const beforeIndex = update.indexOf(before);
      if (beforeIndex === -1) {
        continue;
      }
      const afterIndex = update.indexOf(after);
      if (afterIndex === -1) {
        continue;
      }
      if (beforeIndex > afterIndex) {
        swap(update, beforeIndex, afterIndex);
        good = false;
        fixed = true;
      }
    }
  } while (!good);
  if (fixed) {
    sum += update[Math.floor(update.length / 2)];
  }
}
log(sum);
