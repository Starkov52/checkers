import { createSlice } from "@reduxjs/toolkit";
import store from "../store";
import { UseSelector } from "react-redux";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../components/board";
type counter = {
 white: number;
 black: number;
};
const counterP: counter = {
 white: 0,
 black: 0,
};

const counterSlice = createSlice({
 name: "counter",
 initialState: counterP,
 reducers: {
  calculatePoints: (state: counter, action: PayloadAction<Board>) => {
   const board = action.payload;
   let sumBlack: number = 0;
   let sumWhite: number = 0;
   for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
     if (board[i][j].check.colorChess === "black") {
      if (board[i][j].check.chessStatus !== false) {
       sumBlack += 1;
      }
     } else if (board[i][j].check.colorChess === "white") {
      if (board[i][j].check.chessStatus !== false) {
       sumWhite += 1;
      }
     }
    }
   }
   state.black = sumBlack;
   state.white = sumWhite;
  },
 },
});
export const counter = counterSlice.reducer;
export const { calculatePoints } = counterSlice.actions;
