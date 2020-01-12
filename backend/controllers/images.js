const upload = require('../services/file-upload');
const singleImageUpload = upload.single('image'); //image is the key attached to the imge data

module.exports = {
  UploadImage(req, res) {
    singleImageUpload(req, res, function(err) {
      console.log('test');
      return res.json({ imageUrl: req.file.location });
    });
  }
};
