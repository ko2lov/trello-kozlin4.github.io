import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "card-00": {
    text: "kozlin4",
    id: "card-00",
    listID: "list-00",
  },
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { text, cardID, listID } = action.payload;
      const newCard = {
        text,
        cardID,
        listID,
      };
      return { ...state, [cardID]: newCard };
    },
    editCard: (state, action) => {
      const { newText, cardID } = action.payload;
      const card = state[cardID];
      card.text = newText;
      return { ...state, [cardID]: card };
    },
    deleteCard: (state, action) => {
      const { cardID } = action.payload;
      const newState = state;
      delete newState[cardID];
      return newState;
    },
  },
});

export const { addCard, editCard, deleteCard } = cardSlice.actions;
