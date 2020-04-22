const router = require("express").Router();
const auth = require("../../middleware/auth");
// import controllers
const UserController = require("../../controllers/usersController");

// uses /api/users

router.post("/register", UserController.register);
router.post("/auth", UserController.auth);
router.get("/user", auth, UserController.getUser);
router.put("/user/update/:id", auth, UserController.updateUser);


module.exports = router;