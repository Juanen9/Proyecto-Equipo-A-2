const express = require('express');

const router = express.Router();

const {
    userRegistration,
    activateUser,
    loginUser
} = require('../controllers/users');

router.post('/user', userRegistration);
router.get('/user/validate/:regCode', activateUser);
router.post('/user/login', loginUser);

module.exports = router;