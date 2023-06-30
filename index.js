require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//CORS Options
const corsOptions = {
  origin: 'http://localhost:3001', // Replace with the origin of your client application
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
}

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

//DB Connection
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log(e);
  });

//Schema
const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  phone: { type: Number, required: true },
  city: { type: String, required: false },
  date_of_birth: { type: Date, required: false },
  user_type: { type: Number, required: true }, // 0 -> Agent || 1 -> Traveller
});

//Model
const myUsers = new mongoose.model("users", usersSchema);

//Functions
const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: statusCode,
    data: statusCode !== 400 ? data : null,
    error: statusCode === 400 ? "Invalid Input" : null,
  });
};

const getAccessToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.email, pass: ss.pass },
    `${process.env.JWT_TOKEN_KEY}`,
    { expiresIn: "15m" }
  );
  return token;
};

const getRefreshToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.email, pass: ss.pass },
    `${process.env.JWT_REFRESH_TOKEN_KEY}`,
    { expiresIn: "7d" }
  );
  return token;
};

const authorization = (req, res) =>{
  
}

//Engine
app.set("view engine", "ejs");

//Routes
app.post("/auth/sign-up", async (req, res) => {
  const { name, email, pass, phone, city, date_of_birth, user_type } = req.body;
  try {
    const passQuery = { pass };
    const emailQuery = { email };
    const combinedQuery = { $or: [passQuery, emailQuery] };
    const data = await myUsers.find(combinedQuery);
    if (data.length === 0) {
      const ss = await myUsers.create({
        name,
        email,
        pass,
        phone,
        city,
        date_of_birth,
        user_type,
      });
      sendResponse(res, 200, ss);
    } else {
      sendResponse(res, 400, null);
    }
  } catch (error) {
    sendResponse(res, 400, { message: error });
  }
});

app.post("/auth/sign-in", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const ss = await myUsers.find({ email, pass });
    if (ss.length === 1) {
      const signedId = getAccessToken(ss);
      const refreshSignedId = getRefreshToken(ss);
      res.setHeader("Authorization", `Bearer ${signedId}`);
      res.setHeader("Refresh_Token", `Bearer ${refreshSignedId}`);
      sendResponse(res, 200, ss);
    } else {
      sendResponse(res, 400, null);
    }
  } catch (error) {
    console.log(error);
  }
});

//When the access token will expire in the client side this api will be called to regenerate the access token
//When refresh token will be expired, user would have to sign in again 
app.post("/auth/refresh-token", async (req, res) => {
  const { refresh_token } = req.body;
  try {
    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_KEY,
      (err, decoded) => {
        if (err) {
          sendResponse(res, 400, null);
        } else {
          const signedId = getAccessToken(decoded);
          res.setHeader("Authorization", `Bearer ${signedId}`);
          sendResponse(res, 200, { message: 'Access token regenerated' });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/agent/packages',authorization,()=>{

})

//Server Listenser
app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
