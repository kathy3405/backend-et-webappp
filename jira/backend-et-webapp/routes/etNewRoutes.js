const express = require('express');
const { createEtNews } = require('../controllers/etNewsController');
const router = express.Router();

router.post('/api/v1/et-news', createEtNews);
module.exports = router;