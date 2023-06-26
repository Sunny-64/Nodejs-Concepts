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


const fs = require("fs");

const file = fs.createWriteStream("file.txt");
console.time();

let i = 0;

const writeIt = () => {
  let canContinueWriting = true;

  while (i < 10000000000 && canContinueWriting) {
    const buff = Buffer.from(`${i} `, "utf-8");
    if (i === 9999999999) {
      file.end(buff);
    } else {
      canContinueWriting = file.write(buff);
    }
    i++;
  }

  if (i === 1000000) {
    file.end();
  }
};

file.on("drain", () => {
  writeIt();
});

file.on("finish", () => {
  console.timeEnd();
});

writeIt();