import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import Grid from './lib/grid.mjs';

const grid = new Grid(readLines({ split: '', integers: true, inObjects: true }));

let score = 0;
for (const cell of grid.cells()) {
  if (cell.value.value === 0) {
    const testGrid = grid.clone();
    testGrid.getValue(cell.x, cell.y).d = 0;
    testGrid.shortestPath((value, neighborValue) => {
      return value.value === (neighborValue.value + 1);
    });
    for (const cell of testGrid.cells()) {
      if ((cell.value.d !== undefined) && (cell.value.value === 9)) {
        score++;
      }
    }
  }
}

log(score);
