const { RegisterModel } = require('../models/register.model');
const validator = require('validator');

const register = async (req, res) => {
  try {
    // Extract data from request body
    const registrationData = req.body;

    // Check if all required fields are present
    if (
      !registrationData.name ||
      !registrationData.email ||
      !registrationData.password ||
      !registrationData.repeatPassword
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required!',
      });
    }
    
    const existingUser = await RegisterModel.findOne({
      email: registrationData.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists. Please use a different email.',
      });
    }

    if (!validator.isEmail(registrationData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email.',
      });
    }

    if (registrationData.password !== registrationData.repeatPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.',
      });
    }

    // Create a new message document
    const newRegistrationData = await RegisterModel.create({
      name: registrationData.name,
      email: registrationData.email,
      password: registrationData.password,
      repeatPassword: registrationData.repeatPassword,
    });

    // Send a success response
    res.status(200).json({
      success: true,
      message: 'Registered successfully!',
      data: newRegistrationData,
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

module.exports = register;
