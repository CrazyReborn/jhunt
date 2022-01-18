const express = require('express');
// const user_controller = require('../controllers/user');

const router = express.Router();

// /* GET home page. */
// router.get('/api/v1/applications', application_controller.applications_get);
// router.post('/api/v1/applications', application_controller.applications_post);

router.get('/api/v1/signin', user_controller.signin_get);

router.get('/api/v1/signup', user_controller.signup_get);
router.post('/api/v1/signup', user_controller.signup_post);
router.get('/api/v1/users/:id', user_controller.user_get);

module.exports = router;
