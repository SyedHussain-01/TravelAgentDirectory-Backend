const {
  signinController,
  signupController,
  refreshTokenController,
} = require("../controllers/authControllers");

const routes = (app) => {
  //Routes
  app.post("/auth/sign-up", signupController);
  app.post("/auth/sign-in", signinController);
  app.post("/auth/refresh-token", refreshTokenController);
};

module.exports = routes;


//When the access token will expire in the client side this api will be called to regenerate the access token
//When refresh token will be expired, user would have to sign in again