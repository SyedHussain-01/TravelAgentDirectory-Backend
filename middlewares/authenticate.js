const jwt = require("jsonwebtoken")
const sendResponse = require("../helpers/sharedHelpers")

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id, name, type } = req.query;
  const userObj = {
    id,
    name,
    user_type:type
  }
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
      if (err) {
        sendResponse(res, 400, {
          message: "Token rejected",
        });
      } else {
        const { _id, name, user_type } = decoded
        if(_id === userObj.id & name === userObj.name & user_type == userObj.user_type){
          req.user = decoded;
          next();
        }else{
          sendResponse(res, 400, {
            message: "Token details not matched with current user",
          });
        }
      }
    });
  } else {
    sendResponse(res, 400, {
      message: "Unauthorized",
    });
  }
};

module.exports = authenticate;
