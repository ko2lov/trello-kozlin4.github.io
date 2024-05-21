import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "../features/board/boardSlice";
import { listSlice } from "../features/list/listSlice";
import { currentBoardSlice } from "../features/currentBoard/currentBoardSlice";
import { cardSlice } from "../features/card/cardSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Используем локальное хранилище браузера

// Конфигурация для персиста
const persistConfig = {
  key: "root",
  storage,
};

// Редьюсеры с персистом
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    boards: boardSlice.reducer,
    lists: listSlice.reducer,
    cards: cardSlice.reducer,
    currentBoard: currentBoardSlice.reducer,
  })
);

// Создание хранилища Redux с редьюсерами и персистом
export const store = configureStore({
  reducer: persistedReducer,
});

window.store = store;
// Создание персистора
export const persistor = persistStore(store);

// Экспорт хранилища и персистора для использования в приложении
export default { store, persistor };
