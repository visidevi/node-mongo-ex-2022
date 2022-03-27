const express = require('express');
const viewsController = require('../controllers/view.controller');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', viewsController.getOverview); //authController.isLoggedIn
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
// router.get('/me', authController.protect, viewsController.getAccount);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

module.exports = router;
