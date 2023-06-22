console.log("hello"); 

let selectedFile = document.getElementById("file"); 
let upload = document.getElementById("upload"); 

let promisesArray = []; 

upload.addEventListener("click", (event) => {
    // stop the page from Refreshing.
    event.preventDefault(); 

    // 
    console.log(selectedFile.files[0]); 

    // create a file reader. File reader let's web browsers read files from the user's system asynchronously
    const reader = new FileReader(); 

    // load the file as buffer
    reader.readAsArrayBuffer(selectedFile.files[0]);

    // Read the file content 
    reader.onload = (event) => {

        let chunkSize = 1024 * 1024 * 2; // set chunk size to 2mbs
        let fileSize = event.target.result.byteLength; // file size

        let chunksAmountToBeUsed; 
        if(fileSize < 1024 * 1024 * 10){
            chunksAmountToBeUsed = 1; 
        }
        else if(fileSize < 1024 * 1024 * 100){
            chunksAmountToBeUsed = 2
        }
        else if(fileSize < 1024 * 1024 * 1024){
            chunksAmountToBeUsed = 4; 
        }
        else{
            chunksAmountToBeUsed = 6; 
        }

        let totalChunks = Math.ceil(fileSize/chunkSize); 

        let chunks = []; 
        // get the Array buffer
        let fileContent = event.target.result; 

        // Slice the array buffer in chunks
        for(let i = 0; i<totalChunks; i++){
            // Slice from start position and end position;
            let chunk = fileContent.slice(i * chunkSize, (i + 1) * chunkSize); 

            // check if chunks has the required no of chunks to be processed
            if(chunks.length === chunksAmountToBeUsed){
                // add one chunk at a time to promises array
                // let i = 1; 
                chunks.forEach((singleChunk, index) => {
                    promisesArray.push(sendChunks(singleChunk, index)); 
                }); 
                    
                // Reset the chunks
                chunks = []; 
                Promise.all(promisesArray)
            }

            // Add chunk into chunks array
            chunks.push(chunk); 
        }
    } 
}); 


const sendChunks = (chunk, index) => {

    // return a new promise so all the chunks can be processed parallelly
    return new Promise(async (resolve, reject) => {
        // send post request to the server
       try{
            // 
            const response = await fetch(`http://localhost:3000/file${index}`, {
                method : "post", 
                body : chunk, 
                "headers" : {
                    "Content-type" : "application/octet-stream"
                }
            }); 
            

            // if chunk sent successfully resolve else reject
            if(response.status === 200){
                resolve("chunk Resolved"); 
            }
            else{
                console.log(response); 
                reject("chunk rejected"); 
            }
       }
       catch(error){
            console.log(error.message); 
       }
    });
}
