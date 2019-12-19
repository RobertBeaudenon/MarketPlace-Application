//For each route we are going to use that authHelper to verify that the user has a valid token to give access to the route requested
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

const dbConfig = require('../config/secret');

module.exports = {
  VerifyToken: (req, res, next) => {
    const token = req.cookies.auth; //we verify if token is present in cookie, 'auth' is the name of the cookie containing the token

    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'No token provided' });
    }
    //verify validity of token if it exist
    return jwt.verify(token, dbConfig.secret, (err, decoded) => {
      if (err) {
        //token expires after 1 hr
        if (err.expiredAt < new Date()) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Token has expired. Please login again', token: null });
        }
        next();
      }
      req.user = decoded.data; //req.user will always contain the user object because we signed the token , decoded is the value returned if no error
      next();
    });
  }
};
