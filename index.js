const express = require("express");
const path = require("path");
const mongoose = require("mongoose")

const app = express();

//DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>{
  console.log("DB Connected")
}).catch((e)=>{
  console.log(e)
})

const usersSchema = new mongoose.Schema({
  name:String,
  email:String
})

const myUsers = new mongoose.model('users', usersSchema);

const insertUsers = async (name, email) => {
    try {
      const ss = await myUsers.create({
        name,
        email
      })
      console.log("ss dbbbbbb=> ", ss)  
    } catch (error) {
      console.log(error)
    }   
}

const getUsers = async () => {
  try {
    const ss = await myUsers.find()
    return ss
  } catch (error) {
    console.log(error)
  }
}

//Middlewares
app.use(express.urlencoded({ extended: true }));

//Engine
app.set("view engine", "ejs");

//Routes
app.get("/", (req, res) => {
  res.render("index", { heading: 'Home' });
});

app.post("/form-submit", async (req, res) => {
  console.log("req=>",  req.body);
  insertUsers(req.body.name, req.body.email)
  res.redirect('/getUsers')
});

app.get('/getUsers', async (req,res)=>{
  const userList = await getUsers()
  console.log(userList)
  res.render('success', { userList }) 
})

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
