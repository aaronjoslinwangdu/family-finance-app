import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = { 
  expenses: [],
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
    }
  }
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice;