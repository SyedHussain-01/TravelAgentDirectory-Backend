const { getAccessToken, sendResponse, getRefreshToken  } = require("../helpers/authHelpers")
const myUsers = require("../models/userModel")
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
    const { name, email, pass, phone, city, date_of_birth, user_type } = req.body;
    try {
      const passQuery = { pass };
      const emailQuery = { email };
      const combinedQuery = { $or: [passQuery, emailQuery] };
      const data = await myUsers.find(combinedQuery);
      if (data.length === 0) {
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
      } else {
        sendResponse(res, 400, null);
      }
    } catch (error) {
      sendResponse(res, 400, { message: error });
    }
  }

const signinController =  async (req, res) => {
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
  }

const refreshTokenController =  async (req, res) => {
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
            sendResponse(res, 200, { message: 'Access token regenerated' });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {
    signupController,
    signinController,
    refreshTokenController
}