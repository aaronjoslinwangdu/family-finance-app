import { createSlice } from '@reduxjs/toolkit';

const initialGroupState = {
  inGroupView: false
}

const groupSlice = createSlice({
  name: 'group',
  initialState: initialGroupState,
  reducers: {
    toggleGroupView(state) {
      state.inGroupView = !state.inGroupView;
    }
  }
});

export const groupActions = groupSlice.actions;

export default groupSlice;