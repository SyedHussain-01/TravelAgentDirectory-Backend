const jwt = require("jsonwebtoken");

//Functions

const getAccessToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.name, user_type:ss.user_type },
    `${process.env.JWT_TOKEN_KEY}`,
    { expiresIn: "15m" }
  );
  return token;
};

const getRefreshToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.name, user_type:ss.user_type },
    `${process.env.JWT_REFRESH_TOKEN_KEY}`,
    { expiresIn: "7d" }
  );
  return token;
};

module.exports = {
  getAccessToken,
  getRefreshToken,
};
