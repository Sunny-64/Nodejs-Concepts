// const chunkSize = 2 * 1024 * 1024

// let totalChunks = 0

// let chunkCount = 0

// let fileSize = 0

// let sizeRemaining = 0

// let offset = 0

// let theFile = null

// let chunks = []
// let writePromises = []

// let foldername;

// let noOfChunks;

// let newFileName;

// let upload = document.getElementById('upload')

// upload.addEventListener('submit', async event => {
//   event.preventDefault();

//   const file = document.getElementById('file').files[0];
//   if (file.size > chunkSize) {
//     fileSize = file.size;
//     noOfChunks = 0
//     if(fileSize < 10*1024*1024)
//         noOfChunks = 1
//     else if(fileSize < 100*1024*1024)
//         noOfChunks = 2
//     else if(fileSize < 1000*1024*1024)
//         noOfChunks = 4
//     else noOfChunks = 6

//     newFileName = file.name;
//     // foldername = newFileName
//     theFile = file
//     sizeRemaining = fileSize
//     totalChunks = Math.ceil(fileSize / chunkSize)
//     readNextChunk();
//   }
// });

// async function readNextChunk(){
//   writePromises = []
//   if(sizeRemaining == 0 && chunks.length > 0){
//     console.log(newFileName);
//     for (const chunk of chunks){
//       writePromises.push(sendChunkToServer(chunk, totalChunks, noOfChunks, newFileName))
//     }
//     chunks = []
//     await Promise.all(writePromises);
//     return;
//   }
//   if(sizeRemaining > 0){
//     console.log(fileSize);
//     let chunk = null;
//     if(sizeRemaining < chunkSize){
//       chunk = (document.getElementById("file").files[0]).slice(fileSize-sizeRemaining, fileSize)
//       sizeRemaining = 0;
//     } else {
//       chunk = (document.getElementById("file").files[0]).slice((fileSize-sizeRemaining), (fileSize-sizeRemaining)+chunkSize);
//       sizeRemaining = (sizeRemaining-chunkSize);
//     }
//     console.log(chunk.toString());
//     if(chunks.length == noOfChunks){
//       for (const chunk of chunks){
//         writePromises.push(sendChunkToServer(chunk, totalChunks, noOfChunks, newFileName));
//       }
//       chunks = []
//       await Promise.all(writePromises);
//       writePromises = [];
//     }
//     if(!chunk){
//       return;
//     }
//     chunks.push(chunk);
//     chunkCount++;
//     if(chunks.length == 0) return;
//     readNextChunk();
//   }
//   return;
// }

// async function sendChunkToServer(chunk, totalChunks, noOfChunks, filename = "default.txt"){
//   // console.log(fileNameWithExt);
//     return new Promise(async (resolve, reject) => {
//         const res = await axios.post(`http://localhost:3000/upload/${filename}`, chunk, {headers: {"Content-Type": "application/json", 'X-Total-Chunks': totalChunks,'X-No-Of-Chunks': noOfChunks }})
//         // console.log(res);
//         if(res.status === 200){
//           console.log("chunk sent")
//             resolve("Successful transfer.")
//         }
//         else{
//           console.log("chunk rejected");
//           reject("Request failed")
//         }
//   });
// }

const chunkSize = 2 * 1024 * 1024;
let totalChunks = 0;
let chunkCount = 0;
let fileSize = 0;
let sizeRemaining = 0;
let offset = 0;
let theFile = null;
let noOfChunks = 0;
let filename;
let chunks = [];
let writePromises = [];

let upload = document.getElementById("upload");

upload.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = document.getElementById("file").files[0];
  if (file.size > chunkSize) {
    fileSize = file.size;
    filename = file.name;
    if (fileSize < 10 * 1024 * 1024) noOfChunks = 1;
    else if (fileSize < 100 * 1024 * 1024) noOfChunks = 2;
    else if (fileSize < 1000 * 1024 * 1024) noOfChunks = 4;
    else noOfChunks = 6;

    sizeRemaining = fileSize;
    totalChunks = Math.ceil(fileSize / chunkSize);
    let chunk = new Blob();
    readNextChunk();
  }
});

async function readNextChunk() {
  writePromises = [];

  //For when the remaining size of file to be sent is > chunk size
  if (sizeRemaining > 0) {
    let chunk;
    if (sizeRemaining < chunkSize && sizeRemaining !== 0) {
      chunk = document
        .getElementById("file")
        .files[0].slice(fileSize - sizeRemaining, fileSize);
      sizeRemaining = 0;
    } else if (sizeRemaining >= chunkSize) {
      chunk = document
        .getElementById("file")
        .files[0].slice(
          fileSize - sizeRemaining,
          fileSize - sizeRemaining + chunkSize
        );
      sizeRemaining = sizeRemaining - chunkSize;
    }

    chunkCount++;
    chunks.push(chunk);
    if (chunks.length === 0) return;

    //Send the chunks in parallel.
    if (chunks.length === noOfChunks) {
      for (const chunk of chunks) {
        const TempCount2 = chunkCount;
        writePromises.push(
          sendChunkToServer(
            chunk,
            totalChunks,
            noOfChunks,
            TempCount2,
            filename
          )
        );
      }

      chunks = [];
    }
    console.log(chunkCount);
    await Promise.all(writePromises);
    await readNextChunk();
  } else if (sizeRemaining === 0 && chunks.length > 0) {
    for (const chunk of chunks) {
      const TempCount1 = chunkCount;
      writePromises.push(
        sendChunkToServer(chunk, totalChunks, noOfChunks, TempCount1, filename)
      );
    }
    chunks = [];
    Promise.all(writePromises);
    writePromises = [];
    //Close the process.
    return;
  } else {
    return;
  }
}

async function sendChunkToServer(
  chunk,
  totalChunks,
  noOfChunks,
  TempCount3,
  filename
) {
  return new Promise(async (resolve, reject) => {
    console.log(TempCount3);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3000/upload/" + filename);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Total-Chunks", totalChunks);
    xhr.setRequestHeader("X-No-Of-Chunks", noOfChunks);
    xhr.setRequestHeader("X-Chunk-Count", TempCount3);

    xhr.onload = () => {
      if (xhr.status == 200) resolve(":)");
      else reject(":(");
    };

    xhr.onerror = () => {
      reject(";(");
    };

    xhr.send(chunk);
  });
}

// let noOfChunks = 0
//   if(fileSize < 10*1024*1024)
//       noOfChunks = 1
//   else if(fileSize < 100*1024*1024)
//       noOfChunks = 2
//   else if(fileSize < 1000*1024*1024)
//       noOfChunks = 4
//   else noOfChunks = 6

//

//     e.preventDefault();
//
//

//       let chunk = new Blob();

//       readNextChunk()

//

//

//
// });

// // let chunkSize = 1024 * 1024;

// // const readChunks = async (chunkSize, file) => {
// //     return new Promise((resolve, reject) => {
// //         let fileSize = file.size;
// //         let offset = 0;

// //         let reader = new FileReader();
// //         reader.onload()
// //     });
// // }

// // let upload = document.getElementById("upload");
// // upload.addEventListener("click", handleFileSelect);

// // function handleFileSelect(event) {
// //     event.preventDefault();
// //     // const file = event.target.files[0];
// //     let file = document.getElementById("file").files[0];

// //     const targetChunkSize = 2 * 1024 * 1024; // 2MB target chunk size

// //     const reader = file.stream().getReader();

// //     const strategy = new ByteLengthQueuingStrategy({ highWaterMark: targetChunkSize });

// //     const controller = new ReadableByteStreamController({
// //       start(controller) {
// //         readNextChunk();
// //       },
// //       cancel() {
// //         console.log('File processing canceled');
// //       }
// //     });

// //     function readNextChunk() {
// //       reader.read()
// //         .then(({ done, value }) => {
// //           if (done) {
// //             controller.close();
// //             console.log('File processing complete');
// //             return;
// //           }

// //           controller.enqueue(value);
// //           if (!controller.desiredSize) {
// //             controller.request();
// //           }

// //           readNextChunk();
// //         })
// //         .catch(error => {
// //           console.error('Error reading file:', error);
// //           controller.error(error);
// //         });
// //     }

// //     const readableStream = new ReadableByteStreamController();

// //     // Consume the chunks
// //     const reader2 = readableStream.getReader();
// //     reader2.read()
// //       .then(({ done, value }) => {
// //         // Process the final chunk or handle completion
// //         if (done) {
// //           console.log('File processing complete');
// //         } else {
// //           console.log('Processed chunks:', value);
// //         }
// //       })
// //       .catch(error => {
// //         console.error('Error reading file:', error);
// //       });
// //   }

// //     event.preventDefault();
// //     let file = document.getElementById("file").files[0];

// //     let chunkSize = 1024 * 1024 * 2; // set chunk size to 2mbs
// //     let fileSize = file.size; // file size

// //     let chunksAmountToBeUsed;
// //     if(fileSize < 1024 * 1024 * 10){
// //         chunksAmountToBeUsed = 1;
// //     }
// //     else if(fileSize < 1024 * 1024 * 100){
// //         chunksAmountToBeUsed = 2
// //     }
// //     else if(fileSize < 1024 * 1024 * 1024){
// //         chunksAmountToBeUsed = 4;
// //     }
// //     else{
// //         chunksAmountToBeUsed = 6;
// //     }
// //     // const chunkSize = 1024 * 1024; // Specify the desired chunk size

// //     // const reader = file.stream().getReader();

//     // const queueingStrategy = new ByteLengthQueuingStrategy({highWaterMark : (2 * 1024 * 1024)});

//     // const stream = new ReadableStream({
//     //     start(controller){
//     //         //...
//     //     },
//     //     pull(controller){
//     //         //...
//     //     },
//     //     cancel(err){
//     //         console.log("Stream error : ", err);
//     //     }
//     // }, queueingStrategy);

// //     let chunks = [];
// //     let promisesArray = [];
// //     function readNextChunk() {
// //         let totalChunksSize = 0;
// //         reader.read()
// //         .then(({ done, value }) => {
// //             if (done) {
// //                 console.log('File processing complete');

// //                 return;
// //             }
// //             // console.log(value.byteLength);
// //             totalChunksSize += value.byteLength;
// //             // console.log(value);
// //             const chunk = value;
// //             chunks.push(chunk); // Process the chunk here
// //             console.log("totalChunkSize : ",totalChunksSize , ">=", chunkSize, " : ",totalChunksSize >= chunkSize);
// //             if(totalChunksSize >= chunkSize){

// //                 // console.log("\n---------------------------------------------------------------------\n ", chunks);
// //                 totalChunksSize = 0;
// //                 let totalSize = 0;

// //                 // chunks.forEach((el, index) => {
// //                 //     console.log(el);
// //                 //     totalSize += el.byteLength;
// //                 // });

// //                 // console.log(totalSize);
// //                 chunks = [];
// //                 return;
// //             }
// //             readNextChunk();
// //         })
// //         .catch(error => {
// //             console.error('Error reading file:', error);
// //         });
// //     }
// //     readNextChunk();
// // });

// // function handleFileSelect

// // upload.addEventListener("click", async (e) => {
// //     e.preventDefault();
// //     let file = document.getElementById("file").files[0];
// //     // await readChunks(chunkSize, file);
// //     // console.log(file.size);
// //     // let reader = file.stream();
// //     // let stream = file.stream();
// //     // let reader = stream.getReader();
// //     const stream = new ReadableStream(file);

// //     for await(chunk of stream){
// //         console.log(chunk);
// //     }
// //     // reader.read().then(data => console.log(data));
// //     // console.log(reader);
// //     console.log("File Reading complete");
// // });

// // // console.log("hello");

// // let selectedFile = document.getElementById("file");
// // let upload = document.getElementById("upload");

// // let promisesArray = [];

// // // console.log(promisesArray);

// // upload.addEventListener("click", (event) => {
// //     // stop the page from Refreshing.
// //     event.preventDefault();

// //     //
// //     // console.log(selectedFile.files[0]);

// //     // create a file reader. File reader let's web browsers read files from the user's system
// //     const reader = new FileReader();

// //     // load the file as buffer

// //     // console.log(reader.readAsArrayBuffer(selectedFile.files[0]));
// //     reader.readAsArrayBuffer(selectedFile.files[0]);
// //     // Read the file content

// //     reader.onprogress = (event) => {
// //         console.log(event)
// //         // console.log(event)
// //         // console.time("start");

// //         // let chunkSize = 1024 * 1024 * 2; // set chunk size to 2mbs
// //         // let fileSize = event.target.result.byteLength; // file size

// //         // let chunksAmountToBeUsed;
// //         // if(fileSize < 1024 * 1024 * 10){
// //         //     chunksAmountToBeUsed = 1;
// //         // }
// //         // else if(fileSize < 1024 * 1024 * 100){
// //         //     chunksAmountToBeUsed = 2
// //         // }
// //         // else if(fileSize < 1024 * 1024 * 1024){
// //         //     chunksAmountToBeUsed = 4;
// //         // }
// //         // else{
// //         //     chunksAmountToBeUsed = 6;
// //         // }

// //         // let totalChunks = Math.ceil(fileSize/chunkSize);
// //         // console.log(totalChunks)
// //         // // 307
// //         // // 642240650
// //         // // console.log(fileSize)

// //         // let chunks = [];
// //         // // get the Array buffer
// //         // // console.log(chunks)
// //         // // console.log(totalChunks)
// //         // // console.log(chunksAmountToBeUsed)
// //         // let fileContent = event.target.result;
// //         // // console.log(fileContent);
// //         // // Slice the array buffer in chunks
// //         // for(let i = 0; i<=totalChunks; i++){
// //         //     console.log(i);
// //         //     // Slice from start position and end position;
// //         //     let chunk = fileContent.slice(i * chunkSize, (i + 1) * chunkSize);
// //         //     // console.log(chunk);
// //         //     // check if chunks has the required no of chunks to be processed
// //         //     if(chunks.length === chunksAmountToBeUsed){
// //         //         // add one chunk at a time to promises array
// //         //         // let i = 1;
// //         //         // console.log("reached the the if condition")
// //         //         // console.log(chunks);
// //         //         chunks.forEach((singleChunk, index) => {
// //         //             promisesArray.push(sendChunks(singleChunk, totalChunks));
// //         //         });

// //         //         // Reset the chunks
// //         //         chunks = [];
// //         //         // console.log("chunks reset : ", chunks );
// //         //         Promise.all(promisesArray)
// //         //     }

// //         //     // Add chunk into chunks array
// //         //     chunks.push(chunk);
// //         // }
// //         // chunks.forEach((chunk) => {
// //         //     promisesArray.push(sendChunks(chunk, totalChunks));
// //         // });
// //         // try{
// //         //     Promise.all(promisesArray);
// //         //     promisesArray = [];
// //         // }
// //         // catch(error){
// //         //     console.log(error)
// //         // }
// //         // console.timeEnd("start");
// //     }
// // });

// // const sendChunks = (chunk, totalChunks) => {

// //     // return a new promise so all the chunks can be processed parallelly
// //     return new Promise(async (resolve, reject) => {
// //         // send post request to the server
// //         // console.log("returning in promise");
// //        try{
// //             const response = await fetch(`http://localhost:3000/file`, {
// //                 method : "post",
// //                 // body : JSON.stringify({buffer : chunk}),
// //                 body : chunk,
// //                 "headers" : {
// //                     "Content-type" : "application/octet-stream",
// //                     "X-TOTAL-CHUNKS" : totalChunks
// //                     // "Content-type" : "application/json"
// //                 }
// //             });
// //             console.log(response)
// //             // if chunk sent successfully resolve else reject
// //             if(response.status === 200){
// //                 console.log("resolved")
// //                 resolve("chunk Resolved");
// //             }
// //             else{
// //                 console.log(response);
// //                 reject("chunk rejected");
// //             }
// //        }
// //        catch(error){
// //             console.log(error.message);
// //        }
// //     });
// // }

// // const dontRefresh = (event) => {
// //     event.preventDefault();
// // }

// // let upload = document.getElementById("upload");
// // let promisesArray = [];
// // upload.addEventListener("click", event => {
// //     event.preventDefault();
// //     let file = document.getElementById("file").files[0];

// //     let fileSize = file.size;
// //     let chunksAmountToBeUsed;

// //     if(fileSize < 1024 * 1024 * 10){
// //         chunksAmountToBeUsed = 1;
// //     }
// //     else if(fileSize < 1024 * 1024 * 100){
// //         chunksAmountToBeUsed = 2
// //     }
// //     else if(fileSize < 1024 * 1024 * 1024){
// //         chunksAmountToBeUsed = 4;
// //     }
// //     else{
// //         chunksAmountToBeUsed = 6;
// //     }

// //     const chunkSize = 2 * 1024 * 1024;

// //     let totalNoOfChunks = fileSize / chunkSize;

// //     let chunksUsed = 0;

// //     let offset = 0;

// //     let chunks = [];

// //     //  chunking logic
// //     // while(chunksUsed <= totalNoOfChunks){

// //         const chunk = file.slice(offset, offset + chunkSize);

// //         offset += chunkSize;

// //         chunks.push(chunk);

// //         if(chunks.length >= chunksAmountToBeUsed){

// //             chunks.forEach((el, i) => {
// //                 promisesArray.push(sendChunks(el));
// //             });

// //             chunks = [];

// //             Promise.all(promisesArray);
// //         }
// //     // console.log(chunks);

// // });

// // async function sendChunks(el) {
// //     // console.log("e")
// //     return new Promise((resolve, reject) => {
// //         console.log("hi")
// //         const apiUrl = "http://localhost:3000/";

// //         axios.post(apiUrl, el)
// //         .then(res => {

// //             console.log(res);

// //             if(res.status == 200){
// //                 console.log("sent")/
// //                 resolve("success");
// //             }

// //             else{

// //                 reject("failed");

// //             }
// //         })
// //         .catch(err => {
// //             console.log(err);
// //         });
// //     });
// // }

// function handleFileSelect(event) {
//     const file = event.target.files[0];
//     const chunkSize = 2 * 1024 * 1024; // 2MB chunk size

//     // const reader = file.stream().getReader();

//     let offset = 0;

//     function readNextChunk() {

//           let remainingBytes = chunkSize;
//           let currentOffset = 0;

//           while (remainingBytes > 0 && currentOffset < value.byteLength) {
//             const chunk = value.slice(currentOffset, currentOffset + remainingBytes);

//             // Process the chunk here

//             remainingBytes -= chunk.byteLength;
//             currentOffset += chunk.byteLength;
//           }

//           offset += currentOffset;

//           if (remainingBytes > 0) {
//             readNextChunk();
//           }
//         // })
//         // .catch(error => {
//         //   console.error('Error reading file:', error);
//         // });
//     }

//     readNextChunk();
//   }

// let upload = document.getElementById("upload");
// let promisesArray = [];
// upload.addEventListener("click", event => {
//     event.preventDefault();

//     let fileSize = file.size;
// //     let chunksAmountToBeUsed;

// //     if(fileSize < 1024 * 1024 * 10){
// //         chunksAmountToBeUsed = 1;
// //     }
// //     else if(fileSize < 1024 * 1024 * 100){
// //         chunksAmountToBeUsed = 2
// //     }
// //     else if(fileSize < 1024 * 1024 * 1024){
// //         chunksAmountToBeUsed = 4;
// //     }
// //     else{
// //         chunksAmountToBeUsed = 6;
// //     }

// //     const chunkSize = 2 * 1024 * 1024;

// //     let totalNoOfChunks = fileSize / chunkSize;

// //     let chunksUsed = 0;

// //     let offset = 0;

// //     let chunks = [];

// //     //  chunking logic
// //     // while(chunksUsed <= totalNoOfChunks){

// //         const chunk = file.slice(offset, offset + chunkSize);

// //         offset += chunkSize;

// //         chunks.push(chunk);

// //         if(chunks.length >= chunksAmountToBeUsed){

// //             chunks.forEach((el, i) => {
// //                 promisesArray.push(sendChunks(el));
// //             });

// //             chunks = [];

// //             Promise.all(promisesArray);
// //         }
// //     // console.log(chunks);

// // });

// // async function sendChunks(el) {
// //     // console.log("e")
// //     return new Promise((resolve, reject) => {
// //         console.log("hi")
// //         const apiUrl = "http://localhost:3000/";

// //         axios.post(apiUrl, el)
// //         .then(res => {

// //             console.log(res);

// //             if(res.status == 200){
// //                 console.log("sent")/
// //                 resolve("success");
// //             }

// //             else{

// //                 reject("failed");

// //             }
// //         })
// //         .catch(err => {
// //             console.log(err);
// //         });
// //     });

// });
