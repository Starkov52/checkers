import { gameBoardSlice } from "./slices/boardGameslice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { board } from "./slices/boardGameslice";
import { counter } from "./slices/boardCounterSlice";
import { serverBoard } from "./slices/serverBoardSlice";
import serverApi from "./slices/ServerApi";

const reducers = combineReducers({
 gameBoard: board,
 gameCounter: counter,
 gameServerBoard: serverBoard,
 [serverApi.reducerPath]: serverApi.reducer,
});

const store = configureStore({
 reducer: reducers,
 middleware: (getDefaultMiddleware) => {
  return getDefaultMiddleware().concat(serverApi.middleware);
 },
});
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatxh = typeof store.dispatch;
export default store;
