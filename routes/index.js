const express = require('express');
const userController = require('../controllers/userController');
const applicationController = require('../controllers/applicationController');
// const user_controller = require('../controllers/user');

const router = express.Router();

/* GET home page. */
router.get('/api/v1/applications', applicationController.applications_get);
router.post('/api/v1/applications', applicationController.applications_post);

router.get('/api/v1/applications/:id', applicationController.application_get);
router.put('/api/v1/applications/:id', applicationController.application_put);

router.get('/api/v1/signin', userController.signin_get);
router.post('/api/v1/signin', userController.signin_post);

router.get('/api/v1/signup', userController.signup_get);
router.post('/api/v1/signup', userController.signup_post);
router.get('/api/v1/users/:id', userController.user_get);

module.exports = router;
