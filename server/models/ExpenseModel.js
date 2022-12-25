const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }, 
    description: {
      type: String
    },
    category: {
      type: String
    },
    date: {
      type: Date
    }
  }, { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);