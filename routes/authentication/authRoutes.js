const {
  signinController,
  signupController,
  refreshTokenController,
} = require("../../controllers/authControllers");

const authRoutes = (app, baseRoute) => {
  app.post(`${baseRoute}/sign-up`, signupController);
  app.post(`${baseRoute}/sign-in`, signinController);
  app.post(`${baseRoute}/refresh-token`, refreshTokenController);
};

module.exports = authRoutes

//When the access token will expire in the client side this api will be called to regenerate the access token
//When refresh token will be expired, user would have to sign in again