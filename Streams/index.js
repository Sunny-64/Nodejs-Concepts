const fs = require("fs"); 
const http = require("http"); 

const server = http.createServer();  


server.on("request", (req, res) => {
    // fs.readFile("input.txt", (err, data) => {
    //     if(err) {
    //         console.log(err); 
    //     }
    //     else {
    //         const rStream = fs.createReadStream("input.txt"); 
    //         // res.end(rStream); 
    //         let prevData = ""; 
    //         rStream.on("data", (data) => {
    //             res.write(data); 
    //         }); 
    //         rStream.on("end", () => {
    //             res.end(); 
    //         })
    //     }
    // }); 
    // res.end(); 

    const rStream = fs.createReadStream("input.txt"); 
    rStream.pipe(res); 
}); 

server.listen(3000, "127.0.0.1"); 