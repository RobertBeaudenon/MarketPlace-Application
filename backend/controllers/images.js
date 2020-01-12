const HttpStatus = require('http-status-codes');
const upload = require('../services/file-upload');

const config = require('../config/secret');

const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: 'ca-central-1'
});
const s3Bucket = new AWS.S3({ params: { Bucket: config.S3_BUCKET } });

module.exports = {
  UploadImage(req, res) {
    //Uploading base64 encoded image to AWS S#
    buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const data = {
      Key: Date.now().toString(),
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      ACL: 'public-read' //allows public access of image stored in S3 through url
    };

    s3Bucket.putObject(data, function(err, data) {
      if (err) {
        console.log(err);
        console.log('Error uploading data: ', data);
      } else {
        console.log('succesfully uploaded the image!', data);
      }
    });
  }
};
