const Joi = require('@hapi/joi'); //Will help us validate the data that we are getting from the frontend before sending it to the db
const HttpStatus = require('http-status-codes'); //instead of writing 200 we wirte H ttpStatus.GOOD_REQUEST

module.exports = {
  //the call to the methods comes from Routes/authRoutes.js
  CreateUser(req, res) {
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
    if (error && error.details) {
      console.log(error.details);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details });
    }
  }
};
