const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(controller.getAllUsers).post(controller.createUser);
router.route('/:id').get(controller.getOneUser).delete(controller.deleteUser);

module.exports = router;
