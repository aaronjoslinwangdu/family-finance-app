import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = { 
  expenseList: [],
  showExpenseForm: false,
  isEditing: false,
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
    }
  }
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice;