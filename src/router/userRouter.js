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
  exerciseFilter,
  modifyUser,
  addLike,
  deleteLike,
  getOrderLikes,
  recoverPassword,
  resetPassword
} = require("../controllers/users");

router.get("/user/validate/:regCode", activateUser);
router.get("/user/exercises", verifyToken, getExercises);
router.get("/user/exercisesExtended/:idExercise", verifyToken, getExercisesExtend);
router.get('/user/exerciseFilter', verifyToken, exerciseFilter);
router.get('/user/getOrderLikes', verifyToken, getOrderLikes);
router.post("/user", userRegistration);
router.post("/user/admin", adminRegistration);
router.post("/user/login", loginUser);
router.post("/user/admin/training", verifyToken, postTraining);
router.post("/user/admin/exercise", verifyToken, postExercise);
router.post("/user/addlike/:exerciseName", verifyToken, addLike);
router.post("/user/recover-password", recoverPassword);
router.post("/user/reset-password", resetPassword);
router.put("/user/:idUser", verifyToken, modifyUser);
router.put("/user/exerciseModify/:idExercise", verifyToken,modifyExercise);
router.delete("/user/:idExercise", verifyToken,deleteExercise);
router.delete("/user/deletelike/:exerciseName", verifyToken, deleteLike);

module.exports = router;
