const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.json());
// Routing

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// Middleware
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
  console.log(req.requestTime);
});
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    data: {
      tours,
    },
    results: tours.length,
  });
};

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/datas/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: err,
        });
      } else
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
    }
  );
};
const getOneTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
  // Deleted
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
const patchTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
  const updatedTour = Object.assign(tour, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  });
};
//  Route Handler
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getOneTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getOneTour)
  .patch(patchTour)
  .delete(deleteTour);
// Start server
app.listen(port, () => {
  console.log('Server started on port 3000');
});
