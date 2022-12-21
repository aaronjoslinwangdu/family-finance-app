import { createSlice } from '@reduxjs/toolkit';

const initialLayoutState = {
  currentLayout: 'day'
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialLayoutState,
  reducers: {
    setLayout(state, action) {
      state.currentLayout = action.payload;
    }
  }
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice;