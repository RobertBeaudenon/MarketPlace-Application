const HttpStatus = require('http-status-codes');

const config = require('../config/secret');

const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: 'ca-central-1'
});
const s3Bucket = new AWS.S3({ params: { Bucket: config.S3_BUCKET } });

const User = require('../models/userModels');

module.exports = {
  async UploadImage(req, res) {
    //Uploading base64 encoded image to AWS S#
    buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = req.body.image.split(';')[0].split('/')[1];

    const data = {
      Key: Date.now().toString(),
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
      ACL: 'public-read' //allows public access of image stored in S3 through url
    };

    let location = '';
    let key = '';
    try {
      const { Location, Key } = await s3Bucket.upload(data).promise();
      location = Location;
      key = Key;
    } catch (error) {
      console.log(error);
    }

    await User.update(
      {
        _id: req.user._id
      },
      {
        $push: {
          images: {
            imgS3Key: key
          }
        }
      }
    )
      .then(() => res.status(HttpStatus.OK).json({ message: 'Image uploaded to AWS S3', location, key }))
      .catch(err =>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when uploading image to AWS S3' })
      );
  },

  async SetDefaultImage(req, res) {
    await User.update(
      {
        _id: req.user._id
      },
      {
        picS3Key: req.params.imgS3Key
      }
    )
      .then(() => res.status(HttpStatus.OK).json({ message: 'Profile picture updated' }))
      .catch(err =>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when updating profile picture' })
      );
  }
};
