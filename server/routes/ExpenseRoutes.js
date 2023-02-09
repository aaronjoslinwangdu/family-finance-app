const express = require('express');
const router = express.Router();
const { getExpenses, setExpense, updateExpense, deleteExpense } = require('../controllers/ExpenseController');
const verifyJwt = require('../middleware/AuthMiddleware');

router.use(verifyJwt);

router.route('/').get(getExpenses).post(setExpense);
router.route('/:id').put(updateExpense).delete(deleteExpense);

module.exports = router;