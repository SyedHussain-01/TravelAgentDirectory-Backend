const {
  getAccessToken,
  getRefreshToken,
} = require("../helpers/authHelpers");
const sendResponse = require("../helpers/sharedHelpers")
const myUsers = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  const { name, email, pass, phone, city, date_of_birth, user_type } = req.body;
  try {
    const ss = await myUsers.create({
      name,
      email,
      pass,
      phone,
      city,
      date_of_birth,
      user_type,
    });
    sendResponse(res, 200, ss);
  } catch (error) {
    if(error.keyValue){
      const err = Object.keys(error.keyValue)
      sendResponse(res, 400, { message: `${err[0]} already exists!!!` });
    }else{
      sendResponse(res, 400, { message: `Internal Server Error` });
    }
  }
};

const signinController = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const ss = await myUsers.find({ email, pass });
    if (ss.length === 1) {
      const signedId = getAccessToken(ss);
      const refreshSignedId = getRefreshToken(ss);
      res.setHeader("Authorization", `Bearer ${signedId}`);
      res.setHeader("Refresh_Token", `Bearer ${refreshSignedId}`);
      sendResponse(res, 200, ss);
    } else {
      sendResponse(res, 400, null);
    }
  } catch (error) {
    console.log(error);
  }
};

const refreshTokenController = async (req, res) => {
  const { refresh_token } = req.body;
  try {
    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_KEY,
      (err, decoded) => {
        if (err) {
          sendResponse(res, 400, null);
        } else {
          const signedId = getAccessToken(decoded);
          res.setHeader("Authorization", `Bearer ${signedId}`);
          sendResponse(res, 200, { message: "Access token regenerated" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  signinController,
  refreshTokenController,
};
