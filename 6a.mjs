import readLines from './lib/lines.mjs';
import log from './lib/log.mjs';
import Grid, { taxiDirections, GridBoundsError } from './lib/grid.mjs';

export const arrows = {
  '^': 0,
  '>': 1,
  'v': 2,
  '<': 3
};

const grid = new Grid(readLines({ split: '' }));
let count = 1;
let inBounds = true;
let x, y, o;
for (const cell of grid.cells()) {
  if (Object.hasOwn(arrows, cell.value)) {
    x = cell.x;
    y = cell.y;
    o = arrows[cell.value];
    cell.value = '.';
    break;
  }
}

while (inBounds) {
  grid.setValue(x, y, '@');
  try {
    const xn = x + taxiDirections[o][0];
    const yn = y + taxiDirections[o][1];
    const value = grid.getValue(xn, yn);
    if (value === '#') {
      o++;
      o %= 4;
    } else {
      x = xn;
      y = yn;
      if (grid.getValue(x, y) !== '@') {
        count++;
      }
    }
  } catch (e) {
    if (e instanceof GridBoundsError) {
      inBounds = false;
    } else {
      throw e;
    }
  }
}
grid.print();

log(count);
