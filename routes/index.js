const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/api/applications', application_controller.applications_get);
router.post('/api/applications', application_controller.applications_post);

module.exports = router;
