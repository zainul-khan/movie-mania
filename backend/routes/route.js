const router = require("express").Router()
const {home, forgetPassword, resetPassword, contact, signup, login, validuser, logout} = require("../controllers/controller")
const verifyToken = require("../middleware/verifyToken");

router.get("/", home);
router.post("/forget-password", forgetPassword);
router.get("/reset-password", resetPassword);
router.get("/contact", contact);
router.get("/signup", signup);
router.post("/login", login);
router.get("/validuser", verifyToken, validuser)
router.post("/logout", verifyToken, logout);


module.exports = router