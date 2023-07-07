const {
  getAccessToken,
  getRefreshToken,
  encrypt,
  decrypt,
} = require("../helpers/authHelpers");
const sendResponse = require("../helpers/sharedHelpers");
const myUsers = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");

const accesser = uuidV4();

const signupController = async (req, res) => {
  const { name, email, pass, phone, city, date_of_birth, user_type, agency_name } = req.body;
  const hashedPass = await encrypt(pass);
  try {
    const checkAccesser = await myUsers.findOne({ accesser })
    if(checkAccesser){
      accesser = uuidV4();
    }
    const ss = await myUsers.create({
      name,
      email,
      pass: hashedPass,
      accesser,
      phone,
      city,
      date_of_birth,
      user_type,
      ...(user_type == 0 ? {agency_name} : {})
    });
    sendResponse(res, 200, ss.toObject());
  } catch (error) {
    console.log(error);
    if (error.keyValue) {
      const err = Object.keys(error.keyValue);
      sendResponse(res, 400, { message: `${err[0]} already exists!!!` });
    } else {
      sendResponse(res, 400, { message: `Internal Server Error` });
    }
  }
};

const signinController = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const ss = await myUsers.findOne({ email });
    if (ss) {
      const result = await decrypt(pass, ss.pass);
      if (!result) {
        sendResponse(res, 400, {
          message: "Password Incorrect",
        });
      } else {
        const signedId = getAccessToken(ss);
        const refreshSignedId = getRefreshToken(ss);
        res.setHeader("Authorization", `Bearer ${signedId}`);
        res.setHeader("Refresh_Token", `Bearer ${refreshSignedId}`);
        sendResponse(res, 200, ss.toObject());
      }
    } else {
      sendResponse(res, 400, {
        message: "User Not Found!!!",
      });
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
          console.log(err);
          sendResponse(res, 400, {
            maessage: "Refresh Token not verified"
          });
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
