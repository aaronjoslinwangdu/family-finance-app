import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    signOut(state, action) {
      state.token = null;
    }
  }
});

export const authActions = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;

export default authSlice;