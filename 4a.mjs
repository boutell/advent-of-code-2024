import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import Grid, { allDirections } from './lib/grid.mjs';

const grid = new Grid(log(readLines({ split: '' })));
const target = 'XMAS';
let count = 0;

for (const cell of grid.cells()) {
  if (cell.value === target.charAt(0)) {
    for (const direction of allDirections) {
      let i = 1;
      let good = true;
      for (const peer of cell.walkFrom(...direction)) {
        if (peer.value !== target.charAt(i)) {
          good = false;
          break;
        }
        i++;
        if (i === target.length) {
          break;
        }
      }
      if (i !== target.length) {
        // Off the edge of the grid
        good = false;
      }
      if (good) {
        count++;
      }
    }
  }
}

log(count);
