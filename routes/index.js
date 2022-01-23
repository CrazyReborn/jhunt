const express = require('express');
const userController = require('../controllers/userController');
const applicationController = require('../controllers/applicationController');
const interviewController = require('../controllers/interviewController');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Application routes
router.get('/api/v1/applications', applicationController.applications_get);
router.post('/api/v1/applications', applicationController.applications_post);
router.get('/api/v1/applications/:id', applicationController.application_get);
router.put('/api/v1/applications/:id', applicationController.application_put);
router.delete('/api/v1/applications/:id', applicationController.application_delete);

// Interview routes
router.get('/api/v1/interviews', interviewController.interviews_get);
router.post('/api/v1/interviews', interviewController.interviews_post);
router.put('/api/v1/interviews/:id', interviewController.interview_put);
router.delete('/api/v1/interviews/:id', interviewController.interview_delete);

// Event routes
router.get('/api/v1/events', eventController.events_get);
router.get('/api/v1/events/new', eventController.event_new_get);
router.post('/api/v1/events', eventController.event_new_post);
router.put('/api/v1/events/:id', eventController.event_put);
router.delete('/api/v1/events/:id', eventController.event_delete);

// Sign Up and Sign In routes
router.get('/api/v1/signin', userController.signin_get);
router.post('/api/v1/signin', userController.signin_post);
router.get('/api/v1/signup', userController.signup_get);
router.post('/api/v1/signup', userController.signup_post);
router.post('/api/v1/logout', userController.logout_post);
router.get('/api/v1/users/:id', userController.user_get);

module.exports = router;
