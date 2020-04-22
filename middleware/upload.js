// const config = require("config");
// const crypto = require("crypto");
// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");

// const db = config.get("mongo_URI");

// const storage = new GridFsStorage({

//     url: db,
//     file: (req, file) => {
//         console.log("middleware");

//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: "uploads"
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });
// console.log("STORAGE", storage);
// console.log("MIDDLE")
// const upload = multer({ storage });

// module.exports = upload;