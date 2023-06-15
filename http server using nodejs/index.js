const http = require("http"); 

let tasks = [
    {
        id : 1, 
        task : "Study nodejs", 
        importance : "high"
    }, 
    {
        id : 2, 
        task : "Study cryptography", 
        importance : "moderate"
    },
    {
        id : 3, 
        task : "play chess", 
        importance : "low"
    }
]

const server = http.createServer((req, res) => {    
    if(req.url === "/"){
        res.end("This is the home route")
    }
    else if(req.url === "/task/add"){
        res.write("Add task from this route");
//	console.log(req)
       // res.end(JSON.stringfy({1 : "hello world"}));
	   let data = {key1 : "hello", key2 : "world"};
	   // let payload = JSON.stringify(req); 
	  res.end();
    }

    else if(req.url === "/tasks"){
        res.write(`
        <table border="1" cellspacing="10px" cellpadding="10px"> 
            <tr>
                <th> Task Id </th>
                <th> Task </th>
                <th> Importance </th>
            </tr> 
        `)

       tasks.forEach(element => {
            res.write(
            `<tr>  
                <td>${element.id}</td> 
                <td>${element.task} </td> 
                <td>${element.importance}</td>     
            </tr>`
            )
       })
        res.write("</table>");
        res.end(); 
    }
    else if(req.url === "/task/delete?id"){
        res.write("Delete Task from here"); 
    }
    else {
        res.writeHead(404, "Page not found", {"content-type" : "text/html"});
        res.end("Invalid Route");
    }

}); 

server.listen(3000, () => {
	console.log("Server Running at Port : 3000"); 
})
