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
  modifyExercise,
  deleteExercise,
  getExercises,
  getExercisesExtend,
  exerciseFilter
} = require("../controllers/users");

router.get("/user/validate/:regCode", activateUser);
router.get("/user/exercises", verifyToken, getExercises);
router.get("/user/exercisesExtended/:idExercise", verifyToken, getExercisesExtend);
router.get('/user/exerciseFilter/:typology/:muscleGroup', verifyToken, exerciseFilter);
router.post("/user", userRegistration);
router.post("/user/admin", adminRegistration);
router.post("/user/login", loginUser);
router.post("/user/admin/training", verifyToken, postTraining);
router.post("/user/admin/exercise", verifyToken, postExercise);
router.put("/user/:idExercise", verifyToken,modifyExercise);
router.delete("/user/:idExercise", verifyToken,deleteExercise)

module.exports = router;
