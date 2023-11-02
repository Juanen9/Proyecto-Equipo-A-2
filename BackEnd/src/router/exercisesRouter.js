const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
  postExercise,
  postTraining,
  modifyExercise,
  deleteExercise,
  deleteTraining,
  getExercises,
  getExercisesExtend,
  exerciseFilter,
  getTraining,
  addLike,
  deleteLike,
  getOrderLikes,
  addFav,
  getFav,
  deleteFavs,
  getLikes
} = require("../controllers/exercises");

router.get("/exercise/list", verifyToken, getExercises);
router.get("/training/list", verifyToken, getTraining)
router.get(
  "/exercise/list-extended/:idExercise",
  verifyToken,
  getExercisesExtend
);
router.get("/exercise/filter", verifyToken, exerciseFilter);
router.get("/exercise/order-likes", verifyToken, getOrderLikes);
router.get('/exercise/favs', verifyToken, getFav);
router.get('/exercise/likes', verifyToken, getLikes);
router.post("/exercise/add-training", verifyToken, postTraining);
router.post("/exercise/add-exercise", verifyToken, postExercise);
router.post("/exercise/add-like/:idExercise", verifyToken, addLike);
router.post("/exercise/add-fav/:idExercise", verifyToken, addFav);
router.put("/exercise/modify/:idExercise", verifyToken, modifyExercise);
router.delete("/exercise/delete/:idExercise", verifyToken, deleteExercise);
router.delete("/training/delete/:idTraining", verifyToken, deleteTraining);
router.delete("/exercise/delete-like/:idExercise", verifyToken, deleteLike);
router.delete("/exercise/delete-favs/:idExercise", verifyToken, deleteFavs);

module.exports = router;
