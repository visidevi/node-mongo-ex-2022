const express = require('express');
const router = express.Router();
const controller = require('./../controllers/usersController');

router
  .route('/')
  .get(controller.getAllUsers)
  .post(controller.createUser);
router
  .route('/:id')
  .get(controller.getOneUser)
  .delete(controller.deleteUser);

module.exports = router;
