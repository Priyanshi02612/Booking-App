const validator = require('validator');
const { UserModel } = require('../models/user.model');
const { PlaceModel } = require('../models/places.model');

class userController {
  register = async (req, res) => {
    try {
      // Extract data from request body
      const usersData = req.body;

      // Check if all required fields are present
      if (
        !usersData.name ||
        !usersData.email ||
        !usersData.password ||
        !usersData.repeatPassword
      ) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required!',
        });
      }

      const existingUser = await UserModel.findOne({
        email: usersData.email,
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists. Please use a different email.',
        });
      }

      if (!validator.isEmail(usersData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email.',
        });
      }

      if (usersData.password !== usersData.repeatPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match.',
        });
      }

      // Create a new message document
      const newUsersData = await UserModel.create({
        name: usersData.name,
        email: usersData.email,
        password: usersData.password,
        repeatPassword: usersData.repeatPassword,
      });

      // Send a success response
      res.status(200).json({
        success: true,
        message: 'Registered successfully!',
        data: newUsersData,
      });
    } catch (error) {
      // Handle errors
      console.error('Error sending message:', error);
      res.status(500).json({
        success: false,
        error: 'Something went wrong. Please try again later.', // Generic error message for security
      });
    }
  };

  login = async (req, res) => {
    try {
      // Extract data from request body
      const usersData = req.body;

      // Check if all required fields are present
      if (!usersData.email || !usersData.password) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required!',
        });
      }

      // Validate email format
      if (!validator.isEmail(usersData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email.',
        });
      }

      // Find existing user by email
      const existingUser = await UserModel.findOne({
        email: usersData.email,
      });

      // If user doesn't exist, return error message
      if (!existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email does not exist.',
        });
      }

      if (existingUser.password !== usersData.password) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect password.',
        });
      }

      res.cookie('userId', existingUser._id, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // If everything is correct, return success
      res.status(200).json({
        success: true,
        message: 'Login successful!',
        data: existingUser,
      });
    } catch (error) {
      // Handle errors
      console.error('Error in login controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error. Please try again later.', // Generic error message for security
      });
    }
  };

  addPlaces = async (req, res) => {
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

module.exports = new userController();
