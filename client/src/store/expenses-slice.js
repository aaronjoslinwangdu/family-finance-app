import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = { 
  expenseList: [],
  showExpenseForm: false,
  isEditing: false,
  isSelecting: false,
  isDeleting: false,
  selectedExpenses: [],
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
    updateExpense(state, action) {
      // pretty unhappy with this
      // potentially use keyed obj for expenseList and lookup will be constant rather than o(n)
      for (let i = 0; i < state.expenseList.length; i++) {
        if (state.expenseList[i]._id === action.payload._id) {
          state.expenseList[i] = action.payload;
        }
      }
    },
    deleteExpense(state, action) {
      let temp = state.expenseList.filter(expense => expense._id !== action.payload.id);
      state.expenseList = temp;
    },
    addSelectedExpense(state, action) {
      state.selectedExpenses = [...state.selectedExpenses, action.payload];
    },
    removeSelectedExpense(state, action) {
      // pretty unhappy with this
      // need to make constant lookup
      for (let i = 0; i < state.selectedExpenses.length; i++) {
        if (state.selectedExpenses[i]._id === action.payload.id) {
          state.selectedExpenses.pop(i)
        }
      }
    },
    setIsSelecting(state, action) {
      if (action.payload === false) {
        state.selectedExpenses = [];
      }
      state.isSelecting = action.payload;
    },
    clearSelectedExpenses(state) {
      state.selectedExpenses = [];
    }
  }
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice;