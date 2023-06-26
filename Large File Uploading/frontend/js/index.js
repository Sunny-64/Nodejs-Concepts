// let chunkSize = 1024 * 1024; 

// const readChunks = async (chunkSize, file) => {
//     return new Promise((resolve, reject) => {
//         let fileSize = file.size; 
//         let offset = 0; 

//         let reader = new FileReader(); 
//         reader.onload()
//     }); 
// }

// let upload = document.getElementById("upload"); 
// upload.addEventListener("click", handleFileSelect); 


// function handleFileSelect(event) {
//     event.preventDefault(); 
//     // const file = event.target.files[0];
//     let file = document.getElementById("file").files[0]; 

//     const targetChunkSize = 2 * 1024 * 1024; // 2MB target chunk size
  
//     const reader = file.stream().getReader();
  
//     const strategy = new ByteLengthQueuingStrategy({ highWaterMark: targetChunkSize });

//     const controller = new ReadableByteStreamController({
//       start(controller) {
//         readNextChunk();
//       },
//       cancel() {
//         console.log('File processing canceled');
//       }
//     });
  
//     function readNextChunk() {
//       reader.read()
//         .then(({ done, value }) => {
//           if (done) {
//             controller.close();
//             console.log('File processing complete');
//             return;
//           }
  
//           controller.enqueue(value);
//           if (!controller.desiredSize) {
//             controller.request();
//           }
  
//           readNextChunk();
//         })
//         .catch(error => {
//           console.error('Error reading file:', error);
//           controller.error(error);
//         });
//     }
  
//     const readableStream = new ReadableByteStreamController();
  
//     // Consume the chunks
//     const reader2 = readableStream.getReader();
//     reader2.read()
//       .then(({ done, value }) => {
//         // Process the final chunk or handle completion
//         if (done) {
//           console.log('File processing complete');
//         } else {
//           console.log('Processed chunks:', value);
//         }
//       })
//       .catch(error => {
//         console.error('Error reading file:', error);
//       });
//   }
  





//     event.preventDefault();     
//     let file = document.getElementById("file").files[0]; 

//     let chunkSize = 1024 * 1024 * 2; // set chunk size to 2mbs
//     let fileSize = file.size; // file size

//     let chunksAmountToBeUsed; 
//     if(fileSize < 1024 * 1024 * 10){
//         chunksAmountToBeUsed = 1; 
//     }
//     else if(fileSize < 1024 * 1024 * 100){
//         chunksAmountToBeUsed = 2
//     }
//     else if(fileSize < 1024 * 1024 * 1024){
//         chunksAmountToBeUsed = 4; 
//     }
//     else{
//         chunksAmountToBeUsed = 6; 
//     }
//     // const chunkSize = 1024 * 1024; // Specify the desired chunk size
  
//     // const reader = file.stream().getReader();



   
















    // const queueingStrategy = new ByteLengthQueuingStrategy({highWaterMark : (2 * 1024 * 1024)});

    // const stream = new ReadableStream({
    //     start(controller){
    //         //...
    //     }, 
    //     pull(controller){
    //         //... 
    //     }, 
    //     cancel(err){
    //         console.log("Stream error : ", err);
    //     }
    // }, queueingStrategy); 
  
//     let chunks = []; 
//     let promisesArray = []; 
//     function readNextChunk() {
//         let totalChunksSize = 0; 
//         reader.read()
//         .then(({ done, value }) => {
//             if (done) {
//                 console.log('File processing complete');
              
//                 return;
//             }  
//             // console.log(value.byteLength); 
//             totalChunksSize += value.byteLength; 
//             // console.log(value);
//             const chunk = value; 
//             chunks.push(chunk); // Process the chunk here
//             console.log("totalChunkSize : ",totalChunksSize , ">=", chunkSize, " : ",totalChunksSize >= chunkSize); 
//             if(totalChunksSize >= chunkSize){

//                 // console.log("\n---------------------------------------------------------------------\n ", chunks); 
//                 totalChunksSize = 0; 
//                 let totalSize = 0; 
                
//                 // chunks.forEach((el, index) => {
//                 //     console.log(el); 
//                 //     totalSize += el.byteLength; 
//                 // });
                
//                 // console.log(totalSize); 
//                 chunks = []; 
//                 return;
//             }
//             readNextChunk();
//         })
//         .catch(error => {
//             console.error('Error reading file:', error);
//         });
//     }
//     readNextChunk();
// });



// function handleFileSelect
  

// upload.addEventListener("click", async (e) => {
//     e.preventDefault(); 
//     let file = document.getElementById("file").files[0]; 
//     // await readChunks(chunkSize, file); 
//     // console.log(file.size); 
//     // let reader = file.stream(); 
//     // let stream = file.stream(); 
//     // let reader = stream.getReader(); 
//     const stream = new ReadableStream(file); 

//     for await(chunk of stream){
//         console.log(chunk); 
//     }
//     // reader.read().then(data => console.log(data)); 
//     // console.log(reader); 
//     console.log("File Reading complete");
// }); 




















// // console.log("hello"); 

// let selectedFile = document.getElementById("file"); 
// let upload = document.getElementById("upload"); 

// let promisesArray = []; 

// // console.log(promisesArray); 

// upload.addEventListener("click", (event) => {
//     // stop the page from Refreshing.
//     event.preventDefault(); 

//     // 
//     // console.log(selectedFile.files[0]); 

//     // create a file reader. File reader let's web browsers read files from the user's system 
//     const reader = new FileReader(); 

//     // load the file as buffer

//     // console.log(reader.readAsArrayBuffer(selectedFile.files[0]));
//     reader.readAsArrayBuffer(selectedFile.files[0]); 
//     // Read the file content 
    
//     reader.onprogress = (event) => {
//         console.log(event)
//         // console.log(event)
//         // console.time("start"); 

//         // let chunkSize = 1024 * 1024 * 2; // set chunk size to 2mbs
//         // let fileSize = event.target.result.byteLength; // file size

//         // let chunksAmountToBeUsed; 
//         // if(fileSize < 1024 * 1024 * 10){
//         //     chunksAmountToBeUsed = 1; 
//         // }
//         // else if(fileSize < 1024 * 1024 * 100){
//         //     chunksAmountToBeUsed = 2
//         // }
//         // else if(fileSize < 1024 * 1024 * 1024){
//         //     chunksAmountToBeUsed = 4; 
//         // }
//         // else{
//         //     chunksAmountToBeUsed = 6; 
//         // }

//         // let totalChunks = Math.ceil(fileSize/chunkSize); 
//         // console.log(totalChunks) 
//         // // 307
//         // // 642240650
//         // // console.log(fileSize)

//         // let chunks = []; 
//         // // get the Array buffer
//         // // console.log(chunks)
//         // // console.log(totalChunks)
//         // // console.log(chunksAmountToBeUsed)
//         // let fileContent = event.target.result; 
//         // // console.log(fileContent); 
//         // // Slice the array buffer in chunks
//         // for(let i = 0; i<=totalChunks; i++){
//         //     console.log(i); 
//         //     // Slice from start position and end position;
//         //     let chunk = fileContent.slice(i * chunkSize, (i + 1) * chunkSize); 
//         //     // console.log(chunk); 
//         //     // check if chunks has the required no of chunks to be processed
//         //     if(chunks.length === chunksAmountToBeUsed){
//         //         // add one chunk at a time to promises array
//         //         // let i = 1; 
//         //         // console.log("reached the the if condition")
//         //         // console.log(chunks);
//         //         chunks.forEach((singleChunk, index) => {
//         //             promisesArray.push(sendChunks(singleChunk, totalChunks)); 
//         //         }); 
                    
//         //         // Reset the chunks
//         //         chunks = []; 
//         //         // console.log("chunks reset : ", chunks ); 
//         //         Promise.all(promisesArray)
//         //     }

//         //     // Add chunk into chunks array
//         //     chunks.push(chunk); 
//         // }
//         // chunks.forEach((chunk) => {
//         //     promisesArray.push(sendChunks(chunk, totalChunks)); 
//         // }); 
//         // try{
//         //     Promise.all(promisesArray); 
//         //     promisesArray = []; 
//         // }
//         // catch(error){
//         //     console.log(error)
//         // }
//         // console.timeEnd("start");
//     } 
// }); 

// const sendChunks = (chunk, totalChunks) => {

//     // return a new promise so all the chunks can be processed parallelly
//     return new Promise(async (resolve, reject) => {
//         // send post request to the server
//         // console.log("returning in promise"); 
//        try{
//             const response = await fetch(`http://localhost:3000/file`, {
//                 method : "post", 
//                 // body : JSON.stringify({buffer : chunk}), 
//                 body : chunk, 
//                 "headers" : {
//                     "Content-type" : "application/octet-stream", 
//                     "X-TOTAL-CHUNKS" : totalChunks
//                     // "Content-type" : "application/json"
//                 }
//             }); 
//             console.log(response)
//             // if chunk sent successfully resolve else reject
//             if(response.status === 200){
//                 console.log("resolved")
//                 resolve("chunk Resolved"); 
//             }
//             else{
//                 console.log(response); 
//                 reject("chunk rejected"); 
//             }
//        }
//        catch(error){
//             console.log(error.message); 
//        }
//     });
// }


// const dontRefresh = (event) => {
//     event.preventDefault(); 
// }



// let upload = document.getElementById("upload");
// let promisesArray = [];  
// upload.addEventListener("click", event => {
//     event.preventDefault(); 
//     let file = document.getElementById("file").files[0]; 

//     let fileSize = file.size; 
//     let chunksAmountToBeUsed; 

//     if(fileSize < 1024 * 1024 * 10){
//         chunksAmountToBeUsed = 1; 
//     }
//     else if(fileSize < 1024 * 1024 * 100){
//         chunksAmountToBeUsed = 2
//     }
//     else if(fileSize < 1024 * 1024 * 1024){
//         chunksAmountToBeUsed = 4; 
//     }
//     else{
//         chunksAmountToBeUsed = 6; 
//     }

//     const chunkSize = 2 * 1024 * 1024; 

//     let totalNoOfChunks = fileSize / chunkSize; 

//     let chunksUsed = 0; 

//     let offset = 0; 
    
//     let chunks = [];
    
//     //  chunking logic
//     // while(chunksUsed <= totalNoOfChunks){

//         const chunk = file.slice(offset, offset + chunkSize);

//         offset += chunkSize; 

//         chunks.push(chunk); 

//         if(chunks.length >= chunksAmountToBeUsed){

//             chunks.forEach((el, i) => {
//                 promisesArray.push(sendChunks(el)); 
//             }); 
            
//             chunks = []; 

//             Promise.all(promisesArray); 
//         }
//     // console.log(chunks);
   
// }); 


// async function sendChunks(el) {
//     // console.log("e")
//     return new Promise((resolve, reject) => {
//         console.log("hi")
//         const apiUrl = "http://localhost:3000/"; 

//         axios.post(apiUrl, el)
//         .then(res => {

//             console.log(res);

//             if(res.status == 200){
//                 console.log("sent")/ 
//                 resolve("success"); 
//             }

//             else{

//                 reject("failed"); 

//             }
//         })
//         .catch(err => {
//             console.log(err); 
//         }); 
//     }); 
// }


function handleFileSelect(event) {
    const file = event.target.files[0];
    const chunkSize = 2 * 1024 * 1024; // 2MB chunk size
  
    // const reader = file.stream().getReader();
  
    let offset = 0;
  
    function readNextChunk() {
    //   reader.read()
    //     .then(({ done, value }) => {
    //       if (done) {
    //         console.log('File processing complete');
    //         return;
    //       }
  
          let remainingBytes = chunkSize;
          let currentOffset = 0;
  
          while (remainingBytes > 0 && currentOffset < value.byteLength) {
            const chunk = value.slice(currentOffset, currentOffset + remainingBytes);
  
            // Process the chunk here
  
            remainingBytes -= chunk.byteLength;
            currentOffset += chunk.byteLength;
          }
  
          offset += currentOffset;
  
          if (remainingBytes > 0) {
            readNextChunk();
          }
        // })
        // .catch(error => {
        //   console.error('Error reading file:', error);
        // });
    }
  
    readNextChunk();
  }
  

let upload = document.getElementById("upload");
let promisesArray = [];  
upload.addEventListener("click", event => {
    event.preventDefault(); 

}); 