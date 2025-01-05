import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import Grid, { allDirections } from './lib/grid.mjs';
import key from './lib/key.mjs';

const grid = new Grid(readLines({ split: '' }));

const freqs = new Map();

for (const cell of grid.cells()) {
  if (cell.value !== '.') {
    const cells = freqs.get(cell.value) || [];
    cells.push({
      x: cell.x,
      y: cell.y
    });
    if (cells.length === 1) {
      freqs.set(cell.value, cells);
    }
  }
}

let antinodes = 0;

const seen = new Set();
for (const [ value, cells ] of freqs.entries()) {
  for (let i = 0; (i < cells.length); i++) {
    for (let j = i + 1; (j < cells.length); j++) {
      const x1 = cells[i].x - (cells[j].x - cells[i].x);
      const y1 = cells[i].y - (cells[j].y - cells[i].y);
      const x2 = (cells[j].x - cells[i].x) + cells[j].x;
      const y2 = (cells[j].y - cells[i].y) + cells[j].y;
      addIfInBounds(x1, y1);
      addIfInBounds(x2, y2);
    }
  }
}

log(antinodes);

function addIfInBounds(x, y) {
  if (grid.inBounds(x, y)) {
    const k = key(x, y);
    if (!seen.has(k)) {
      antinodes++;
      seen.add(k);
    }
  }
}
