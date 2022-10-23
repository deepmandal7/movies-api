const router = require("express").Router();

const authRoute = require("./auth.route");
const dashboardRoute = require("./dashboard.route");

router.use("/auth", authRoute);
router.use("/dashboard", dashboardRoute);

module.exports = router;
