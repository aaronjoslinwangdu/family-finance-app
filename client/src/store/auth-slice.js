import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    toggle(state) {
      state.isAuthenticated = !state.isAuthenticated;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;