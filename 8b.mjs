import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import Grid from './lib/grid.mjs';
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
      const diffx = cells[j].x - cells[i].x;
      const diffy = cells[j].y - cells[i].y;
      let dx, dy;
      for (let d = 1; (d <= Math.max(diffx, diffy)); d++) {
        const cdx = diffx / d;
        const cdy = diffy / d;
        if ((Math.floor(cdx) === cdx) && (Math.floor(cdy) === cdy)) {
          dx = cdx;
          dy = cdy;
        } else {
          break;
        }
      }
      probe(cells[i].x, cells[i].y, dx, dy);
      probe(cells[i].x, cells[i].y, -dx, -dy);
    }
  }
}

log(antinodes);

function probe(x, y, dx, dy) {
  while (grid.inBounds(x, y)) {
    const k = key(x, y);
    if (!seen.has(k)) {
      antinodes++;
      seen.add(k);
    }
    x += dx;
    y += dy;
  }
}
