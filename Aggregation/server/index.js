const express = require("express");
const mongoose = require("mongoose");

// connect database
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://0.0.0.0:27017/aggregation")
  .then((data) => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("There was err ", err);
  });
// customer schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: [
   {
     state: { type: String } ,
     city: { type: String } ,
     gali: { type: String } ,
     mohalla: { type: String } ,
     country: { type: String } ,
     pincode: { type: String } ,
   }
  ],
});
// customer model
const Customer = new mongoose.model("Customer", customerSchema);

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/add/customer", async (req, res) => {
  const { name, email, password } = req.body;
  if (!req.body) {
    res.json({
      status: 400,
      success: false,
      message: "no data",
    });
  } else {
    try {
      const checkIfCustomerExists = await Customer.findOne({ email: email });
      if (checkIfCustomerExists !== null) {
        res.json({
          status: 400,
          success: false,
          message: "Customer already exists",
        });
      } else {
        const customerObj = new Customer();
        customerObj.name = name != undefined ? name : null;
        customerObj.email = email != undefined ? email : null;
        customerObj.password = password != undefined ? password : null;
        const customerData = await customerObj.save();
        res.json({
          status: 200,
          success: true,
          message: "Details saved",
          data: customerData,
        });
      }
    } catch (err) {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    }
  }
});

app.post("/add/address", async (req, res) => {
  const { city, state, gali, mohalla, pincode, country, customerId } = req.body;
  try {
    const customer = await Customer.findById(customerId);
    if (customer === null) {
      res.json({
        status: 404,
        success: false,
        message: "Customer not found",
      });
    } else {
      const addressObj = {
        state: state !== undefined ? state : null,
        city: city !== undefined ? city : null,
        gali: gali !== undefined ? gali : null,
        mohalla: mohalla !== undefined ? mohalla : null,
        pincode: pincode !== undefined ? pincode : null,
        country: country !== undefined ? country : null,
      };
      customer.address.push(addressObj);
      const customerData = await customer.save();
      res.json({
        status: 200,
        success: true,
        message: "Address added successfully",
        data: customerData,
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
});

app.get("/searchBy/city/:city", async (req, res) => {  
    const city = req.params.city; 
    if(city !== undefined){
        try{
            const data = await Customer.aggregate().unwind({
                'path' : '$address'
              }).match({'address.city' : 'jalandhar'})
            res.json({
                status : 200, 
                success : true, 
                message : "All the addresses found",
                data : data
            })
        }catch(err){
            res.json({
                status : 500, 
            success : false, 
            message : "Error : " + err,
            }) 
        }
    }else{
        res.json({
            status : 400, 
            success : false, 
            message : "City required"
        })
    }
})
app.listen(3000, () => {
  console.log("SERVER LISTENING AT PORT : 3000");
});
