/* eslint-disable import/no-dynamic-require */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitizer = require('express-mongo-sanitize');
const XSS = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error');

const app = express();

//1) Global Middleware
// Security http headers
app.use(helmet());

// Development login Logger style morgan middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Body parser reading data from body into re.body
app.use(express.json({ limit: '10kb' }));

//  Data Sanitization against NoSQL query injection
app.use(mongoSanitizer());

// Data Sanitization against XSS
app.use(XSS());
// Prevent parameter pollution when using
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
// Serving statis files
app.use(express.static(`${__dirname}/public`));

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
  console.log(req.requestTime);
});

// Routing
const usersRouter = require(`${__dirname}/routes/users`);
const toursRouter = require(`${__dirname}/routes/tours`);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', toursRouter);
// Route Handler
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getOneTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Router error Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
