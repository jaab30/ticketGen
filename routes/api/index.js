const router = require("express").Router();
// import controllers
const controller = require("../../controllers/boilerController");

// uses /api

// @route GET api/boiler
// @desc Get All Items
// @access Public

router.get("/items", controller.findAll);
router.post("/items", controller.save);
router.delete("/items/:id", controller.delete);

module.exports = router;