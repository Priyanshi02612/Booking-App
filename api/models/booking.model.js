const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: [true, 'Name is Required.'] },
  contact: {
    type: String,
    required: [true, 'Contact number is Required.'],
    length: [10, 'Invalid contact number.'],
  },
  checkIn: { type: String, required: [true, 'Check-in time is Required.'] },
  checkOut: { type: String, required: [true, 'Check-out time is Required.'] },
  maxGuests: { type: Number, required: [true, 'Enter guests count.'] },
  userId: String,
  price: Number,
});

const BookingModel = mongoose.model('bookedPlaceData ', bookingSchema);

module.exports = { BookingModel };
