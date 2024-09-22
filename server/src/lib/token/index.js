const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn = "1h",
}) => {
  try {
    return jwt.sign(payload, secret, { algorithm, expiresIn });
  } catch (error) {
    serverError();
  }
};

module.exports = {
  generateToken,
};
