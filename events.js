const EventEmitter = require('events');
const http = require('http');

// Observer pattern
// Observer/ Listener
// const myEmitter = new EventEmitter();

// myEmitter.on('newSale', () => console.log('Event Fired, newSale'));
// myEmitter.on('newSale', () => console.log('newSale, Multiple listeners for the same event'));

// myEmitter.on('newSale', (elm, elm2) => {
//     console.log('newSales, with <Paramas></Paramas>', `${elm} ${elm2}`);});
// // Emitter
// myEmitter.emit('newSale', 'Hello World', 'This is the second argument');

class Sales extends EventEmitter {
  constructor() {
    console.log('Sales class created');
    // Super call the class that was extends
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSales', () => console.log('Event Fired, newSale'));
myEmitter.emit('newSales');

// Small webServer
const server = http.createServer();
server.on('request', (req, res) => {
  console.log('Request received');
  console.log(req.url);
  res.end('Hello World Request received');
});
server.on('request', (req, res) => {
  console.log('Request received 2');
});
server.on('close', () => {
  console.log('Server closed');
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
