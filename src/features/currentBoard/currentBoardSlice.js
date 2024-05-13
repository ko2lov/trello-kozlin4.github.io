import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState,
  reducers: {
    setCurrentBoard(state, action) {
      return action.payload;
    },
  },
});

export const { setCurrentBoard } = currentBoardSlice.actions;
