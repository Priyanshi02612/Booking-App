const express = require('express');
const userPlaceController = require('../controllers/userPlacesController');

const router = express.Router();

router.get('/place:userId', userPlaceController.all);
router.get('/place:id', userPlaceController.singlePlace);
router.post('/addplace', userPlaceController.addPlace);
router.put('/updateplace', userPlaceController.updatePlace);

module.exports = router;
