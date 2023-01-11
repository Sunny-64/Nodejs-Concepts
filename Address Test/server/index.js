// seed a user with value
const express = require("express"); 
const mongoose = require("mongoose");
const db = require("./db"); 
const User = require("./userModel"); 


const app = express(); 

app.use(express.urlencoded({extended : true})); 

app.get("/", (req, res)=>{
    res.json({
        status : 200, 
        success : true, 
        message : "Welcome to Home Page"
    })
})

app.post("/addAddress", (req, res)=>{
    const {address, city, state, pincode, userId} = req.body; 

    let addressObj = {
       address : address, 
       city : city,
       state : state, 
       pincode : pincode, 
    }

    User.findOne({_id : userId})
    .then(data=>{
        data.addresses.push(addressObj); 
        data.save()
        .then(val=>{
            res.json({
                status : 200, 
                success : true, 
                message : "Address added successfully", 
                data : val
            })
        })
        
    })
    .catch(err=>{
        res.json({
            status : 500, 
            success : false, 
            message : "Failed to Add address "+ err,  
        })
    })

})


const seed = require("./seed");
 

app.listen(3000, function(){
    console.log("Server Running at PORT 3000"); 
})