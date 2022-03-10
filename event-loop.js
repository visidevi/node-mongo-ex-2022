const fs = require('fs');
const crypto = require('crypto');
setTimeout(() => console.log('Time 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1000;
fs.readFile('input.txt', (err, data) => {
  console.log('File read finished');
  setTimeout(() => console.log('Time 2 finished'), 0);
  setTimeout(() => console.log('Time 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));
  process.nextTick(() => console.log('Next tick'));

  for (let i = 0; i < 10; i++) {
    crypto.pbkdf2('paswor', 'salt', 1000, 1024, 'sha512', () => {
      console.log('Password Implemented encrypted with salt');
      console.log('Time to finish', Date.now() - start);
    });
  }
});

console.log('Hello World! The top level code');
