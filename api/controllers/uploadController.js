const imageDownloader = require('image-downloader');
const { PlaceModel } = require('../models/places.model');

function createUploadController(path, validFormats) {
  return {
    uploadByLink: async (req, res) => {
      try {
        const link = req.body.imageLink;

        if (!link) {
          return res.status(409).json({
            success: false,
            message:
              'Please enter image link to add photo or upload photo from your device.',
          });
        }

        const extension = path.extname(link).toLowerCase();

        if (!validFormats.includes(extension)) {
          console.log('Invalid image format.');
        }

        const newFileName = 'photo' + Date.now() + extension;

        const { filename } = await imageDownloader.image({
          url: link,
          dest: path.join(__dirname, '..', 'uploads', newFileName),
        });

        console.log({ filename });

        res.json({ success: true, filename: newFileName });
      } catch (error) {
        console.error('Error uploading image:', error);
        res
          .status(500)
          .json({ success: false, error: 'Failed to upload image' });
      }
    },

    handleUploadBySelect: async (req, res) => {
      try {
        const filenames = req.files.map((file) => file.filename);
        // console.log('Files uploaded:', filenames);

        res.status(200).json({ success: true, files: filenames });
      } catch (error) {
        // console.error('Error uploading file:', error);
        res
          .status(500)
          .json({ success: false, error: 'Failed to upload file' });
      }
    },

    deleteImage: async (req, res) => {
      const file = req.body.file;
      console.log({ file });

      const placeId = req.body.data._id;
      console.log({ placeId });

      try {
        const place = await PlaceModel.findById(placeId);

        if (!place) {
          return res.status(404).json({
            success: false,
            message: 'Place not found.',
          });
        }

        const updatedPhotos = place.photos.filter((image) => image !== file);
        place.photos = updatedPhotos;

        await place.save();

        res.status(200).json({
          success: true,
          message: 'Image deleted successfully.',
          data: updatedPhotos,
        });
      } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to delete image.',
          error: error.message,
        });
      }
    },
  };
}

module.exports = createUploadController;
