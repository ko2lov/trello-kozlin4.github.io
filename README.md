# Board Management App

## Overview

Board Management App is a simple application that allows users to create and manage boards, lists, and cards, similar to Trello. Users can add, delete, and rearrange items within the app. This project serves as a demonstration of state management using Redux with persistence and integration with React Router for navigation.

## Features

- Create, edit, and delete boards.
- Add lists to boards and move them around.
- Add cards to lists and manage their order.
- Persist state across page reloads using `redux-persist`.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **redux-persist**: A library to persist and rehydrate a Redux store.
- **React Router**: A library for routing in React applications.
- **@reduxjs/toolkit**: The official, recommended way to write Redux logic.
- **Material-UI**: A popular React UI framework.
- **Immer**: A library to work with immutable state in a more convenient way.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/board-management-app.git
   cd board-management-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Project Structure

- **src**
  - **components**: Contains React components used throughout the app.
  - **features**: Contains Redux slices for different features (boards, lists, cards, etc.).
  - **store**: Contains the Redux store configuration with persistence.
  - **App.js**: The main component that sets up routing.
  - **index.js**: The entry point of the application.

## Key Files

### `src/store/store.js`

This file sets up the Redux store with persistence using `redux-persist`:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "../features/board/boardSlice";
import { listSlice } from "../features/list/listSlice";
import { currentBoardSlice } from "../features/currentBoard/currentBoardSlice";
import { cardSlice } from "../features/card/cardSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  boards: boardSlice.reducer,
  lists: listSlice.reducer,
  cards: cardSlice.reducer,
  currentBoard: currentBoardSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
```
