const express = require('express');
const { addDelivery, getMatchStats } = require('../controllers/scoringController');
const router = express.Router();

router.post('/delivery', addDelivery);

router.get('/match/:id', getMatchStats);

module.exports = router;