const express = require('express');
const router = express.Router();
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { signIn, isAuthenticated } = require('../controllers/AuthController');

router.route('/').get(getUser).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/login').post(signIn);
router.route('/private').post(isAuthenticated);

module.exports = router;