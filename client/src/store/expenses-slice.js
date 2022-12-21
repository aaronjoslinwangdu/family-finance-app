import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = { 
  expenses: [],
  isEditing: false,
  showExpenseForm: false,
  currentExpense: {
    id: null, 
    title: '', 
    amount: null,
    date: ''
  },
  isNewExpense: false
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialExpensesState,
  reducers: {
    replaceExpenses(state, action) {
      state.expenses = action.payload;
    },
    addExpense(state, action) {
      const newExpense = action.payload;
      state.expenses.push({
        id: newExpense.id,
        title: newExpense.title,
        amount: newExpense.amount,
        date: newExpense.date
      });
    },
    removeExpense(state, action) {
      const removeId = action.payload;
      state.expenses = state.expenses.filter(expense => expense.id !== removeId);
    },
    updateExpense(state, action) {
      const updatedExpense = action.payload;
      state.expenses = [...state.expenses.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense)];
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setShowExpenseForm(state, action) {
      state.showExpenseForm = action.payload;
    },
    setCurrentExpense(state, action) {
      state.currentExpense = action.payload;
    },
    setIsNewExpense(state, action) {
      state.isNewExpense = action.payload;
    }
  }
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice;