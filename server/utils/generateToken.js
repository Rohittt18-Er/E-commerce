// import jwt from 'jsonwebtoken';

const jwt = require('jsonwebtoken')
const generateToken = (userId, donotLogOut) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: donotLogOut ? '30d' : '1h',
  });

  return token
};

module.exports = generateToken;
