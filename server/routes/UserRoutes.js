const express = require('express');
const router = express.Router();
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { signIn, signOut, refresh } = require('../controllers/AuthController');
const verifyJwt = require('../middleware/AuthMiddleware');

router.use(verifyJwt);

router.route('/').get(getUser).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;