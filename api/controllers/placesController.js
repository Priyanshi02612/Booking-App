const { PlaceModel } = require('../models/places.model');

class placeController {
  all = async (req, res) => {
    try {
      const placeData = await PlaceModel.find({});

      res.status(200).json({
        success: true,
        data: placeData,
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        message: 'Error while retrieving place data.',
      });
    }
  };

  addPlace = async (req, res) => {
    const userPlacesData = req.body;

    const validations = [
      { field: 'title', message: 'Title is required.' },
      { field: 'address', message: 'Address is required.' },
      { field: 'photos', message: 'It is required to upload photos.' },
      { field: 'description', message: 'Description is required.' },
      { field: 'perks', message: 'It is required to select perks.' },
      { field: 'checkIn', message: 'Check-in time is required.' },
      { field: 'checkOut', message: 'Check-out time is required.' },
      { field: 'maxGuests', message: `Maximum guest's number is required.` },
    ];

    for (const { field, message } of validations) {
      if (
        !userPlacesData[field] ||
        userPlacesData[field].length === 0 ||
        userPlacesData[field] === 0
      ) {
        return res.status(400).json({ success: false, message: message });
      }
    }

    const addedNewPlace = await PlaceModel.create({
      title: userPlacesData.title,
      address: userPlacesData.address,
      photos: userPlacesData.photos,
      description: userPlacesData.description,
      perks: userPlacesData.perks,
      extraInfo: userPlacesData.extraInfo,
      checkIn: userPlacesData.checkIn,
      checkOut: userPlacesData.checkOut,
      maxGuests: userPlacesData.maxGuests,
    });

    res.status(200).json({
      success: true,
      message: 'Data saved successfully!',
      data: addedNewPlace,
    });
  };
}

module.exports = new placeController();
