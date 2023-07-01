require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/db")
const externalSettings = require("./config/thirdPartyMiddlewares")
const routing = require("./routes/index")

//Server Initialize
const app = express();

//DatabaseConnection
connectDatabase();

//ExternalSettings
externalSettings(app);

//Routing
routing(app);

//Server Listenser
app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
