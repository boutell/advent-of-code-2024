import { inspect } from 'util';

export default function log(v, depth = 100) {
  console.log(inspect(v, { depth }));
  // Helps avoid creating intermediate variables
  return v;
}
