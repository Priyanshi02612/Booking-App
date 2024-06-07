const mongoose = require('mongoose');
const validator = require('validator');

const userLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'E-mail is Required.'],
    unique: true,
    validate: [
      { validator: validator.isEmail, message: 'Please provide valid email.' },
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is Required.'],
    minLength: [6, 'Password must contains atleast 6 letters.'],
  },
});

const LoginModel = mongoose.model('userLoginData', userLoginSchema);

module.exports = { LoginModel };
