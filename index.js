const express = require("express");
const path = require("path");

const app = express();

const users = []

//Middlewares
app.use(express.urlencoded({ extended: true }));

//Engine
app.set("view engine", "ejs");

//Routes
app.get("/", (req, res) => {
  res.render("index", { heading: 'Home' });
});

app.post("/form-submit", (req, res) => {
  console.log(req.body);
  users.push({
    name:req.body.name,
    email:req.body.email
  })
  res.render('success')
});

app.get('/getUsers',(req,res)=>{
    res.json({
        users
    })
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
