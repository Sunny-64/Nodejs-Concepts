const mongoose = require("mongoose"); 
mongoose.set('strictQuery', false); 
mongoose.connect("mongodb://0.0.0.0:27017/address-test")
.then(res=>{
    console.log("Database connected successfully"); 
})
.catch(err=>{
    console.log("Failed to Connect database"); 
})