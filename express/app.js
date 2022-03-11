const express = require('express');
const morgan = require('morgan');
const app = express();

// Routing
const usersRouter = require(`${__dirname}/routes/users`);
const toursRouter = require(`${__dirname}/routes/tours`);

// Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
  console.log(req.requestTime);
});

// Route Handler
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getOneTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', toursRouter);

module.exports = app;
