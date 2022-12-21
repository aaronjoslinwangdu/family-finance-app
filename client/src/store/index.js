// app-wide states that should be tracked

// auth -> logged in or out, what kind of user
// calendar view -> looking at daily, weekly, monthly
// group view -> in or not, if in which group

import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import groupSlice from './group-slice';
import layoutSlice from './layout-slice';
import expensesSlice from './expenses-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    layout: layoutSlice.reducer,
    expenses: expensesSlice.reducer
  }
});

export default store;