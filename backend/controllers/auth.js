const Joi = require('@hapi/joi'); //Will help us validate the data that we are getting from the frontend before sending it to the db
const HttpStatus = require('http-status-codes'); //instead of writing 200 we wirte H ttpStatus.GOOD_REQUEST
const User = require('../models/userModels');
const Helpers = require('../helpers/helper');

module.exports = {
  //the call to the methods comes from Routes/authRoutes.js
  async CreateUser(req, res) {
    //console.log(req.body);

    //Joi validation on input
    const schema = Joi.object({
      username: Joi.string() //must be a string,
        .min(5) //between 5 and 10 caharcters
        .max(10)
        .required(), //shouldn't be empty
      email: Joi.string()
        .email()
        .required(), //check that it's an email
      password: Joi.string()
        .min(5)
        .required()
    });

    //testing body against predefined schema and logging the error
    const { error, value } = schema.validate(req.body);
    console.log(value);
    if (error && error.details) {
      console.log(error.details);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details });
    }

    //verifies if the email already exist
    const userEmail = await User.findOne({ email: Helpers.lowerCase(req.body.email) }); //The functions need not to be chained one after another, simply await the function that returns the Promise.
    if (userEmail) {
      return res.status(HttpStatus.CONFLICT).json({ message: 'Email already exist' });
    }

    //verifies if username already exist
    const username = await User.findOne({ username: Helpers.firstUpper(req.body.username) });
    if (username) {
      return res.status(HttpStatus.CONFLICT).json({ meassage: 'Username already exist' });
    }
  }
};
