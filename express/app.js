const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
// Routing
// app.get('/', (req, res) => {
//   res.status(200).json({
//     app: 'Natours',
//     msg: 'Hello World!',
//   });
// });

// app.post('/', (req, res) => {
//   console.log('req', req);
//   res.send('Method post is available');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//  Route Handler
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
    results: tours.length,
  });
});
app.post('/api/v1/tours', (req, res) => {
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
});

app.post('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
  // Deleted
  res.status(204).json({
    status: 'success',
    data: null,
  })
})

app.patch('/api/v1/tours/:id', (req, res) => {
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

})
// Start server
app.listen(port, () => {
  console.log('Server started on port 3000');
});
