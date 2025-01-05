import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import Grid from './lib/grid.mjs';

const grid = new Grid(readLines({ split: '', inObjects: true }));

grid.regions();
console.log('regions computed');
grid.print();

const regionScores = new Map();

for (const cell of grid.cells()) {
  const regionScore = regionScores.get(cell.value.region) || {
    area: 0,
    perimeter: 0
  };
  regionScore.area++;
  let i = 0;
  for (const n of cell.taxi()) {
    if (cell.value.region !== n.value.region) {
      regionScore.perimeter++;
    }
    i++;
  }
  // Catch the missing neighbors on the map edges
  regionScore.perimeter += (4 - i);
  regionScore.perimeter 
  regionScores.set(cell.value.region, regionScore);
}

let sum = 0;
for (const regionScore of regionScores.values()) {
  sum += regionScore.area * regionScore.perimeter;
}

log(sum);
