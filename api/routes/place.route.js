const express = require('express');
const placeController = require('../controllers/placeController');

const router = express.Router();

router.get('/', placeController.all);
router.get('/:id', placeController.getPlaceById);

module.exports = router;
