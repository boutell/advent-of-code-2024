import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';

const lines = readLines();

let sum = 0;

for (const line of lines) {
  const [ resultString, valuesString ] = line.split(':').map(val => val.trim());
  const result = parseInt(resultString);
  const values = valuesString.split(' ').map(v => parseInt(v));
  if (solvable(result, values[0], values.slice(1))) {
    sum += result;
  }
}
log(sum);

function solvable(result, current, values) {
  const value = values[0];
  const rest = values.slice(1);
  const sum = current + value;
  const product = current * value;
  if (rest.length === 0) {
    return (sum === result) || (product === result);
  }
  if ((sum > result) && (product > result)) {
    return false;
  }
  return solvable(result, current + value, rest) || solvable(result, current * value, rest);
}
