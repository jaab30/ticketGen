const router = require("express").Router();
// import controllers
const controller = require("../../controllers/ticketController");
// import upload middleware
// const upload = require("../../middleware/upload");

const config = require("config");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const db = config.get("mongo_URI");

// uses /api

router.get("/tickets", controller.findAll);
router.post("/tickets", controller.save);
router.post("/ticket/comment/:id", controller.addComment);
// router.post("/ticket/image/upload", upload.single("file"), controller.imageUpload)
router.delete("/ticket/:id", controller.delete);

const storage = new GridFsStorage({

    url: db,
    file: (req, file) => {
        console.log("middleware");

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
console.log("STORAGE", storage);
console.log("MIDDLE")
const upload = multer({ storage });

router.post("/ticket/image/upload", upload.single("file"), (req, res) => {

    console.log("image", req.file);
    console.log("image", req.body);
    console.log("image", req.name);

    res.json({ file: req.file });


})




module.exports = router;