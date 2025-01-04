import { readFileSync } from 'fs';

export default function({ nonempty = true, split = false, integers = false } = {}) {
  const input = readFileSync('/dev/stdin', 'utf8');
  const lines = input.split('\n').filter(line => nonempty ? (line.length > 0) : true);
  if (split) {
    return lines.map(line => line.split((split === true) ? /\s+/ : split).map(transform));
  }
  return lines.map(transform);
  function transform(v) {
    if (integers) {
      return parseInt(v);
    }
    return v;
  }
}

