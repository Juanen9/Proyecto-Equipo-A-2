const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
  userRegistration,
  activateUser,
  loginUser,
  adminRegistration,
  modifyUser,
  recoverPassword,
  resetPassword,
  getUserData,
  activateEmail,
  checkTokenValidity
} = require("../controllers/users");

router.get("/user/check-token", checkTokenValidity);
router.get("/user/email-validate/:emailCode", activateEmail);
router.get("/user/validate/:regCode", activateUser);
router.get("/get-user", verifyToken, getUserData)
router.post("/user", userRegistration);
router.post("/user/admin", adminRegistration);
router.post("/user/login", loginUser);
router.post("/user/recover-password", recoverPassword);
router.post("/user/reset-password", resetPassword);
router.put("/user/:idUser", verifyToken, modifyUser);

module.exports = router;
