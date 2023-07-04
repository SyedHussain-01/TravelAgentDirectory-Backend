const jwt = require("jsonwebtoken");

//Functions
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
  getAccessToken,
  getRefreshToken,
};
