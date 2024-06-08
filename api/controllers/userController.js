const validator = require('validator');
const { UserModel } = require('../models/user.model');

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
}

module.exports = new userController();
