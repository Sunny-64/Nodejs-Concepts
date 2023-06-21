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
const path = require("path"); 
const app = express(); 

const txtFilePath = path.join(__dirname + "/../files/textFile.txt"); 

const readFileDataInChunks = async () => {
    try{
        const fd = await fsPromises.open(txtFilePath, 'r');
        // console.log((await fd.stat()).size); 
        const fileSize = (await fd.stat()).size; 
        let chunkAmountToBeUsed; 
        
        console.log(fileSize); 
        console.log( 1024 * 1024 * 10);

        if(chunkAmountToBeUsed < 1024 * 1024 * 10){
            chunkAmountToBeUsed = 1; 
        }
       
        else if(fileSize < 1024 * 1024 * 100){
            chunkAmountToBeUsed = 2; 
        }
        else if(fileSize < 1024 * 1024 * 1024){
            chunkAmountToBeUsed =  4; 
        }
        else{
            chunkAmountToBeUsed = 6; 
        }

        // totalNoOfChunks =  Math.ceil(fileSize/chunkAmountToBeUsed);
        let chunks = []; 
        let reader = fd.createReadStream({highWaterMark : 1024 * 1024 * 2}); 
        console.log(chunkAmountToBeUsed);
        let i = 0; 
        reader.on("data", async(chunk) => {
             if(i < chunkAmountToBeUsed){
                console.log("------------------------------------------------------------------------------------------------------------")
                chunks.push(chunk);
                i++
             } 
        });
        reader.on("end", async () => {
            console.log("chunks over"); 
            // console.log(chunks)
        });  
    }

    catch(error){
        console.log(error);
    }
}

// const writeParallel = async (start,chunk) => {
//   try{
//     let fileToBeWrittenPath = path.join(__dirname + "/temp.txt"); 
//     let openFile = await fsPromises.open(fileToBeWrittenPath); 
//     openFile.createWriteStream(chunk, {start : start})
    
//     await openFile.close(); 
//   }
//   catch(error){
//     console.log(error); 
//   }
// } 


readFileDataInChunks(); 

app.listen(3000, () => console.log("SERVER RUNNING ON PORT : 3000")); 