const mongoose = require("mongoose");

//DB Connection
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_URL)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDatabase;
