const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, controller.updateMe);
router.delete('/deleteMe', authController.protect, controller.deleteMe);

router.route('/').get(controller.getAllUsers).post(controller.createUser);
router.route('/:id').get(controller.getOneUser).delete(controller.deleteUser);

module.exports = router;
