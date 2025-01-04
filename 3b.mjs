import { readFileSync } from 'fs';
import log from './lib/log.mjs';

const input = readFileSync('/dev/stdin', { encoding: 'utf8' });
const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g);
let enabled = true;
let sum = 0;
for (const v of matches) {
  if (v[0].startsWith('mul')) {
    if (enabled) {
      sum += parseInt(v[1]) * parseInt(v[2]);
    }
  } else if (v[0].startsWith("don't")) {
    enabled = false;
  } else if (v[0].startsWith('do')) {
    enabled = true;
  } else {
    throw new Error(`Unexpected: ${v[0]}`);
  }
}
log(sum);
