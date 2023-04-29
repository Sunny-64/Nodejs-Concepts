const express = require("express"); 
const app = express(); 
// const FileUploadServices = require("./services/FileUploadServices")
const path = require("path")

app.use(express.urlencoded({extended : true})); 


const {uploadAvatar, uploadResume} = require("./middlewares/fileUpload")

app.get("/", (req, res) => {
    res.send(`
    <form action="/upload" enctype="multipart/form-data" method="post">
    <div class="form-group">
      <input type="file" class="form-control-file" name="image">
      <input type="file" class="form-control-file" name="image2">
      <input type="submit" value="Get me the stats!" class="btn btn-default">            
    </div>
  </form>
    `); 
})

app.post("/upload", uploadAvatar.single("image"), uploadResume.single("image2"),(req, res) => {
    // FileUploadServices.uploadAvatar()
    // const obj = new FileUploadServices(); 
    // obj.uploadAvatar()
    // const uploadService = new FileUploadServices(); 
    // let result = uploadService.uploadAvatar(); 
    // console.log(result);
    res.send("<h1> Uploaded </h1>")
})


app.listen(3000, () => {
    console.log("Server running...")
})