const asyncHandler = require('express-async-handler');

const Expense = require('../models/ExpenseModel');


// @desc    Get an expense
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  
  const expenses = await Expense.find()

  res.status(200).json(expenses);

});

// @desc    Set an expense
// @route   POST /api/expenses
// @access  Private
const setExpense = asyncHandler(async (req, res) => {

  // add additional validation here 

  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a valid Expense');
  }

  const expense = await Expense.create({
    title: req.body.title,
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date,
    category: req.body.category,
  });

  res.status(200).json(expense);

});

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {

  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(400);
    throw new Error('Expense not found');
  }

  const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedExpense);

});

// @desc    Delete an expense
// @route   DEL /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(400);
    throw new Error('Expense not found');
  }

  await expense.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense
}