import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  "board-00": {
    boardTitle: "Board",
    boardID: "1",
    lists: ["lists-00"],
  },
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const boardTitle = action.payload;
      const boardID = uuidv4();
      const newBoard = {
        boardID,
        boardTitle,
        lists: [],
      };
      return { ...state, [boardID]: newBoard };
    },
    deleteBoard: (state, action) => {
      const { boardID } = action.payload;
      const newState = { ...state };
      delete newState[boardID];
      return newState;
    },
    addList: (state, action) => {
      const { boardID, listID } = action.payload;
      const board = state[boardID];
      const newLists = [...board.lists, listID];
      return { ...state, [boardID]: { ...board, lists: newLists } };
    },
    deleteList: (state, action) => {
      const { boardID, listID } = action.payload;
      const board = state[boardID];
      const newLists = board.lists.filter((id) => id !== listID);
      return { ...state, [boardID]: { ...board, lists: newLists } };
    },
  },
});

export const { addBoard, deleteBoard, addList, deleteList } =
  boardSlice.actions;
