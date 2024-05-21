import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "card-00": {
    text: "kozlin4",
    cardID: "card-00",
    listID: "list-00",
  },
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { text, cardID, listID } = action.payload;
      state[cardID] = {
        text,
        cardID,
        listID,
      };
    },
    editCard: (state, action) => {
      const { newText, cardID } = action.payload;
      return {
        ...state,
        [cardID]: {
          ...state[cardID],
          text: newText,
        },
      };
    },
    deleteCard: (state, action) => {
      const { cardID } = action.payload;
      delete state[cardID];
    },
    // moveCardTwo: (state, action) => {
    //   const {
    //     droppableIdStart,
    //     droppableIdEnd,
    //     droppableIndexStart,
    //     droppableIndexEnd,
    //     draggableId,
    //     type,
    //   } = action.payload;

    //   if (type === "list") {
    //     return state;
    //   }

    //   // in the same list
    //   if (droppableIdStart === droppableIdEnd) {
    //     debugger;
    //     const list = state[droppableIdStart];
    //     const card = list.cards.splice(droppableIndexStart, 1);
    //     list.cards.splice(droppableIndexEnd, 0, ...card);
    //     return { ...state, [droppableIdStart]: list };
    //   } else {
    //     const startList = state[droppableIdStart];
    //     const card = startList.cards.splice(droppableIndexStart, 1);
    //     const endList = state[droppableIdEnd];
    //     endList.cards.splice(droppableIndexEnd, 0, ...card);
    //     return {
    //       ...state,
    //       [droppableIdStart]: startList,
    //       [droppableIdEnd]: endList,
    //     };
    //   }
    // },
    moveCard: (state, action) => {
      const { sourceListID, destinationListID, sourceIndex, destinationIndex } =
        action.payload;
      console.log(
        sourceListID,
        destinationListID,
        sourceIndex,
        destinationIndex
      );
      const [removedCard] = state[sourceListID].splice(sourceIndex, 1);
      state[destinationListID].splice(destinationIndex, 0, removedCard);
    },
  },
});

export const { addCard, editCard, deleteCard, moveCard, moveCardTwo } =
  cardSlice.actions;
