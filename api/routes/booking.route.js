const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/booking', bookingController.bookPlace);

module.exports = router;
