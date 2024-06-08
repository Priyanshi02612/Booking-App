const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route.js');
const { UserModel } = require('./models/user.model.js');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
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

app.use('/user', userRouter);

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

app.get('/profile', async (req, res) => {
  const token = req.cookies;

  if (token) {
    try {
      const userData = await getUserDataFromDatabase(token);

      if (userData) {
        res.json(userData);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Error retrieving user data');
    }
  } else {
    res.status(401).send('No token found');
  }
});
