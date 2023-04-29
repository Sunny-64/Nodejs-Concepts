const multer = require("multer");
const path = require("path"); 

console.log(path.join(__dirname + "/../public/uploads"))
var location = path.join(__dirname + "/../public/uploads")

const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, location + "/avatar");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
});

const uploadResume = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, location + "/resume");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
      },
    }),
  });

// const uploadResume = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, location + "/resume");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
//   }),
// });

module.exports = {
    uploadAvatar, 
    uploadResume
};
