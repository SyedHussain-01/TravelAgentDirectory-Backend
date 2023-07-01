const authRoutes = require("./authentication/authRoutes")

const routes = (app) => {

  //Routes
  authRoutes(app, "/auth");

};

module.exports = routes;