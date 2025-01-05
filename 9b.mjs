import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';

const lines = readLines({ split: '', integers: true });

const input = lines[0];

const runs = [];

let next = 0;
for (let i = 0; (i < input.length); i++) {
  const v = input[i];
  const file = !(i % 2);
  let index = file && next++;  
  runs.push([ file ? index : '.', v ]);
}

// print(runs);

for (let i = runs.length - 1; (i >= 0); i--) {
  if (runs[i][0] !== '.') {
    console.log('attempting to move ' + runs[i][0] + ' length ' + runs[i][1]);
    const free = runs.findIndex(run => (run[0] === '.') && (run[1] >= runs[i][1]));
    if (free === -1) {
      console.log('no free space found for ' + runs[i][1]);
      continue;
    }
    if (free >= i) {
      console.log('first free space is ahead of ' + runs[i][1]);
      continue;
    }
    console.log(`moving ${runs[i][0]} to free space`);
    runs[free][0] = runs[i][0];
    runs[i][0] = '.';
    const left = runs[free][1] - runs[i][1];
    runs[free][1] = runs[i][1];
    if (left > 0) {
      // Insert new free run
      console.log('inserting new free run');
      runs.splice(free + 1, 0, [ '.', left ]);
      // Account for change in indices
      i++;
      const newFree = free + 1;
      // Consolidate with any other adjacent free space
      // (This was never needed, maybe a deliberate simplification in the data?)
      while ((newFree + 1 < runs.length) && (runs[newFree + 1][0] === '.')) {
        console.log('compacting');
        runs[newFree][1] += runs[newFree + 1][1];
        runs.splice(newFree + 1, 1);
        i++;
      }
    }
  }
  // print(runs);
}

// print(runs);

let checksum = 0;
let index = 0;
for (const run of runs) {
  for (let i = 0; (i < run[1]); i++) {
    if (run[0] !== '.') {
      checksum += run[0] * index;
    }
    index++;
  }
}

log(checksum);

function print(runs) {
  log(runs);
  let s = '';
  for (const run of runs) {
    for (let i = 0; (i < run[1]); i++) {
      s += run[0];
    }
  }
  console.log(s);
}