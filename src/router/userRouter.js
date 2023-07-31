const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
  userRegistration,
  activateUser,
  loginUser,
  adminRegistration,
  postExercise,
  postTraining,
} = require("../controllers/users");

router.get("/user/validate/:regCode", activateUser);
router.post("/user", userRegistration);
router.post("/user/admin", adminRegistration);
router.post("/user/login", loginUser);
router.post("/user/admin/training", verifyToken, postTraining);
router.post("/user/admin/exercise", verifyToken, postExercise);

module.exports = router;
