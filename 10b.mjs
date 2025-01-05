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
    score += countPaths(testGrid, cell.x, cell.y);
  }
}

log(score);

function countPaths(testGrid, x, y) {
  let score = 0;
  const cell = testGrid.get(x, y);
  for (const n of cell.taxi()) {
    if ((cell.value.d + 1) === n.value.d) {
      if (n.value.value === 9) {
        score++;
      } else {
        score += countPaths(testGrid, n.x, n.y);
      }
    }
  }
  return score;
}
