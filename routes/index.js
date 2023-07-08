const authRoutes = require("./authentication/authRoutes")
const packageRoutes = require("./travelPackages/packageRoutes")
const agentRoutes = require('./travelAgents/agentRoutes')

const routes = (app) => {

  //For Authentication
  app.use('/auth', authRoutes)

  //For agents posting packages
  app.use('/package', packageRoutes)

  //For retrieving agents
  app.use('/agents', agentRoutes)

};

module.exports = routes;