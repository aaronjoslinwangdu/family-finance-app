const asyncHandler = require('express-async-handler');


// @desc    Get an expense
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get Expense' });
});

// @desc    Set an expense
// @route   POST /api/expenses
// @access  Private
const setExpense = asyncHandler(async (req, res) => {

  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a valid Expense');
  }

  res.status(200).json({ message: 'Set Expense' });
});

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler( async (req, res) => {
  res.status(200).json({ message: `Update Expense ${req.params.id}` });
});

// @desc    Delete an expense
// @route   GET /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler( async (req, res) => {
  res.status(200).json({ message: `Delete Expense ${req.params.id}` });
});

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense
}