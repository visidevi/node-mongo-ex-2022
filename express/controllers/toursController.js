const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const tour = tours.find((el) => el.id === val * 1);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    data: {
      tours,
    },
    results: tours.length,
  });
};

exports.createTour = (req, res) => {
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
exports.getOneTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.deleteTour = (req, res) => {
  // Deleted
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
exports.patchTour = (req, res) => {
  const updatedTour = Object.assign(tour, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  });
};
