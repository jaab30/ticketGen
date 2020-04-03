const router = require("express").Router();
const apiRoutes = require("./api");
const htmlRoutes = require("./html");
const userRoutes = require("./users");
// user Routes
router.use("/api/users", userRoutes);
// api Routes
router.use("/api", apiRoutes);
// html routes
router.use("/", htmlRoutes);

module.exports = router;

