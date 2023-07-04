const authRoutes = require("./authentication/authRoutes")
const packageRoutes = require("./travelPackages/packageRoutes")

const routes = (app) => {

  //For Authentication
  app.use('/auth', authRoutes)

  //For agents posting packages
  app.use('/package', packageRoutes)

};

module.exports = routes;