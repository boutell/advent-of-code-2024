import { readFileSync } from 'fs';

export default function({ nonempty = true } = {}) {
  const input = readFileSync('/dev/stdin', 'utf8');
  const lines = input.split('\n').filter(line => nonempty ? (line.length > 0) : true);
  return lines;
}
