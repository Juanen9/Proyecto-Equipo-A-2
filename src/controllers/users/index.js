const userRegistration = require('./userRegistration');
const activateUser = require('./activateUser');
const loginUser = require('./loginUser');
const adminRegistration = require('./adminRegistration');
const postExercise = require('./postExercise');
const postTraining = require('./postTraining');
const modifyExercise = require('./modifyExercise');
const deleteExercise = require('./deleteExercises');
const getExercises = require('./getExercises');
const getExercisesExtend = require('./getExercisesExtend');
const exerciseFilter = require('./exerciseFilter');

module.exports = {
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
}