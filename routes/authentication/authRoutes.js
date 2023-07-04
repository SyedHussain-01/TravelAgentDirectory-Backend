const express = require("express")
const router = express.Router()
const {
  signinController,
  signupController,
  refreshTokenController,
} = require("../../controllers/authControllers");

router.post(`/sign-up`, signupController)

router.post(`/sign-in`, signinController)

router.post(`/refresh-token`, refreshTokenController)

module.exports = router

//When the access token will expire in the client side this api will be called to regenerate the access token
//When refresh token will be expired, user would have to sign in again