const express = require('express');
const router = express.Router();
const { refresh, signOut, signIn } = require('../controllers/AuthController');

router.route('/').post(signIn)
router.route('/logout').post(signOut);
router.route('/refresh').get(refresh);

module.exports = router;