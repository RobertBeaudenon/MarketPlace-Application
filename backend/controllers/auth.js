const Joi = require('@hapi/joi'); //Will help us validate the data that we are getting from the frontend before sending it to the db
const HttpStatus = require('http-status-codes'); //instead of writing 200 we wirte HttpStatus.GOOD_REQUEST
const User = require('../models/userModels');
const Helpers = require('../Helpers/helper');
const bcrypt = require('bcryptjs'); //to encrypt passwords
const jwt = require('jsonwebtoken'); //tokens for authentication
const dbConfig = require('../config/secret');

module.exports = {
  //the call to the methods comes from Routes/authRoutes.js

  /****  REGISTER A USER  ****/

  async CreateUser(req, res) {
    //console.log(req.body);

    //Joi validation on input
    const schema = Joi.object({
      username: Joi.string() //must be a string,
        .min(5) //between 5
        .required(), //shouldn't be empty
      email: Joi.alternatives()
        .try(
          Joi.string().regex(/^[A-Za-z0-9._%+-]+@mail.mcgill.ca$/),
          Joi.string().regex(/^[A-Za-z0-9._%+-]+@mcgill.ca$/)
        )
        .required(), //check that it's an email
      password: Joi.string()
        .min(5)
        .required(),
      description: Joi.string().required(),
      major: Joi.string().required()
    });

    //testing body against predefined schema and logging the error
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }
    // console.log('after schema validation');
    //verifies if the email already exist
    const userEmail = await User.findOne({ email: Helpers.lowerCase(req.body.email) }); //The functions need not to be chained one after another, simply await the function that returns the Promise.
    if (userEmail) {
      return res.status(HttpStatus.CONFLICT).json({ message: 'Email already exist' });
    }

    //verifies if username already exist
    const username = await User.findOne({ username: Helpers.firstUpper(req.body.username) });
    if (username) {
      return res.status(HttpStatus.CONFLICT).json({ message: 'Username already exist' });
    }

    //Encrypting the password and returns it into 'hash' var with a length of 10
    return bcrypt.hash(value.password, 10, (err, hash) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({ meassage: 'Error hashing password' });
      }

      //creating formated structure object to insert into database
      const newBody = {
        username: Helpers.firstUpper(value.username),
        email: Helpers.lowerCase(value.email),
        password: hash,
        description: value.description,
        major: value.description
      };

      //We use the mongoose build in method to insert the object in the DB
      User.create(newBody)
        .then(user => {
          //creating jwt token once the user is successfully created, (object, signature, options)
          const token = jwt.sign({ data: user }, dbConfig.secret, {
            expiresIn: '5h'
          });

          res.cookie('auth', token);
          res.status(HttpStatus.CREATED).json({ message: 'User created successfully', user, token });
        })
        .catch(err => {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' });
        });
    });
  },

  /****  LOGIN A USER  ****/
  async LoginUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'No empty field allowed' });
    }

    await User.findOne({ username: Helpers.firstUpper(req.body.username) })
      .then(user => {
        if (!user) {
          return res.status(HttpStatus.NOT_FOUND).json({ message: 'Username not found' });
        }

        //check if password is valid
        return bcrypt.compare(req.body.password, user.password).then(result => {
          if (!result) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Password is incorrect' });
          }
          //if password is valid create token
          const token = jwt.sign({ data: user }, dbConfig.secret, {
            expiresIn: '5h'
          });
          res.cookie('auth', token); //setting the cookie with key auth
          return res.status(HttpStatus.OK).json({ message: 'Login successful', user, token }); //we return message user obj and token
        });
      })
      .catch(err => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' });
      });
  }
};
