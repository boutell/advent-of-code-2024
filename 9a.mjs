import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import { swap } from './lib/array.mjs';

const lines = readLines({ split: '', integers: true });

const input = lines[0];

const sectors = [];

let index = 0;
for (let i = 0; (i < input.length); i++) {
  const v = input[i];
  const s = (!(i % 2)) ? (index++) : '.';
  for (let j = 0; (j < v); j++) {
    sectors.push(s);
  }
}

while (true) {
  const firstFree = sectors.findIndex(v => v === '.');
  const lastFull = sectors.findLastIndex(v => v !== '.');
  if (firstFree === -1) {
    break;
  }
  if (lastFull === -1) {
    throw new Error('not anticipated');
  }
  if (firstFree > lastFull) {
    break;
  }
  swap(sectors, firstFree, lastFull);
}

let checksum = 0;
for (let i = 0; (i < sectors.length); i++) {
  const v = sectors[i];
  if (v !== '.') {
    checksum += v * i;
  }
}

log(checksum);
