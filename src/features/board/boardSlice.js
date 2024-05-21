import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
// const initialState = {
//   "board-00": {
//     boardTitle: "Board",
//     boardID: "board-00",
//     lists: ["list-00"],
//   },
// };
const initialState = {};

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
      const boardID = action.payload;

      const newState = state;

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
      console.log(boardID, listID);
      const board = state[boardID];
      const newLists = board.lists.filter((id) => id !== listID);
      return { ...state, [boardID]: { ...board, lists: newLists } };
    },
    moveList: (state, action) => {
      const { boardID, type, droppableIndexStart, droppableIndexEnd } =
        action.payload;

      const board = state[boardID];
      const lists = board.lists;
      const draggedList = lists[droppableIndexStart]; // Получаем перетаскиваемый список
      const updatedLists = [...lists]; // Создаем копию массива списков

      // Удаляем перетаскиваемый список из старого индекса и вставляем в новый
      updatedLists.splice(droppableIndexStart, 1);
      updatedLists.splice(droppableIndexEnd, 0, draggedList);

      // Обновляем список в доске
      const updatedBoard = { ...board, lists: updatedLists };

      // Возвращаем новое состояние, не модифицируя текущее состояние напрямую
      return { ...state, [boardID]: updatedBoard };
    },
  },
});

export const { addBoard, deleteBoard, addList, deleteList, moveList } =
  boardSlice.actions;
