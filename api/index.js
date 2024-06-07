const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./routes/register.route.js');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MongoURL, { dbName: 'Booking-app' })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log('Error while connecting to database', error);
  });

app.get('/health_check', (req, res) => {
  res.send({ success: true });
});

app.use('/booking', registerRouter);
