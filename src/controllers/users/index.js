const userRegistration = require("./userRegistration");
const activateUser = require("./activateUser");
const loginUser = require("./loginUser");
const adminRegistration = require("./adminRegistration");
const modifyUser = require("./modifyUser");
const recoverPassword = require("./recoverPassword");
const resetPassword = require("./resetPassword");

module.exports = {
  userRegistration,
  activateUser,
  loginUser,
  adminRegistration,
  modifyUser,
  recoverPassword,
  resetPassword,
};
