// Streams Practice
const stream = require('stream');
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //   console.log('Solution 1');
  //   fs.readFile('input.txt', 'utf-8', (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  //   });
  // Solution 2
//   const readable = fs.createReadStream('inpuat.txt', 'utf-8');
//   readable.on('data', (chunk) => {
//     // console.log(chunk);
//     res.write(chunk);
//   });
//   readable.on('end', () => {
//     console.log('end solution');
//     res.end();
//   });
//   readable.on('error', (err) => {
//     res.statusCode = 500;
//     console.error(err);
//     res.end("File don't exist");
//   });
// Solution 3
    const readable = fs.createReadStream('input.txt', 'utf-8');
    readable.pipe(res);
    // Pipe operator automatically handles the backpressure that we had previously
    // which is all more elegant and straight forward solution
    // ReadableSource. pipe writeable Destination
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
