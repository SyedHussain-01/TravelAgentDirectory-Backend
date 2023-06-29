require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
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

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Engine
app.set("view engine", "ejs");

//Routes
app.post("/sign-up", async (req, res) => {
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
    }else{
      sendResponse(res, 400, null)
    }
  } catch (error) {
    sendResponse(res, 400, null);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const ss = await myUsers.find({ email, pass });
    if (ss.length === 1) {
      const signedId = jwt.sign(
        { id: ss._id, name: ss.email, pass: ss.pass },
        `${process.env.JWT_TOKEN_KEY}`,
        { expiresIn: '15m' } 
      );
      res.setHeader("Authorization", `Bearer ${signedId}`);
      sendResponse(res, 200, ss);
    } else {
      sendResponse(res, 400, null);
    }
  } catch (error) {
    console.log(ss);
  }
});

//Server Listenser
app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
