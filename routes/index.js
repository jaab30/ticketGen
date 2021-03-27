const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./users");
const path = require("path");

// Check health
router.get('/health', (req, res) => {
    res.json({status: 'alive'});
  });
// user Routes
router.use("/api/users", userRoutes);
// api Routes
router.use("/api", apiRoutes);
// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;

