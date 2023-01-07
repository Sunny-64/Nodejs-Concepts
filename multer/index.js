const express = require("express"); 
const multer = require("multer"); 
const path = require("path"); 
const fs = require("fs");
const bodyParser = require("body-parser"); 


const app = express(); 


app.use(bodyParser.urlencoded({extended : true}));
// specifies destination and file name
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req);
        if(req.body.name != null ){
            console.log(file); 
            fs.mkdirSync(path.join(__dirname + '/public/users/' + req.body.name))
            fs.mkdirSync(path.join(__dirname + '/public/users/' + req.body.name + "/" + file.fieldname)); 
        }
        console.log(req.body.name);
        cb(null, path.join(__dirname + '/public/users/' + req.body.name + "/" + file.fieldname))
      },
      filename: function (req, file, cb) {
        // console.log(file)
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + uniqueSuffix + path.extname(file.originalname));
      }
})

const upload = multer({storage : storage});


app.get("/", (req, res)=>{
    res.json({
        status : 200, 
        success : true, 
        message : "Welcome to the home page"
    })
})

app.post("/user/avatar", upload.single("avatar"), (req, res)=>{
    // console.log(req.body); 
    // console.log("############"); 
    // console.log(req.file)
    res.json({
        status : 200, 
        success : true, 
        message : "User Avatar Saved"
    })
})

app.listen(3000, ()=>{
    console.log("Server running at port : 3000");
})