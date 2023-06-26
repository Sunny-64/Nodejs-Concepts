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
const path = require("path"); 
const { log } = require("console");


app.use(cors({origin : "*"}));

app.get("/", (req, res) => {
    res.send("hi")
})

let fd = 0;
let chunkCount = 0; 

(async() => {
    fd = await fsPromises.open("sonny.txt", "w"); 
})();


app.post("/", async (req, res) => {
    // const totalChunks = req.header('X-TOTAL-CHUNKS')
    // console.log(totalChunks);
    // console.time("Sonny");
    // const {filename} = req.params;
    // console.log(filename); 
    // try{
        req.on("data", async (chunk) => {
            // console.log(chunk.toString())
            // console.log("----------------------------------------------------------------------------------------------------")
            // console.log(chunk.toString())
            // const filePath = path.join(__dirname + `/files/${filename}.txt`);
            // console.log(filePath); 
            // const writeStream =  fs.createWriteStream(filePath, {flags : "a"}); 
            // let buffer = chunk.toString();
            // writeStream.write(chunk); 
            // writeStream.end(); 
            // writeStream.on("error", (e) => {
            //     console.log(e); 
            //     res.status(500).json({status : 500, success : false, message : "internal server error"});     
            // });
            console.log(chunk); 
            await fsPromises.appendFile(fd, chunk); 
            // console.timeEnd("Sonny");
        }); 

        req.on("end", async () => {

            // if(!err){
                // chunkCount++; 
                res.status(200).json({status : 200, success : true, message : "Chunk added successfully"});   
            // }
            // else{
            //      res.status(500).json({status : 500, success : false, message : "internal server error"});     
            // }
            // console.log(chunkCount);
            // if(chunkCount == totalChunks){
            //     await fd.close(); 
            //     console.log("file closed"); 
            //     return; 
            // }
        });
       
    // }
    // catch(error){
    //     console.log(error); 
    //     res.status(500).json({status : 500, success : false, message : "internal server error"});     
    // }
})

app.listen(3000, () => console.log("SERVER RUNNING ON PORT : 3000")); 


