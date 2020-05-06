const config = require("config");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");

const db = config.get("mongo_URI");

const storage = new GridFsStorage({

    url: db,
    file: (req, file) => {

        return new Promise((resolve, reject) => {

            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };

                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

module.exports = upload;