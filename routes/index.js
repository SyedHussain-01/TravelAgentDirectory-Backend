const authRoutes = require("./authentication/authRoutes")
const packageRoutes = require("./travelPackages/packageRoutes")

const routes = (app) => {

  //For Authentication
  authRoutes(app, "/auth");

  //For agents posting packages
  packageRoutes(app,"/package")

};

module.exports = routes;