// const { time } = require("console");
// // const fs = require("fs/promises");

// // (async() => {

// //     const File = await fs.open("text.txt", "w")
// //     console.time();
// //     for(let i=0; i<1000000; i++){x
// //         try{
// //             fs.appendFile(File, "Noice\n",);
// //         } catch(e){
// //             console.log(e);
// //         }
// //     }
// //     console.timeEnd()
// // })();


// const fs = require("fs/promises");

// (async() => {
//     try{
//         const File = await fs.open("yo.txt", "w");
//         console.time();
//         const aaa = File.createWriteStream();
//         for(let i=0; i<1000000; i++){
//                 let buffer = Buffer.from(i+" ", 'utf-8')
//                 aaa.write(buffer)
//         }
//     } catch(e){
//         console.log(e);
//     }
    
    
//     console.timeEnd()
// })();



// let test = document.getElementById("test"); 
// test.addEventListener("click", async (e) => {
//   e.preventDefault(); 
//   console.log("hi")
//   try{
//     const res = await axios.post("http://localhost:3000/folder/hi"); 
//     console.log(res); 
//     if(res.status == 200){
//       console.log("folder created"); 
//     }
//     else{
//       console.log("failure");
//     }
// } 
// catch(error){
//   console.log(error.message); 
// } 
// })

