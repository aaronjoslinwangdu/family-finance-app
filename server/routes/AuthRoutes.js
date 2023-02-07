const express = require('express');
const router = express.Router();
const { isAuthenticated, signIn } = require('../controllers/AuthController');

router.route('/').post(signIn)
router.route('/validate').post(isAuthenticated);
router.route('/logout').post(signOut);
router.route('/refresh').get();

module.exports = router;