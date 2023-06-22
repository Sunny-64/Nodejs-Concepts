/*
implement file uploader: 

create read buffer stream of selected file. 

read file in chunks: 2MB chunk. 

you can read 2,3, 4 chunks and upload (send to server) parallelly. 

this will increase upload speed as uploading is in parallel. 

 we are handling large files. so, it's not wise to store chunks in server memory (RAM).  

store chunk in file under a folder (specific for current file) then on upload completely merge them into a single file. 

 

if file size is less than 10 MB send file 1 chunk. 
if file_size >10MB && file_size < 100MB use 2 parallel chunks.  
if file_size >100MB  use 4 parallel chunks
if file_size >1GB  use 6 parallel chunks

*/


const express = require("express"); 
const fsPromises = require("fs/promises"); 
const fs = require("fs"); 
const cors = require("cors"); 
const app = express(); 

app.use(cors({origin : "*"}));

app.get("/", (req, res) => {
    res.send("hi")
})
app.post("/:filename", async (req, res) => {
    try{
        console.log(req.body); 
        const {filename} = req.params.filename; 

        // const {chunk} = req.body; 

        // console.log(filename + "-> ", chunk); 
        // const path = path.join(__dirname + `/files/${filename}.txt`);
        // const writeStream =  fs.createWriteStream(path, {flags : "a"}); 
        // writeStream.write(chunk); 
        // writeStream.end(); 
        // writeStream.on("error", (e) => {
        //     console.log(e); 
        //     res.status(500).json({status : 500, success : false, message : "internal server error"});     
        // })
        // res.status(200).json({status : 200, success : true, message : "Chunk added successfully"}); 
    }
    catch(error){
        console.log(error); 
        res.status(500).json({status : 500, success : false, message : "internal server error"});     
    }
})

app.listen(3000, () => console.log("SERVER RUNNING ON PORT : 3000")); 

