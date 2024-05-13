import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "../features/board/boardSlice";
import { listSlice } from "../features/list/listSlice";
import { currentBoardSlice } from "../features/currentBoard/currentBoardSlice";
import { cardSlice } from "../features/card/cardSlice";

export const store = configureStore({
  reducer: {
    boards: boardSlice.reducer,
    lists: listSlice.reducer,
    cards: cardSlice.reducer,
    currentBoard: currentBoardSlice.reducer,
  },
});

window.store = store;
