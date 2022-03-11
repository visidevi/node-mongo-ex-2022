const express = require('express');
const router = express.Router();
const controller = require('./../controllers/toursController');

router.param('id', controller.checkID);
router.route('/').get(controller.getAllTours).post(controller.createTour);
router
  .route('/:id')
  .get(controller.getOneTour)
  .patch(controller.patchTour)
  .delete(controller.deleteTour);
module.exports = router;
