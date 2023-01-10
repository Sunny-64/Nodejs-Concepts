const User = require("./userModel"); 

const userObj = {
    name : "admin", 
    email : "admin101@gmail.com", 
    phone : "88888", 
    addresses : []
}

User.findOne({email:userObj.email})
.then(data=>{
    if(data==null){
        let userObj2 = new User(userObj)
        userObj2.save() 
        .then(data=>{
            console.log("Admin Registered")
        })
    }
})

