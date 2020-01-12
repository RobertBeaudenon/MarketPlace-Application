const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config/secret');

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS,
  accessKeyId: config.AWS_ACCESS_KEY,
  region: 'ca-central-1'
});

//To handle errors in case we upload a file that is not an image ( does not have a jpeg or png extension)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

//create a new instance of AWS S3 bucket
const s3 = new aws.S3({
  /* ... */
});

const upload = multer({
  fileFilter: fileFilter, //if the image is not .jpeg or .png
  storage: multerS3({
    s3: s3,
    bucket: 'hlpr-marketplace-images',
    acl: 'public-read', //allows public access of image stored in S3 through url

    metadata: function(req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA' });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
