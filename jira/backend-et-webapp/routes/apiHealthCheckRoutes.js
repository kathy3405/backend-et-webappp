const express = require('express');
const { getHealthStatus } = require('../controllers/apiHealthCheckControllers');
const router = express.Router();

router.get('/api/health', getHealthStatus);

module.exports = router;
