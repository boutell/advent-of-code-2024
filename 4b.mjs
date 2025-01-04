import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import Grid, { diagonalDirections, GridBoundsError } from './lib/grid.mjs';

const grid = new Grid(readLines({ split: '' }));
let count = 0;

for (const cell of grid.cells()) {
  if (cell.value === 'A') {
    let inDirs = 0;
    for (const [ xd, yd ] of diagonalDirections) {
      try {
        if (grid.matches(cell.x + xd, cell.y + yd, -xd, -yd, 'MAS')) {
          inDirs++;
        }
      } catch (e) {
        if (e instanceof GridBoundsError) {
          continue;
        }
        throw e;
      }
    }
    if (inDirs === 2) {
      count++;
    }
  }
}

log(count);
