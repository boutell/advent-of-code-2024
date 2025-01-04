import readLines from './lib/lines.mjs';
import log, { write, clearScreen, goHome, greenText, resetText } from './lib/log.mjs';
import Grid, { taxiDirections, GridBoundsError } from './lib/grid.mjs';
import key from './lib/key.mjs';

write(clearScreen);

export const arrows = {
  '^': 0,
  '>': 1,
  'v': 2,
  '<': 3
};

const grid = new Grid(readLines({ split: '' }));
let count = 0;

let initialX, initialY;

for (const cell of grid.cells()) {
  if (Object.hasOwn(arrows, cell.value)) {
    initialX = cell.x;
    initialY = cell.y;
    break;
  }
}

const { grid: initial } = walk(grid, initialX, initialY);
for (const cell of initial.cells()) {
  if (((cell.x !== initialX) || (cell.y !== initialY)) && Object.hasOwn(arrows, cell.value)) {
    const result = walk(grid, initialX, initialY, cell.x, cell.y);
    if (result.loop) {
      count++;
    }
  }
}

log(count);

function walk(input, x, y, blockX, blockY) {
  const seen = new Set();
  const grid = input.clone();
  if (blockX !== undefined) {
    grid.setValue(blockX, blockY, '#');
  }
  let inBounds = true;
  let o;
  o = arrows[grid.getValue(x, y)];
  let steps = 0;
  while (inBounds) {
    steps++;
    if (!(steps % 100)) {
      // write(goHome);
      // grid.print(
      //   {
      //     extras: [
      //       {
      //         x,
      //         y,
      //         value: `${greenText}@${resetText}`
      //       }
      //     ]
      //   }
      // );
    }
    const arrow = Object.keys(arrows)[o];
    const k = key(x, y, arrow);
    if (seen.has(k)) {
      return {
        grid,
        loop: true
      };
    }
    seen.add(k);
    grid.setValue(x, y, arrow);
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
      }
    } catch (e) {
      if (e instanceof GridBoundsError) {
        inBounds = false;
      } else {
        throw e;
      }
    }
  }
  return {
    grid,
    loop: false
  };
}
