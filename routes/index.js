const express = require('express');
const userController = require('../controllers/user');
// const user_controller = require('../controllers/user');

const router = express.Router();

// /* GET home page. */
// router.get('/api/v1/applications', application_controller.applications_get);
// router.post('/api/v1/applications', application_controller.applications_post);

router.get('/api/v1/signin', userController.signin_get);

router.get('/api/v1/signup', userController.signup_get);
router.post('/api/v1/signup', userController.signup_post);
router.get('/api/v1/users/:id', userController.user_get);

module.exports = router;
