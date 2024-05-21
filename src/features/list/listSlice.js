import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "list-00": {
    listID: "list-00",
    cards: [],
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
      console.log(listTitle, listID, boardID);
      state[listID] = {
        listTitle,
        listID,
        cards: [],
        boardID,
      };
    },
    editListTitle: (state, action) => {
      const { listID, newListTitle } = action.payload;
      return {
        ...state,
        [listID]: {
          ...state[listID],
          listTitle: newListTitle,
        },
      };
    },
    deleteList: (state, action) => {
      const listID = action.payload;

      const newState = state;

      delete newState[listID];
      return newState;
    },
    addCard: (state, action) => {
      const { listID, cardID } = action.payload;
      state[listID].cards.push(cardID);
    },
    deleteCard: (state, action) => {
      const { listID, cardID } = action.payload;
      const list = state[listID];
      list.cards = list.cards.filter((id) => id !== cardID);
    },
    dragHappened: (state, action) => {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      console.log(
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      );
      if (type === "list") {
        return;
      }

      // Moving cards within the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const [movedCard] = list.cards.splice(droppableIndexStart, 1);

        list.cards.splice(droppableIndexEnd, 0, movedCard);
      } else {
        // Moving cards between different lists
        const startList = state[droppableIdStart];
        const [movedCard] = startList.cards.splice(droppableIndexStart, 1);
        const endList = state[droppableIdEnd];
        endList.cards.splice(droppableIndexEnd, 0, movedCard);
      }
    },
    moveCardTwo: (state, action) => {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
      } = action.payload;

      if (type === "list") {
        return state;
      }

      // В том же списке
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const newCards = Array.from(list.cards);
        const [removedCard] = newCards.splice(droppableIndexStart, 1);
        newCards.splice(droppableIndexEnd, 0, removedCard);
        return {
          ...state,
          [droppableIdStart]: {
            ...list,
            cards: newCards,
          },
        };
      } else {
        // Между разными списками
        const startList = state[droppableIdStart];
        const endList = state[droppableIdEnd];
        const startListCards = Array.from(startList.cards);
        const endListCards = Array.from(endList.cards);
        const [movedCard] = startListCards.splice(droppableIndexStart, 1);
        endListCards.splice(droppableIndexEnd, 0, movedCard);
        return {
          ...state,
          [droppableIdStart]: {
            ...startList,
            cards: startListCards,
          },
          [droppableIdEnd]: {
            ...endList,
            cards: endListCards,
          },
        };
      }
    },
  },
});

export const {
  addList,
  editListTitle,
  deleteList,
  addCard,
  deleteCard,
  dragHappened,
  moveCardTwo,
} = listSlice.actions;
