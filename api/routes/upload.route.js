const express = require('express');
const createUploadController = require('../controllers/uploadController');
const multer = require('multer');
const path = require('path');

const validFormats = ['.jpg', '.jpeg', '.png', '.gif'];

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

const uploadStorage = multer({ storage: storage });
const router = express.Router();

const uploadController = createUploadController(path, validFormats);

router.post('/upload-by-link', uploadController.uploadByLink);
router.post(
  '/upload-by-file',
  uploadStorage.array('photo', 10),
  uploadController.handleUploadBySelect
);

module.exports = router;
