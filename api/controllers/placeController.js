const { PlaceModel } = require('../models/places.model');

class PlaceController {
  all = async (req, res) => {
    try {
      const placeData = await PlaceModel.find({});

      res.status(200).json({
        success: true,
        data: placeData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error while retrieving place data.',
      });
    }
  };

  getPlaceById = async (req, res) => {
    const placeId = req.params.id;
    try {
      const placeData = await PlaceModel.findById(placeId);

      res.status(200).json({
        success: true,
        data: placeData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error while retrieving place details.',
      });
    }
  };
}

module.exports = new PlaceController();
