const express = require("express"); 
const jwt = require("jsonwebtoken"); 

const app = express(); 

app.use(express.urlencoded({extended : true})); 

let data = {
    email : "s123@gmail.com", 
    password : "1234"
}

let token = jwt.sign(data, "this is the private key", {expiresIn : 60 * 60}); 
console.log(token);

app.get("/", (req, res) => {
    res.json({
        status : 200, 
        success : true, 
        message : "Welcome to JWT Login"
    })
})

// app.post("/register", (req, res)=> {
//     if(!req.body){
//         data.email = req.body.email; 
//         data.password = req.body.password;
//     }
// })

app.post("/login", (req, res)=> {
    if(data.email === req.body.email && data.password === req.body.password){
        jwt.verify(token, "this is the private key", function(err, decode){        
            res.json({
                status : 200, 
                success : true, 
                message : "Data decoded successfully", 
                data : decode, 
                err : err
            })
        })
    }
    else{
        res.json({
            status : 400, 
            success : false, 
            message : "Error"
        })
    }
    
})


app.listen(3000, function(){      
    console.log("SERVER RUNNING AT PORT 3000"); 
})