const imageDownloader = require('image-downloader');

function createUploadController(path, validFormats) {
  return {
    uploadByLink: async (req, res) => {
      try {
        const link = req.body.imageLink;

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
  };
}

module.exports = createUploadController;
