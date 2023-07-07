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
  console.log("authorization=> ", authorization)
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
      if (err) {
        sendResponse(res, 400, {
          message: "Token rejected",
        });
      } else {
        const { _id, name, user_type } = decoded
        console.log(decoded)
        console.log("token details=> ", _id, name, user_type)
        console.log("query details=> ", userObj.id, userObj.name, userObj.user_type)
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
