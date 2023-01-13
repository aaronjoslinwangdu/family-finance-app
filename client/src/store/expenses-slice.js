import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = { 
  expenseList: [],
  showExpenseForm: false,
  isEditing: false,
  currentExpense: {},
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
    }
  }
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice;