import { createSlice } from "@reduxjs/toolkit";
import { Check, chess, Board, Row, Cube } from "../../components/board";
import { RootState } from "../store";
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
 reducers: {},
});

export const board = gameBoardSlice.reducer;
