const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route.js');
const { UserModel } = require('./models/user.model.js');
const path = require('path');

dotenv.config({ path: './.env' });

const uploadRouter = require('./routes/upload.route.js');
const userPlaceRouter = require('./routes/userPlace.route.js');
const placeRouter = require('./routes/place.route.js');
const bookingRouter = require('./routes/booking.route.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://bookingrent.netlify.app'],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MongoURL, { dbName: 'Booking-app' })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log('Error while connecting to database', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.get('/health_check', (req, res) => {
  res.send({ success: true });
});

async function getUserDataFromDatabase(token) {
  try {
    const userId = token.userId;

    const user = await UserModel.findById(userId);
    if (user) {
      return {
        name: user.name,
        email: user.email,
        _id: user._id,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user data from database:', error);
    throw error;
  }
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/user-place', userPlaceRouter);
app.use('/place', placeRouter);
app.use('/bookplace', bookingRouter);
