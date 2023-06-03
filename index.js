const http = require("http")
const { name, secondName  } = require("./features")

const server = http.createServer((req,res)=>{
    if(req.url=='/'){
        res.end(`<h1>Home ${name} ${secondName}</h1>`)
    }else if(req.url=='/contact'){
        res.end("<h1>Contact</h1>")
    }else{
        res.end("<h1>Served</h1>")
    }
})

server.listen(3000,()=>{
    console.log("served")
})