const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config/secret');

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS,
  accessKeyId: config.AWS_ACCESS_KEY,
  region: 'ca-central-1'
});

//create a new instance of AWS S3 bucket
const s3 = new aws.S3({
  /* ... */
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: '***REMOVED***',
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
