const router = require("express").Router();
// import controllers
const controller = require("../../controllers/ticketController");

// uses /api

router.get("/tickets", controller.findAll);
router.post("/tickets", controller.save);
router.delete("/ticket/:id", controller.delete);

module.exports = router;