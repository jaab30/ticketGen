const router = require("express").Router();
const auth = require("../../middleware/auth");
// import controllers
const UserController = require("../../controllers/usersController");

// uses /api

// @route GET api/users
// @desc Get All Items
// @access Public

router.post("/register", UserController.register);
router.post("/auth", UserController.auth);
router.get("/user", auth, UserController.getUser);
// router.post("/", UserController.save);
// router.delete("/:id", UserController.delete);

module.exports = router;