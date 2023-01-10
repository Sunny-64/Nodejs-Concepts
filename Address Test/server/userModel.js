const mongoose = require("mongoose"); 
mongoose.set('strictQuery', false); 

const userSchema = mongoose.Schema({
    name : {type : String}, 
    email : {type : String}, 
    phone : {type : Number}, 
    addresses : [{
        address : {type : String, default : ""}, 
        city : {type : String, default : ""}, 
        state : {type : String, default : ""}, 
        pincode : {type : Number, default : null}
    }], 
    createdAt : {type : Date, default : Date.now()}
})


module.exports = mongoose.model('User', userSchema); 