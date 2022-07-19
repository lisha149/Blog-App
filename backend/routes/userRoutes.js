const express = require("express");
const {
  registerUser,
  authUser,
  getAllUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(getAllUser);
module.exports = router;
