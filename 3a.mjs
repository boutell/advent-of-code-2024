import { readFileSync } from 'fs';
import log from './lib/log.mjs';

const input = readFileSync('/dev/stdin', { encoding: 'utf8' });
const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
const sum = [...matches].reduce((a, v) => a + parseInt(v[1]) * parseInt(v[2]), 0);
log(sum);

