const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route.js');
const { UserModel } = require('./models/user.model.js');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const path = require('path');

dotenv.config({ path: './config.env' });

const authRoutes = require('./routes/auth.route.js');

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
app.use('/auth', authRoutes);

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

const validFormats = ['.jpg', '.jpeg', '.png', '.gif'];

app.post('/upload-by-link', async (req, res) => {
  try {
    const link = req.body.imageLink;

    const extension = path.extname(link).toLowerCase();

    if (!validFormats.includes(extension)) {
      console.log('Invalid image format.');
    }

    const newFileName = 'photo' + Date.now() + extension;

    const { filename } = await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newFileName,
    });
    console.log(filename);

    res.json({ success: true, filename: newFileName });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!validFormats.includes(extension)) {
      return cb(new Error('Invalid image format'));
    }
    cb(null, 'photo' + Date.now() + extension);
  },
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadStorage = multer({ storage: storage });

app.post('/upload', uploadStorage.array('photo', 10), (req, res) => {
  try {
    const filenames = req.files.map((file) => file.filename);
    // console.log('Files uploaded:', filenames);

    res.status(200).json({ success: true, files: filenames });
  } catch (error) {
    // console.error('Error uploading file:', error);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
});
