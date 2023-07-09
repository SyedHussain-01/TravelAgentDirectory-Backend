const authRoutes = require("./authentication/authRoutes")
const packageRoutes = require("./travelPackages/packageRoutes")
const agentRoutes = require('./travelAgents/agentRoutes')

const routes = (app) => {

  //For Authentication
  app.use('/api/v1/auth', authRoutes)

  //For agents posting packages
  app.use('/api/v1/package', packageRoutes)

  //For retrieving agents
  app.use('/api/v1/agents', agentRoutes)

};

module.exports = routes;