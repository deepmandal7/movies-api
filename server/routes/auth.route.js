const router = require("express").Router();

const { registerUser, logIn } = require("../controllers");

router.post("/register", registerUser);
router.post("/login", logIn);

module.exports = router;
