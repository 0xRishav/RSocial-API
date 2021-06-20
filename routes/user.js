const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user_controller");

router.post("/signup", UserController.signUpUser);
router.post("/signin", UserController.signInUser);

module.exports = router;
