import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';

const lines = readLines();

const pairs = lines.map(line => line.split(/\s+/)).map(pair => pair.map(v => parseInt(v)));
const left = pairs.map(pair => pair[0]);
const right = pairs.map(pair => pair[1]);
left.sort();
right.sort();
let sum = 0;
for (let i = 0; (i < left.length); i++) {
  sum += Math.abs(right[i] - left[i]);
}
log(sum);
