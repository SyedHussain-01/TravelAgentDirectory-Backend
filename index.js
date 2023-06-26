const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require('cors')

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
  name: String,
  email: String,
});

//Model
const myUsers = new mongoose.model("users", usersSchema);

//Functions
const insertUsers = async (name, email) => {
  try {
    const ss = await myUsers.create({
      name,
      email,
    });
    const payload = {
        id:ss._id,
        name:ss.name,
        email:ss.email
    }
    const userId = jwt.sign(payload, "THIS_IS_MY_SECRET_KEY_IAD_PROJECT", {
      expiresIn: "2hr",
    });
    return userId
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async () => {
  try {
    const ss = await myUsers.find();
    return ss;
  } catch (error) {
    console.log(error);
  }
};

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

//Engine
app.set("view engine", "ejs");

//Routes
app.get("/logout", (req, res)=>{
    console.log("api called")
    res.clearCookie('user')
    res.redirect("/")
})

app.get("/", (req, res) => {
  res.render("index", { heading: "Home" });
});

app.post("/form-submit", async (req, res) => {
  console.log("req=>", req.body);
  const signedUserId = insertUsers(req.body.name, req.body.email);
  const oneDay = 24*60*60*1000
  res.cookie('user',signedUserId,{
    httpOnly:true,
    expires: new Date(Date.now()+oneDay)
  })
  res.redirect("/getUsers");
});

app.get("/getUsers", async (req, res) => {
  const userList = await getUsers();
  console.log(userList[userList.length - 1]._id);
  res.render("success", { userList });
});

app.get("/getProducts", (req, res) => {
  const pathLocation = path.resolve();
  // console.log(pathLocation)
  // console.log(path.join(pathLocation,'/index.html'))
  res.sendFile(path.join(pathLocation, "/index.html"));
});

//Server Listenser
app.listen(3000, () => {
  console.log("server is listening");
});
