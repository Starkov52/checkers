import { createSlice } from "@reduxjs/toolkit";
import { Check, Board, Row, Cube } from "../../components/board";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
enum chess {
 default = "default",
 king = "king",
}
export const stateBoard: Board = [
 [
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
 ],
 [
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
 ],
 [
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "black" },
   isSelected: false,
  },
 ],
 [
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
 ],
 [
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  { color: "black", check: { chessStatus: false, colorChess: false }, isSelected: false },
 ],
 [
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
 ],
 [
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
 ],
 [
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
  {
   color: "black",
   check: { chessStatus: chess.default, colorChess: "white" },
   isSelected: false,
  },
  { color: "brown", check: { chessStatus: false, colorChess: false }, isSelected: false },
 ],
];
export const gameBoardSlice = createSlice({
 name: "board",
 initialState: stateBoard,
 reducers: {
  updateBoardLocal: (state: Board, action: PayloadAction<Board>) => {
   console.log("НОВОЕ СОСТОЯНИЕ REDUX", action.payload[4][3]);
   return [...action.payload];
  },
  resetBoard: (state: Board, action: PayloadAction<Board>) => {
   return [...action.payload];
  },
 },
});

export const board = gameBoardSlice.reducer;
export const { updateBoardLocal, resetBoard } = gameBoardSlice.actions;
