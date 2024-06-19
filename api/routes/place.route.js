const express = require('express');
const placeController = require('../controllers/placesController');

const router = express.Router();

router.get('/', placeController.all);
router.get('/place:id', placeController.singlePlace);
router.post('/addplace', placeController.addPlace);
router.put('/updateplace', placeController.updatePlace);

module.exports = router;
