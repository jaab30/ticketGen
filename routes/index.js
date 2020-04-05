const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./users");

// user Routes
router.use("/api/users", userRoutes);
// api Routes
router.use("/api", apiRoutes);


module.exports = router;

