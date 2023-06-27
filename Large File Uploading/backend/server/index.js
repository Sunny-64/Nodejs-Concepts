const express = require("express");
const fsPromises = require("fs/promises");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors({ origin: "*" }));

if (!fs.existsSync(path.join(__dirname + `/uploads`))) {
    fs.mkdirSync(path.join(__dirname + `/uploads`));
}

let fd = 0;
let chunkCount = 0;


app.post("/upload/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    if (!fs.existsSync(path.join(__dirname + `/uploads/${filename}`))) {
      fs.mkdirSync(path.join(__dirname + `/uploads/${filename}`));
    }
    // fd = await fsPromises.open(path.join(__dirname + `/uploads/${filename}/${filename}`), "a"); 
    req.on("data", async (data) => {
      let chunk = data;
      chunkCount++;
      console.log("chunks sent : ", chunkCount);
    //   fd.appendFile(chunk);
       await fsPromises.appendFile(path.join(__dirname + `/uploads/${filename}/${filename}`), data); 
    });

    req.on("end", async (data) => {
      // append any data that's left
        if(data){
            await fsPromises.appendFile(path.join(__dirname + `/uploads/${filename}/${filename}`), data); 
        }
      console.log("file uploaded");

      // close the file
    //   await fd.close();
      console.log("file closed");
    });

    req.on("error", (error) => {
        console.log(error);
        return req.status(400).json({message : "error : " + error.message});  
    })

    res.status(200).json({
      status: 200,
      success: true,
      message: `chunks received : ${chunkCount}`,
    });

  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "error while creating folder",
      error: error.message,
    });
  }
});

app.listen(3000, () => console.log("SERVER RUNNING ON PORT : 3000"));

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
