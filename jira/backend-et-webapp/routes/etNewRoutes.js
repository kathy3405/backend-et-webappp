const express = require('express');
const {getETNews} = require('../controllers/etNewsController');
const router = express.Router();
router.get('/api/v1/et-news', getETNews)
module.exports = router;