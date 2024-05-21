import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  "board-00": {
    boardTitle: "Board",
    boardID: "board-00",
    lists: ["list-00"],
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
      debugger;
      const { boardID } = action.payload;
      const newState = Object.fromEntries(
        Object.entries(state).filter(([key]) => key.boardID !== boardID)
      );
      console.log(newState);
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
      console.log(boardID, listID);
      const board = state[boardID];
      const newLists = board.lists.filter((id) => id !== listID);
      return { ...state, [boardID]: { ...board, lists: newLists } };
    },
    moveList: (state, action) => {
      debugger;
      const { boardID, type, droppableIndexStart, droppableIndexEnd } =
        action.payload;
      if (type !== "list") return state;
      const board = state[boardID];
      const lists = board.lists;
      const draggedList = lists.splice(droppableIndexStart, 1);
      lists.splice(droppableIndexEnd, 0, ...draggedList);
      board.lists = lists;
      return { ...state, [boardID]: board };
    },
  },
});

export const { addBoard, deleteBoard, addList, deleteList, moveList } =
  boardSlice.actions;
