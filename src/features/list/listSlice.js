import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "list-00": {
    listID: "list-00",
    cards: ["card-00"],
    listTitle: "myList",
    boardID: "board-00",
  },
};

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      const { listTitle, listID, boardID } = action.payload;
      const newList = {
        listTitle,
        listID,
        cards: [],
        boardID,
      };
      return { ...state, [listID]: newList };
    },
    editListTitle: (state, action) => {
      const { listID, newListTitle } = action.payload;
      const list = state[listID];
      list.listTitle = newListTitle;
      return { ...state, [listID]: list };
    },
    deleteList: (state, action) => {
      const { listID } = action.payload;
      const newState = state;
      delete newState[listID];
      return newState;
    },
    addCard: (state, action) => {
      const { listID, cardID } = action.payload;
      const list = state[listID];
      list.cards.push(cardID);
      return { ...state, [listID]: list };
    },
    deleteCard: (state, action) => {
      const { listID, cardID } = action.payload;
      const list = state[listID];
      const newCards = list.cards.filter((id) => id !== cardID);
      list.card = newCards;
      return { ...state, [listID]: list };
    },
  },
});

export const { addList, editListTitle, deleteList, addCard, deleteCard } =
  listSlice.actions;
