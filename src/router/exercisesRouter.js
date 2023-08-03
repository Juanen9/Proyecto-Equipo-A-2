const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
  postExercise,
  postTraining,
  modifyExercise,
  deleteExercise,
  getExercises,
  getExercisesExtend,
  exerciseFilter,
  addLike,
  deleteLike,
  getOrderLikes,
} = require("../controllers/exercises");

router.get("/exercise/list", verifyToken, getExercises);
router.get(
  "/exercise/list-extended/:idExercise",
  verifyToken,
  getExercisesExtend
);
router.get("/exercise/filter", verifyToken, exerciseFilter);
router.get("/exercise/order-likes", verifyToken, getOrderLikes);
router.post("/exercise/add-training", verifyToken, postTraining);
router.post("/exercise/add-exercise", verifyToken, postExercise);
router.post("/exercise/add-like/:exerciseName", verifyToken, addLike);
router.put("/exercise/modify/:idExercise", verifyToken, modifyExercise);
router.delete("/exercise/delete/:idExercise", verifyToken, deleteExercise);
router.delete("/exercise/delete-like/:exerciseName", verifyToken, deleteLike);

module.exports = router;
