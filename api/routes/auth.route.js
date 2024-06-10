const express = require('express');
const router = express.Router();

const { UserModel } = require('../models/user.model');

router.post('/logout', async (req, res) => {
  try {
    res.clearCookie('userId');

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
