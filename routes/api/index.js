const router = require("express").Router();
// import controllers
const controller = require("../../controllers/ticketController");
// import upload middleware
const upload = require("../../middleware/upload");

// uses /api
router.get("/tickets", controller.findAll);
router.post("/tickets", controller.save);
router.post("/tickets/newimage/upload", upload.single("file"), controller.imageUploadNewTix)
router.post("/ticket/comment/:id", controller.addComment);
router.delete("/ticket/:id", controller.delete);

router.get("/ticket/files", controller.findFiles);
router.get("/ticket/file/:filename", controller.findOneFile);
router.get("/ticket/image/:imagename", controller.findOneImage);
router.post("/ticket/image/upload", upload.single("file"), controller.imageUpload)



module.exports = router;