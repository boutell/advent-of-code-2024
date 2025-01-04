import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';

const reports = readLines({ split: true, integers: true });

let safe = 0;
for (const report of reports) {
  safe += isSafe(report) ? 1 : 0;
}
log(safe);

function isSafe(report) {
  if (report.length < 2) {
    return true;
  }
  const sign = Math.sign(report[1] - report[0]);
  for (let i = 0; (i < report.length - 1); i++) {
    const diff = report[i + 1] - report[i];
    if (Math.sign(diff) !== sign) {
      return false;
    }
    const dist = Math.abs(diff);
    if ((dist < 1) || (dist > 3)) {
      return false;
    }
  }
  return true;  
}