require("dotenv").config();
const jwt = require("jsonwebtoken");

//Functions
const sendResponse = (res, statusCode, data) => {
  if (data && data._id) {
    data = data.toObject();
    delete data._id;
  }
  res.status(statusCode).json({
    status: statusCode,
    data: statusCode !== 400 ? data : null,
    error: statusCode === 400 ? data ? data : 'Internal Server Error' : null,
  });
};

const getAccessToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.email, pass: ss.pass },
    `${process.env.JWT_TOKEN_KEY}`,
    { expiresIn: "15m" }
  );
  return token;
};

const getRefreshToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.email, pass: ss.pass },
    `${process.env.JWT_REFRESH_TOKEN_KEY}`,
    { expiresIn: "7d" }
  );
  return token;
};

module.exports = {
  sendResponse,
  getAccessToken,
  getRefreshToken,
};
