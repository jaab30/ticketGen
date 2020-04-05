const router = require("express").Router();
const auth = require("../../middleware/auth");
// import controllers
const UserController = require("../../controllers/usersController");

// uses /api

router.post("/register", UserController.register);
router.post("/auth", UserController.auth);
router.get("/user", auth, UserController.getUser);


module.exports = router;