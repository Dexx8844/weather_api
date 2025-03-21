const express = require('express');
const { getWeather } = require('../controller/weathercontroller');
const router = express.Router();

router.get('/weather', getWeather);

module.exports = router;
