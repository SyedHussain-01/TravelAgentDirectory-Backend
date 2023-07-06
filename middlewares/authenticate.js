const jwt = require("jsonwebtoken")
const sendResponse = require("../helpers/sharedHelpers")

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
      if (err) {
        sendResponse(res, 400, {
          message: "Token rejected",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    sendResponse(res, 400, {
      message: "Unauthorized",
    });
  }
};

module.exports = authenticate;
