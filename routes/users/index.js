const router = require("express").Router();
const auth = require("../../middleware/auth");
// import controllers
const UserController = require("../../controllers/usersController");
// import upload middleware
const upload = require("../../middleware/upload");

// uses /api/users

router.get("/", auth, UserController.getAllUsers);
router.post("/register", UserController.register);
router.post("/auth", UserController.auth);
router.get("/user", auth, UserController.getUser);
router.put("/user/update/:id", auth, UserController.updateUser);
router.post("/user/image/upload", upload.single("file"), UserController.userImageUpload);

module.exports = router;