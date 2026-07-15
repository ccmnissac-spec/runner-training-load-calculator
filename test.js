const assert = require('node:assert/strict');
const { calculateLoad } = require('./app.js');

assert.equal(calculateLoad(60, 5), 300);
assert.equal(calculateLoad('45', '6'), 270);
assert.throws(() => calculateLoad(0, 5), /Duration must be a whole number from 1 to 600/);
assert.throws(() => calculateLoad(30.5, 5), /Duration must be a whole number from 1 to 600/);
assert.throws(() => calculateLoad(60, 11), /RPE must be a whole number from 1 to 10/);
console.log('5 checks passed');
assert.equal(calculateLoad(600, 10), 6000);
console.log('Boundary check passed');
