const express = require('express');
const placeController = require('../controllers/placesController');

const router = express.Router();

router.get('/',placeController.all);
router.post('/addplace', placeController.addPlace);

module.exports = router;
