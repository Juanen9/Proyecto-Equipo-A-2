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
const getTraining = require('./getTraining');
const getFav = require('./getFav');
const deleteFavs = require ('./deleteFavs');
const getLikes = require('./getLikes');

module.exports = {
  postExercise,
  postTraining,
  modifyExercise,
  deleteExercise,
  getExercises,
  getTraining,
  getExercisesExtend,
  exerciseFilter,
  addLike,
  deleteLike,
  getOrderLikes,
  addFav,
  getFav,
  deleteFavs,
  getLikes
};
