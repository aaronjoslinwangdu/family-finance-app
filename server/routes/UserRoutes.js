const express = require('express');
const router = express.Router();
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { signIn } = require('../controllers/AuthController');

router.route('/').get(getUser).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/login').post(signIn);

module.exports = router;