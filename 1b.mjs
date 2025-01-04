import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';

const lines = readLines();

const pairs = lines.map(line => line.split(/\s+/)).map(pair => pair.map(v => parseInt(v)));
const left = pairs.map(pair => pair[0]);
const right = pairs.map(pair => pair[1]);
left.sort();
right.sort();

let sum = 0;
let j = 0;
let last = -1;
let lastIndex = -1;
for (let i = 0; (i < left.length); i++) {
  if (left[i] === last) {
    j = lastIndex;
  }
  last = left[i];
  lastIndex = j;
  while ((j < right.length) && (right[j] < left[i])) {
    j++;
  }
  let count = 0;
  while (left[i] === right[j]) {
    count++;
    j++;
  }
  sum += left[i] * count;
}
log(sum);
