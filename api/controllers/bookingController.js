const { BookingModel } = require('../models/booking.model');

class BookingController {
  bookPlace = async (req, res) => {
    try {
      const bookingData = req.body.data;
      
      if (
        !bookingData.name ||
        !bookingData.contact ||
        !bookingData.checkIn ||
        !bookingData.checkOut ||
        !bookingData.maxGuests
      ) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required!',
        });
      }

      const bookedPlaceData = await BookingModel.create({
        name: bookingData.name,
        contact: bookingData.contact,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        maxGuests: bookingData.maxGuests,
        userId: bookingData.userId,
        price: bookingData.price,
      });

      res.status(200).json({
        success: true,
        data: bookedPlaceData,
        message: 'Booked your place successfully!',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error while booking data.',
      });
    }
  };
}

module.exports = new BookingController();
