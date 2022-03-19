const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Middleware esto afecta a todas las rutas declaradas despues de este middleware
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', controller.getMe, controller.getOneUser);
router.patch('/updateMe', controller.updateMe);
router.delete('/deleteMe', controller.deleteMe);

// Middleware
router.use(authController.restrictTo('admin'));
router.route('/').get(controller.getAllUsers).post(controller.createUser);
router
  .route('/:id')
  .get(controller.getOneUser)
  .delete(controller.deleteUser)
  .patch(controller.updateUser);

module.exports = router;
