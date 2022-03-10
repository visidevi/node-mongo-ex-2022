// Modules
// console.log(arguments);
// console.log(require('module'));
// console.log(require('module').wrapper);

const C = require('./test-module-one');

console.log(C);

const calc1 = new C();
console.log(calc1.add(1, 2));

const calc2 = require('./test-module-two');
console.log(calc2);
console.log(calc2.add(1, 2));

const {add, multiple, divide} = require('./test-module-two');
console.log(add(3,2))
console.log(multiple(3,2))
console.log(divide(3,2))

// Caching functions
require('./test-module-three')()
require('./test-module-three')()
require('./test-module-three')()
require('./test-module-three')()