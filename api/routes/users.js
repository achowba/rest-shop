const express = require("express");
const router = express.Router();

const { checkAuth } = require('./../utils/auth');
const UserController = require('./../controllers/users');

// create a new user
router.post('/signup', UserController.createUser);

// route to authenticate/log user in
router.post('/login', UserController.loginUser);

// get all users
router.get('/all', checkAuth, UserController.getAllUsers);

// get a single user
router.get('/:userId', checkAuth, UserController.getUser);

// delete a user
router.delete('/:userId', checkAuth, UserController.deleteUser);

module.exports = router;
