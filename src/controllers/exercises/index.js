const postExercise = require("./postExercise");
const postTraining = require("./postTraining");
const modifyExercise = require("./modifyExercise");
const deleteExercise = require("./deleteExercises");
const getExercises = require("./getExercises");
const getExercisesExtend = require("./getExercisesExtend");
const exerciseFilter = require("./exerciseFilter");
const addLike = require("./addLike");
const deleteLike = require("./deleteLike");
const getOrderLikes = require("./getOrderLikes");
const addFav = require('./addFav');
const getFav = require('./getFav');

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
  addFav,
  getFav
};