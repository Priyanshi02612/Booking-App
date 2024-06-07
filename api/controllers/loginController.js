const { RegisterModel } = require('../models/register.model');
const validator = require('validator');

const login = async (req, res) => {
  try {
    // Extract data from request body
    const userLoginData = req.body;

    // Check if all required fields are present
    if (!userLoginData.email || !userLoginData.password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required!',
      });
    }

    // Validate email format
    if (!validator.isEmail(userLoginData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email.',
      });
    }

    // Find existing user by email
    const existingUser = await RegisterModel.findOne({
      email: userLoginData.email,
    });

    // If user doesn't exist, return error message
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email does not exist.',
      });
    }

    if (existingUser.password !== userLoginData.password) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect password.',
      });
    }

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

module.exports = login;
