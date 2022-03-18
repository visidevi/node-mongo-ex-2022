const express = require('express');

const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/reviews.controller');

const authController = require('../controllers/auth');

router
  .route('/')
  .get(authController.protect, reviewController.getReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(authController.protect, reviewController.updateReview)
  .delete(authController.protect, reviewController.deleteReview);
module.exports = router;
