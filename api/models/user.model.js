const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Required.'],
    minLength: [3, 'Name must contains atleast 3 letters.'],
  },
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
  repeatPassword: {
    type: String,
    required: [true, 'Repeat password is required.'],
    validate: {
      validator: function (value) {
        // `this.password` refers to the value of the `password` field in the document
        return value === this.password;
      },
      message: 'Passwords do not match.',
    },
  },
});

const UserModel = mongoose.model('usersData', userSchema);

module.exports = { UserModel };
