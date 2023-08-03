const postExercise = require("./postExercise");
const postTraining = require("./postTraining");
const modifyExercise = require("./modifyExercise");
const deleteExercise = require("../exercises/deleteExercises");
const getExercises = require("../exercises/getExercises");
const getExercisesExtend = require("../exercises/getExercisesExtend");
const exerciseFilter = require("../exercises/exerciseFilter");
const addLike = require("../exercises/addLike");
const deleteLike = require("../exercises/deleteLike");
const getOrderLikes = require("./getOrderLikes");

module.exports = {
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
};
