import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = { 
  expenseList: [],
  showExpenseForm: false,
  isEditing: false,
  isSelecting: false,
  isDeleting: false,
  selectedExpenses: [],
  currentExpense: {
    title: '',
    amount: '',
    description: '',
    category: '',
    date: ''
  },
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialExpensesState,
  reducers: {
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setShowExpenseForm(state, action) {
      state.showExpenseForm = action.payload;
    },
    setExpenseList(state, action) {
      state.expenseList = action.payload;
    },
    addExpense(state, action) {
      state.expenseList = [...state.expenseList, action.payload];
    },
    setCurrentExpense(state, action) {
      state.currentExpense = action.payload;
    },
    updateExpense(state, action) {
      // pretty unhappy with this
      // potentially use keyed obj for expenseList and lookup will be constant rather than o(n)
      for (let i = 0; i < state.expenseList.length; i++) {
        if (state.expenseList[i]._id === action.payload._id) {
          state.expenseList[i] = action.payload;
        }
      }
    },
    deleteExpenses(state, action) {
      // delete all expenses in action array from expense list
    },
    addSelectedExpense(state, action) {
      state.selectedExpenses = [... state.selectedExpenses, action.payload];
    },
    setIsSelecting(state, action) {
      state.isSelecting = action.payload;
    }
  }
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice;