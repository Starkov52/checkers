import Board from "../components/board";
import React from "react";
import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { resetBoard } from "../state/slices/boardGameslice";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import dosk from "../2c1713eb-cfa5-48b2-88a3-603be26f86a4.png";
import Rules from "../components/rules";
import ListServers from "../components/listServers";
import { stateBoard } from "../state/slices/boardGameslice";
import store, { RootDispatxh } from "../state/store";
import userEvent from "@testing-library/user-event";
import MainPage from "../components/mainPage";
enum chess {
 default = "default",
 king = "king",
}

describe("first", () => {
 let currentState = store.getState();

 beforeEach(() => {
  const bboard = [...stateBoard];
  store.dispatch(resetBoard(bboard));
  render(
   <Provider store={store}>
    <BrowserRouter>
     <Board></Board>
    </BrowserRouter>
   </Provider>,
  );
 });

 test("UP-RIGHT", async () => {
  const board = screen.getByTestId("board");
  expect(board).toBeInTheDocument();

  const firstChecker = screen.getByTestId("cell-5-0");
  expect(firstChecker).toBeInTheDocument();
  userEvent.click(firstChecker);

  const fieldToSend = screen.getByTestId("cell-4-1");

  expect(fieldToSend).toBeInTheDocument();
  userEvent.click(fieldToSend);
  await waitFor(() => {
   const updatedBoard = store.getState().gameBoard;

   expect(updatedBoard[4][1].check).toEqual({
    chessStatus: chess.default,
    colorChess: "white",
   });
  });
 });
 test("UP-LEFT", async () => {
  const board = screen.getByTestId("board");
  expect(board).toBeInTheDocument();

  const firstChecker = screen.getByTestId("cell-5-2");
  expect(firstChecker).toBeInTheDocument();
  userEvent.click(firstChecker);

  const fieldToSend = screen.getByTestId("cell-4-1");

  expect(fieldToSend).toBeInTheDocument();
  userEvent.click(fieldToSend);
  await waitFor(() => {
   const updatedBoard = store.getState().gameBoard;

   expect(updatedBoard[4][1].check).toEqual({
    chessStatus: chess.default,
    colorChess: "white",
   });
  });
 });
 test("UP-FIGHT-LEFT", async () => {
  const board = screen.getByTestId("board");
  expect(board).toBeInTheDocument();

  const firstChecker = screen.getByTestId("cell-5-2");
  expect(firstChecker).toBeInTheDocument();
  userEvent.click(firstChecker);

  const fieldToSend = screen.getByTestId("cell-4-3");
  expect(fieldToSend).toBeInTheDocument();
  userEvent.click(fieldToSend);
  const filedCheckerWhite = screen.getByTestId("cell-2-1");
  userEvent.click(filedCheckerWhite);
  const fieldToSendWhite = screen.getByTestId("cell-3-2");
  userEvent.click(fieldToSendWhite);

  userEvent.click(fieldToSend);
  const fieldToSendBlack = screen.getByTestId("cell-2-1");
  userEvent.click(fieldToSendBlack);
  await waitFor(() => {
   const updatedBoard = store.getState().gameBoard;
   expect(updatedBoard[2][1].check).toEqual({
    chessStatus: chess.default,
    colorChess: "white",
   });
  });
 });

 test("DOWN-FIGHT-RIGHT", async () => {
  const board = screen.getByTestId("board");
  expect(board).toBeInTheDocument();

  const firstChecker = screen.getByTestId("cell-5-2");
  expect(firstChecker).toBeInTheDocument();
  await userEvent.click(firstChecker);

  const fieldToSend = screen.getByTestId("cell-4-3");
  expect(fieldToSend).toBeInTheDocument();
  await userEvent.click(fieldToSend);
  const filedCheckerWhite = screen.getByTestId("cell-2-1");
  expect(filedCheckerWhite).toBeInTheDocument();
  await userEvent.click(filedCheckerWhite);
  const fieldToSendWhite = screen.getByTestId("cell-3-2");
  expect(fieldToSendWhite).toBeInTheDocument();
  await userEvent.click(fieldToSendWhite);

  await userEvent.click(fieldToSend);
  const fieldToSendBlack = screen.getByTestId("cell-2-1");
  expect(fieldToSendBlack).toBeInTheDocument();
  await userEvent.click(fieldToSendBlack);
  //
  await waitFor(() => {
   const updatedBoard = store.getState().gameBoard;
   expect(updatedBoard[2][1].check).toEqual({
    chessStatus: chess.default,
    colorChess: "white",
   });
  });

  const fieldToSendBlackToDie = screen.getByTestId("cell-2-3");
  expect(fieldToSendBlackToDie).toBeInTheDocument();
  await userEvent.click(fieldToSendBlackToDie);
  await userEvent.click(fieldToSendWhite);
  await userEvent.click(fieldToSendBlack);
  await userEvent.click(fieldToSend);
  await new Promise((resolve) => setTimeout(resolve, 100));
  await waitFor(() => {
   const updatedBoard = store.getState().gameBoard;
   console.log(updatedBoard[4][3].check);
   screen.debug();
   expect(updatedBoard[4][3].check).toEqual({
    chessStatus: chess.default,
    colorChess: "white",
   });
  });
 });
 test("DOWN-FIGHT-LEFT", async () => {
  const board = screen.getByTestId("board");
  expect(board).toBeInTheDocument();

  const firstChecker = screen.getByTestId("cell-5-2");
  expect(firstChecker).toBeInTheDocument();
  await userEvent.click(firstChecker);

  const fieldToSend = screen.getByTestId("cell-4-3");
  expect(fieldToSend).toBeInTheDocument();
  await userEvent.click(fieldToSend);
  const filedCheckerWhite = screen.getByTestId("cell-2-1");
  expect(filedCheckerWhite).toBeInTheDocument();
  await userEvent.click(filedCheckerWhite);
  const fieldToSendWhite = screen.getByTestId("cell-3-2");
  expect(fieldToSendWhite).toBeInTheDocument();
  await userEvent.click(fieldToSendWhite);

  await userEvent.click(fieldToSend);
  const fieldToSendBlack = screen.getByTestId("cell-2-1");
  expect(fieldToSendBlack).toBeInTheDocument();
  await userEvent.click(fieldToSendBlack);
  //
  await waitFor(() => {
   const updatedBoard = store.getState().gameBoard;
   expect(updatedBoard[2][1].check).toEqual({
    chessStatus: chess.default,
    colorChess: "white",
   });
  });

  const fieldToSendBlackToDie = screen.getByTestId("cell-2-3");
  expect(fieldToSendBlackToDie).toBeInTheDocument();
  await userEvent.click(fieldToSendBlackToDie);
  await userEvent.click(fieldToSendWhite);
  await userEvent.click(fieldToSendBlack);
  await userEvent.click(fieldToSend);

  await waitFor(() => {
   const updatedBoard = store.getState().gameBoard;
   console.log(updatedBoard[4][3].check);
   screen.debug();
   expect(updatedBoard[4][3].check).toEqual({
    chessStatus: chess.default,
    colorChess: "white",
   });
  });
  //

  const fieltToSendBlack = screen.getByTestId("cell-1-2");
  await userEvent.click(fieltToSendBlack);
  const fieltToSend = screen.getByTestId("cell-2-1");
  await userEvent.click(fieltToSend);
  await userEvent.click(fieldToSend);
  const cell = screen.getByTestId("cell-3-4");
  await userEvent.click(cell);
  await userEvent.click(fieltToSend);
  await userEvent.click(fieldToSendWhite);
  await userEvent.click(cell);
  await userEvent.click(fieldToSendBlackToDie);
  const xuyna = screen.getByTestId("cell-1-0");
  await userEvent.click(xuyna);
  await userEvent.click(fieltToSend);
  await userEvent.click(fieldToSendBlackToDie);
  const killBlack = screen.getByTestId("cell-4-1");
  await userEvent.click(killBlack);

  const updatedBoard = store.getState().gameBoard;
  expect(updatedBoard[4][1].check).toEqual({
   chessStatus: chess.default,
   colorChess: "white",
  });
 });
});
describe("allRoutingTests", () => {
 beforeEach(() => {
  render(
   <Provider store={store}>
    <MemoryRouter initialEntries={["/"]}>
     <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/localGame" element={<Board></Board>}></Route>
      <Route path="/rules" element={<Rules></Rules>}></Route>
      <Route path="/listOnlineGame" element={<ListServers></ListServers>}></Route>
     </Routes>
    </MemoryRouter>
   </Provider>,
  );
 });
 test("routing", async () => {
  const mainPage = await screen.getByTestId("mainPage");
  expect(mainPage).toBeInTheDocument();
  const link = await screen.getByTestId("localGame");
  await userEvent.click(link);
  const board = await screen.getByTestId("board");
  expect(board).toBeInTheDocument();
  const closeBtn = await screen.getByTestId("close");
  await userEvent.click(closeBtn);
  await expect(await screen.getByTestId("mainPage")).toBeInTheDocument();
  const rules = await screen.getByTestId("rulesBtn");
  await expect(rules).toBeInTheDocument();
  await userEvent.click(rules);

  const rulesPage = await screen.getByTestId("rules");
  expect(rulesPage).toBeInTheDocument();
  const closeRules = await screen.getByTestId("rulesClose");
  await userEvent.click(closeRules);
  await expect(screen.getByTestId("mainPage")).toBeInTheDocument();
  const serversBtn = await screen.getByTestId("serverBtn");
  await userEvent.click(serversBtn);
  await expect(screen.getByTestId("server")).toBeInTheDocument();
  const serverClose = await screen.getByTestId("serverClose");
  await userEvent.click(serverClose);
  await expect(screen.getByTestId("mainPage")).toBeInTheDocument();
 });
});
