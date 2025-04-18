import Board from "../components/board";
import React from "react";
import App from "../App";
import { render, screen, waitFor, within } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { resetBoard } from "../state/slices/boardGameslice";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import dosk from "../2c1713eb-cfa5-48b2-88a3-603be26f86a4.png";
import Rules from "../components/rules";
import ListServers from "../components/listServers";
import { stateBoard } from "../state/slices/boardGameslice";
import CreateServer from "../components/createServer";
import store, { RootDispatxh } from "../state/store";
import ServerBoard from "../components/serverBoard";
import JoinBoard from "../components/joinBoard";
import JoinById from "../components/joinById";
import userEvent from "@testing-library/user-event";
import MainPage from "../components/mainPage";
import { hostname } from "os";
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
  const { asFragment } = render(
   <Provider store={store}>
    <MemoryRouter initialEntries={["/"]}>
     <Routes>
      <Route path="/" element={<MainPage></MainPage>}></Route>
      <Route path="/rules" element={<Rules></Rules>}></Route>
      <Route path="/localGame" element={<Board></Board>}></Route>
      <Route path="/listOnlineGame" element={<ListServers></ListServers>}></Route>
      <Route path="/listOnlineGame/createServer" element={<CreateServer></CreateServer>}></Route>
      <Route path="/listOnlineGame/createServer/game" element={<ServerBoard></ServerBoard>}></Route>
      <Route path="/listOnlineGame/joinServer/:id" element={<JoinBoard></JoinBoard>}></Route>
      <Route path="/listOnlineGame/joinById" element={<JoinById></JoinById>}></Route>
     </Routes>
    </MemoryRouter>
   </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
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
 test("testCreateServer", async () => {
  const serversBtn = await screen.getByTestId("serverBtn");
  await userEvent.click(serversBtn);
  const addServerBtn = await screen.getByTestId("addServer");
  await userEvent.click(addServerBtn);
  const inputServer = await screen.getByTestId("inputServer");

  expect(inputServer).toBeInTheDocument();
  await userEvent.type(inputServer, "123");

  expect(inputServer).toHaveValue("123");
 });
});
describe("fetchTests", () => {
 beforeAll(() => {
  global.fetch = jest.fn(() =>
   Promise.resolve({
    ok: true,
    json: () =>
     Promise.resolve([
      {
       board: stateBoard,
       hostName: "Новый Орлеан",
       serverName: "123123",
       step: true,
       guest: null,
       id: "dqwqwdqwd",
       serverState: { error: false, loading: false, success: false },
      },
      {
       board: stateBoard,
       hostName: "Новы12eй Орлеан",
       serverName: "1232112123",
       step: true,
       guest: null,
       id: "dqwqwdq2112wd",
       serverState: { error: false, loading: false, success: false },
      },
     ]),
   } as Response),
  );
 });

 beforeEach(() => {
  const { asFragment } = render(
   <Provider store={store}>
    <MemoryRouter initialEntries={["/"]}>
     <Routes>
      <Route path="/" element={<MainPage></MainPage>}></Route>
      <Route path="/rules" element={<Rules></Rules>}></Route>
      <Route path="/localGame" element={<Board></Board>}></Route>
      <Route path="/listOnlineGame" element={<ListServers></ListServers>}></Route>
      <Route path="/listOnlineGame/createServer" element={<CreateServer></CreateServer>}></Route>
      <Route path="/listOnlineGame/createServer/game" element={<ServerBoard></ServerBoard>}></Route>
      <Route path="/listOnlineGame/joinServer/:id" element={<JoinBoard></JoinBoard>}></Route>
      <Route path="/listOnlineGame/joinById" element={<JoinById></JoinById>}></Route>
     </Routes>
    </MemoryRouter>
   </Provider>,
  );
 });
 afterEach(() => {
  jest.restoreAllMocks();
 });
 test("one", async () => {
  // Ждем появления кнопки
  const mainPage = await screen.getByTestId("mainPage");
  expect(mainPage).toBeInTheDocument();
  const serversBtn = await screen.findByTestId("serverBtn");
  expect(serversBtn).toBeInTheDocument();

  // Клик и ожидание навигации
  await userEvent.click(serversBtn);

  // Ждем загрузки данных и появления элементов
  const serverElements = await screen.findAllByTestId("server");
  await expect(serverElements).toHaveLength(1);
  await expect(fetch).toHaveBeenCalledTimes(1);
 });
});
