import React, { useState } from "react";
import { CiMedal } from "react-icons/ci";
import Counter from "./counter";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import type { RootDispatxh, RootState } from "../state/store";
import { calculatePoints } from "../state/slices/boardCounterSlice";
import { Server } from "../state/slices/serverBoardSlice";
import wood from "../painted-wooden-plank-textured-backdrop.jpg";
import { AiOutlineCloseSquare } from "react-icons/ai";
import backgroundSound from "../06. Moog City 2.mp3";
import { shallowEqual } from "react-redux";

import { updateBoard } from "../state/slices/serverBoardSlice";
import { postF, getF } from "../state/slices/serverBoardSlice";
import { useGetServerQuery } from "../state/slices/ServerApi";
import { getFN } from "../state/slices/serverBoardSlice";
import { useGetDataByIdQuery } from "../state/slices/ServerApi";
import click from "../minecraft_click.mp3";
export type Cube = { color: string; check: Check; isSelected: boolean };
export type Row = Cube[];
export type Board = Row[];
import death from "../inecraft_damage.mp3";
export enum chess {
 default = "default",
 king = "king",
}
export type Check = {
 chessStatus: chess | boolean;
 colorChess: "white" | "black" | boolean;
};
const soundClick = new Audio(click);
const ServerBoard = () => {
 const { data, error, isLoading, refetch } = useGetServerQuery("");
 const soundDeath = new Audio(death);
 const points = useSelector((state: RootState) => state.gameCounter);
 const [countClick, setCountClick] = useState(0);
 const [historySteps, setHistorySteps] = useState<{ a: number; e: number }[]>([]);
 const [point, setPoint] = useState<{ white: number; black: number }>(points);
 const stepRedux: boolean = useSelector((state: RootState) => state.gameServerBoard.step);
 const [step, setStep] = useState<boolean>(stepRedux);
 const stateRedux: Server = useSelector((state: RootState) => state.gameServerBoard, shallowEqual);
 const [state, setState] = useState(stateRedux);

 const [color, setColor] = React.useState<boolean>(state.step);

 const [servers, setServers] = useState<string>("");

 const dispatch = useDispatch<RootDispatxh>();
 console.log(servers, "ИСМЯЦУЙЦУВ");
 let a: any;

 const reduxBoard = useSelector((state: RootState) => state.gameServerBoard.board, shallowEqual);
 const [board, setBoard] = useState<Board>(reduxBoard);

 React.useEffect(() => {
  if (JSON.stringify(board) !== JSON.stringify(reduxBoard)) {
   setBoard(reduxBoard);
  }
 }, [reduxBoard, stepRedux]);
 React.useEffect(() => {
  if (JSON.stringify(step) !== JSON.stringify(stepRedux)) {
   setStep(stepRedux);
  }
 }, [stepRedux, stateRedux]);
 React.useEffect(() => {
  if (JSON.stringify(state) !== JSON.stringify(stateRedux)) {
   setState(stateRedux);
  }
 }, [stateRedux, stepRedux]);

 React.useEffect(() => {
  console.log("hrelloo");
 }, [state.board]);
 const handleMakeStep = (event: React.MouseEvent<HTMLDivElement>) => {
  const element = event.currentTarget;
  const eventClickValue = element.getAttribute("data-f");
  const eventClickColor = element.getAttribute("data-a");
  if (eventClickValue && eventClickColor === "black") {
   const readyCoord: { a: number; e: number } = JSON.parse(eventClickValue);
   const ReBoARD: Board = JSON.parse(JSON.stringify(board));
   ReBoARD[readyCoord.a][readyCoord.e].isSelected = true;
   console.log(readyCoord);
   setCountClick((prev: number) => {
    const newValue = prev + 1;
    console.log("Ты ХОДИШЬ");

    if (newValue === 2) {
     soundClick.volume = 1;
     soundClick.play();
     setHistorySteps((newStep: { a: number; e: number }[]) => {
      const highestRow = () => {
       const number: number = newStep[0].a > newStep[1].a ? newStep[0].a - newStep[1].a : newStep[1].a - newStep[0].a;
       return number;
      };
      const highestCell = () => {
       const number: number = newStep[0].e > newStep[1].e ? newStep[0].e - newStep[1].e : newStep[0].e - newStep[1].e;
       return number;
      };
      if (newStep.length < 2 || newStep.length > 2) return [];
      if (board[newStep[0].a][newStep[0].e].check.colorChess === "black" && board[newStep[0].a][newStep[0].e].check.chessStatus !== "king" && step === false && color === false) {
       console.log("Ты ПОХОДИЛ", highestRow());

       if (highestRow() === 1 && newStep[0].a < newStep[1].a) {
        if (highestCell() < 0) {
         if (newStep[0].a + 1 >= 0 && newStep[0].e - 1 < board[0].length) {
          if (board[newStep[0].a + 1][newStep[0].e + 1].check.chessStatus === false || board[newStep[0].a + 1][newStep[0].e - 1].check.chessStatus === false) {
           if (highestCell() < 0 && board[newStep[0].a + 1][newStep[0].e + 1].check.chessStatus === false) {
            const newBoard: Board = JSON.parse(JSON.stringify(board));
            const oldChessState = newBoard[newStep[0].a][newStep[0].e];
            const newCellValue: Cube = {
             ...oldChessState,
             check: {
              ...oldChessState.check,
             },
            };

            console.log(oldChessState, "STATUS");
            newBoard[newStep[1].a][newStep[1].e] = newCellValue;
            oldChessState.check = { chessStatus: false, colorChess: false };
            newBoard[newStep[0].a][newStep[0].e] = oldChessState;

            newBoard.forEach((row: Row) => {
             row.forEach((cube: Cube) => {
              cube.isSelected = false;
             });
            });
            newStep[1].a === 7 && newBoard[newStep[1].a][newStep[1].e].check.chessStatus === "default" ? (newBoard[newStep[1].a][newStep[1].e].check.chessStatus = chess.king) : "";
            setStep(!step);
            setBoard(newBoard);
           }
          }
         }
        } else if (highestCell() > 0) {
         if (newStep[0].a + 1 >= 0 && newStep[0].e - 1 < board[0].length) {
          if (board[newStep[0].a + 1][newStep[0].e - 1].check.chessStatus === false && highestCell() > 0) {
           const newBoard: Board = JSON.parse(JSON.stringify(board));
           const oldChessState = newBoard[newStep[0].a][newStep[0].e];
           const newCellValue: Cube = {
            ...oldChessState,
            check: {
             ...oldChessState.check,
            },
           };

           console.log(oldChessState, "STATUS");
           newBoard[newStep[1].a][newStep[1].e] = newCellValue;
           oldChessState.check = { chessStatus: false, colorChess: false };
           newBoard[newStep[0].a][newStep[0].e] = oldChessState;

           newBoard.forEach((row: Row) => {
            row.forEach((cube: Cube) => {
             cube.isSelected = false;
            });
           });
           newStep[1].a === 7 && newBoard[newStep[1].a][newStep[1].e].check.chessStatus === "default" ? (newBoard[newStep[1].a][newStep[1].e].check.chessStatus = chess.king) : "";
           setStep(!step);
           setBoard(newBoard);
          }
         }
        }
       } else if (board[newStep[0].a][newStep[0].e].check.colorChess === "black" && board[newStep[0].a][newStep[0].e].check.chessStatus !== "king" && step === false && color === false) {
        console.log("УБИЙСТВО ЧЕРНЫМИ");
        const newBoard: Board = JSON.parse(JSON.stringify(board));
        const oldChessState = board[newStep[0].a][newStep[0].e];
        const newChessState = oldChessState.check;

        if (
         newStep[0].a + 1 >= 0 &&
         newStep[0].a + 1 < board.length &&
         newStep[0].e + 1 < board[0].length &&
         newStep[0].e + 1 >= 0 &&
         newStep[0].a + 2 >= 0 &&
         newStep[0].a + 2 < board.length &&
         newStep[0].e + 2 < board[0].length &&
         newStep[0].e + 2 >= 0 &&
         board[newStep[0].a + 1][newStep[0].e + 1].check.colorChess === "white" &&
         board[newStep[0].a + 2][newStep[0].e + 2].check.chessStatus === false
        ) {
         newBoard[newStep[0].a + 1][newStep[0].e + 1].check.chessStatus = false;
         newBoard[newStep[0].a + 1][newStep[0].e + 1].check.colorChess = false;
         console.log("черные право");
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         newBoard[newStep[0].a + 2][newStep[0].e + 2].check = newChessState;
        } else if (
         newStep[0].a + 1 >= 0 &&
         newStep[0].e - 1 < board[0].length &&
         newStep[0].a + 1 < board.length &&
         newStep[0].e - 1 >= 0 &&
         newStep[0].a + 2 >= 0 &&
         newStep[0].e - 2 < board[0].length &&
         newStep[0].a + 2 < board.length &&
         newStep[0].e - 2 >= 0 &&
         board[newStep[0].a + 1][newStep[0].e - 1].check.colorChess === "white" &&
         board[newStep[0].a + 2][newStep[0].e - 2].check.chessStatus === false
        ) {
         newBoard[newStep[0].a + 1][newStep[0].e - 1].check.chessStatus = false;
         newBoard[newStep[0].a + 1][newStep[0].e - 1].check.colorChess = false;
         console.log("черные ЛЕВО");
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         newBoard[newStep[0].a + 2][newStep[0].e - 2].check = newChessState;
        } else if (
         newStep[0].a - 1 >= 0 &&
         newStep[0].e + 1 < board[0].length &&
         newStep[0].a - 1 < board[0].length &&
         newStep[0].e + 1 >= 0 &&
         newStep[0].a - 2 >= 0 &&
         newStep[0].e + 2 < board[0].length &&
         newStep[0].a - 2 < board[0].length &&
         newStep[0].e + 2 >= 0 &&
         board[newStep[0].a - 1][newStep[0].e + 1].check.colorChess === "white" &&
         board[newStep[0].a - 2][newStep[0].e + 2].check.chessStatus === false
        ) {
         console.log("черные ПРАВО НАЗАД");
         newBoard[newStep[0].a - 1][newStep[0].e + 1].check.chessStatus = false;
         newBoard[newStep[0].a - 1][newStep[0].e + 1].check.colorChess = false;
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         newBoard[newStep[0].a - 2][newStep[0].e + 2].check = newChessState;
         console.log(0);
        } else if (
         newStep[0].a - 1 >= 0 &&
         newStep[0].e - 1 < board[0].length &&
         newStep[0].a - 1 < board[0].length &&
         newStep[0].e - 1 >= 0 &&
         newStep[0].a - 2 >= 0 &&
         newStep[0].e - 2 < board[0].length &&
         newStep[0].a - 2 < board[0].length &&
         newStep[0].e - 2 >= 0 &&
         board[newStep[0].a - 1][newStep[0].e - 1].check.colorChess === "white" &&
         board[newStep[0].a - 2][newStep[0].e - 2].check.chessStatus === false
        ) {
         console.log("черные ЛЕВО НАЗАД");
         newBoard[newStep[0].a - 1][newStep[0].e - 1].check.chessStatus = false;
         newBoard[newStep[0].a - 1][newStep[0].e - 1].check.colorChess = false;
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         newBoard[newStep[0].a - 2][newStep[0].e - 2].check = newChessState;
         console.log(0);
        }
        newBoard.forEach((row: Row) => {
         row.forEach((cube: Cube) => {
          cube.isSelected = false;
         });
        });
        newStep[1].a === 7 && newBoard[newStep[1].a][newStep[1].e].check.chessStatus === "default" ? (newBoard[newStep[1].a][newStep[1].e].check.chessStatus = chess.king) : "";
        soundDeath.play();
        if (
         (newStep[1].a + 1 < board.length &&
          newStep[1].e + 1 < board[0].length &&
          newStep[1].a + 2 < board.length &&
          newStep[1].e + 2 < board[0].length &&
          board[newStep[1].a + 1][newStep[1].e + 1].check.colorChess === "white" &&
          board[newStep[1].a + 2][newStep[1].e + 2].check.colorChess === false) ||
         (newStep[1].a + 1 < board.length &&
          newStep[1].e - 1 >= 0 &&
          newStep[1].a + 2 < board.length &&
          newStep[1].e - 2 >= 0 &&
          board[newStep[1].a + 1][newStep[1].e - 1].check.colorChess === "white" &&
          board[newStep[1].a + 2][newStep[1].e - 2].check.colorChess === false) ||
         (newStep[1].a - 1 >= 0 &&
          newStep[1].e + 1 < board[0].length &&
          newStep[1].a - 2 >= 0 &&
          newStep[1].e + 2 < board[0].length &&
          board[newStep[1].a - 1][newStep[1].e + 1].check.colorChess === "white" &&
          board[newStep[1].a - 2][newStep[1].e + 2].check.colorChess === false) ||
         (newStep[1].a - 1 >= 0 &&
          newStep[1].e - 1 >= 0 &&
          newStep[1].a - 2 >= 0 &&
          newStep[1].e - 2 >= 0 &&
          board[newStep[1].a - 1][newStep[1].e - 1].check.colorChess === "white" &&
          board[newStep[1].a - 2][newStep[1].e - 2].check.colorChess === false)
        ) {
         console.log("Еще 1 ход");
        } else {
         setStep(!step);
        }
        soundDeath.play();
        setBoard(newBoard);
       }
       return [];
      } else if (board[newStep[0].a][newStep[0].e].check.colorChess === "white" && board[newStep[0].a][newStep[0].e].check.chessStatus !== "king" && step && color === true) {
       if (newStep.length < 2) return [];
       console.log("Ты ПОХОДИЛ", highestRow());
       if (highestRow() === 1 && newStep[0].a > newStep[1].a) {
        if (highestCell() < 0) {
         if (newStep[0].a - 1 >= 0 && newStep[0].e + 1 < board[0].length) {
          if (board[newStep[0].a - 1][newStep[0].e + 1].check.chessStatus === false || board[newStep[0].a - 1][newStep[0].e - 1].check.chessStatus === false) {
           if (highestCell() < 0 && board[newStep[0].a - 1][newStep[0].e + 1].check.chessStatus === false) {
            const newBoard: Board = JSON.parse(JSON.stringify(board));
            const oldChessState = newBoard[newStep[0].a][newStep[0].e];
            const newCellValue: Cube = {
             ...oldChessState,
             check: {
              ...oldChessState.check,
             },
            };

            console.log(oldChessState, "STATUS");
            newBoard[newStep[1].a][newStep[1].e] = newCellValue;
            oldChessState.check.chessStatus = false;
            oldChessState.check.colorChess = false;
            newBoard[newStep[0].a][newStep[0].e] = oldChessState;

            newBoard.forEach((row: Row) => {
             row.forEach((cube: Cube) => {
              cube.isSelected = false;
             });
            });
            newStep[1].a === 0 && newBoard[newStep[1].a][newStep[1].e].check.chessStatus === "default" ? (newBoard[newStep[1].a][newStep[1].e].check.chessStatus = chess.king) : "";
            setStep(!step);
            const newServer: Server = {
             board: newBoard,
             hostName: state.hostName,
             serverName: state.serverName,
             step: !state.step,
             guest: state.guest,
             id: state.id,
             serverState: state.serverState,
            };
            dispatch(postF({ path: `${servers}`, body: newServer }));
            setBoard(newBoard);
           }
          }
         }
        } else if (highestCell() > 0) {
         if (newStep[0].a - 1 >= 0 && newStep[0].e - 1 < board[0].length)
          if (board[newStep[0].a - 1][newStep[0].e - 1].check.chessStatus === false && highestCell() > 0) {
           const newBoard: Board = JSON.parse(JSON.stringify(board));
           const oldChessState = newBoard[newStep[0].a][newStep[0].e];
           const newCellValue: Cube = {
            ...oldChessState,
            check: {
             ...oldChessState.check,
            },
           };

           console.log(oldChessState, "STATUS");
           newBoard[newStep[1].a][newStep[1].e] = newCellValue;
           oldChessState.check.chessStatus = false;
           oldChessState.check.colorChess = false;
           newBoard[newStep[0].a][newStep[0].e] = oldChessState;

           newBoard.forEach((row: Row) => {
            row.forEach((cube: Cube) => {
             cube.isSelected = false;
            });
           });
           newStep[1].a === 0 && newBoard[newStep[1].a][newStep[1].e].check.chessStatus === "default" ? (newBoard[newStep[1].a][newStep[1].e].check.chessStatus = chess.king) : "";
           setStep(!step);
           setBoard(newBoard);
           const newServer: Server = {
            board: newBoard,
            hostName: state.hostName,
            serverName: state.serverName,
            step: !state.step,
            guest: state.guest,
            id: state.id,
            serverState: state.serverState,
           };
           dispatch(postF({ path: `${servers}`, body: newServer }));
          }
        }
       } else if (highestRow() === 2) {
        if (board[newStep[0].a][newStep[0].e].check.colorChess === "white" && board[newStep[0].a][newStep[0].e].check.chessStatus !== "king" && step && color === true) {
         const newBoard: Board = JSON.parse(JSON.stringify(board));
         const oldChessState = board[newStep[0].a][newStep[0].e];
         const newChessState = oldChessState.check;
         console.log("Убийства белыми");
         if (
          newStep[0].a - 1 >= 0 &&
          newStep[0].e - 1 < board[0].length &&
          newStep[0].a - 1 < board[0].length &&
          newStep[0].e - 1 >= 0 &&
          newStep[0].a - 2 >= 0 &&
          newStep[0].e - 2 < board[0].length &&
          newStep[0].a - 2 < board[0].length &&
          newStep[0].e - 2 >= 0 &&
          board[newStep[0].a - 1][newStep[0].e - 1].check.colorChess === "black" &&
          board[newStep[0].a - 2][newStep[0].e - 2].check.chessStatus === false
         ) {
          console.log("БЕЛЫЕ ЛЕВО");
          newBoard[newStep[0].a - 1][newStep[0].e - 1].check.chessStatus = false;
          newBoard[newStep[0].a - 1][newStep[0].e - 1].check.colorChess = false;
          newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
          newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
          newBoard[newStep[0].a - 2][newStep[0].e - 2].check = newChessState;
         } else if (
          newStep[0].a - 1 >= 0 &&
          newStep[0].e + 1 < board[0].length &&
          newStep[0].a - 1 < board[0].length &&
          newStep[0].e + 1 >= 0 &&
          newStep[0].a - 2 >= 0 &&
          newStep[0].e + 2 < board[0].length &&
          newStep[0].a - 2 < board[0].length &&
          newStep[0].e + 2 >= 0 &&
          board[newStep[0].a - 1][newStep[0].e + 1].check.colorChess === "black" &&
          board[newStep[0].a - 2][newStep[0].e + 2].check.chessStatus === false
         ) {
          console.log("БЕЛЫЕ ПРАВО");
          newBoard[newStep[0].a - 1][newStep[0].e + 1].check.chessStatus = false;
          newBoard[newStep[0].a - 1][newStep[0].e + 1].check.colorChess = false;
          newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
          newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
          newBoard[newStep[0].a - 2][newStep[0].e + 2].check = newChessState;
         } else if (
          newStep[0].a + 1 >= 0 &&
          newStep[0].e - 1 < board[0].length &&
          newStep[0].a + 1 < board[0].length &&
          newStep[0].e - 1 >= 0 &&
          newStep[0].a + 2 >= 0 &&
          newStep[0].e - 2 < board[0].length &&
          newStep[0].a + 2 < board[0].length &&
          newStep[0].e - 2 >= 0 &&
          board[newStep[0].a + 1][newStep[0].e - 1].check.colorChess === "black" &&
          board[newStep[0].a + 2][newStep[0].e - 2].check.chessStatus === false
         ) {
          console.log("БЕЛЫЕ ЛЕВО НАЗАД");
          newBoard[newStep[0].a + 1][newStep[0].e - 1].check.chessStatus = false;
          newBoard[newStep[0].a + 1][newStep[0].e - 1].check.colorChess = false;
          newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
          newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
          newBoard[newStep[0].a + 2][newStep[0].e - 2].check = newChessState;
          console.log(0);
         } else if (
          newStep[0].a + 1 >= 0 &&
          newStep[0].e + 1 < board[0].length &&
          newStep[0].a + 1 < board[0].length &&
          newStep[0].e + 1 >= 0 &&
          newStep[0].a + 2 >= 0 &&
          newStep[0].e + 2 < board[0].length &&
          newStep[0].a + 2 < board[0].length &&
          newStep[0].e + 2 >= 0 &&
          board[newStep[0].a + 1][newStep[0].e + 1].check.colorChess === "black" &&
          board[newStep[0].a + 2][newStep[0].e + 2].check.chessStatus === false
         ) {
          console.log("БЕЛЫЕ ПРАВО НАЗАД");

          newBoard[newStep[0].a + 1][newStep[0].e + 1].check.chessStatus = false;
          newBoard[newStep[0].a + 1][newStep[0].e + 1].check.colorChess = false;
          newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
          newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
          newBoard[newStep[0].a + 2][newStep[0].e + 2].check = newChessState;
          console.log(0);
         }

         newBoard.forEach((row: Row) => {
          row.forEach((cube: Cube) => {
           cube.isSelected = false;
          });
          const newServer: Server = {
           board: newBoard,
           hostName: state.hostName,
           serverName: state.serverName,
           step: !state.step,
           guest: state.guest,
           id: state.id,
           serverState: state.serverState,
          };
          dispatch(postF({ path: `${servers}`, body: newServer }));
         });
         newStep[1].a === 0 && newBoard[newStep[1].a][newStep[1].e].check.chessStatus === "default" ? (newBoard[newStep[1].a][newStep[1].e].check.chessStatus = chess.king) : "";
         if (
          (newStep[1].a + 1 < board.length &&
           newStep[1].e + 1 < board[0].length &&
           newStep[1].a + 2 < board.length &&
           newStep[1].e + 2 < board[0].length &&
           board[newStep[1].a + 1][newStep[1].e + 1].check.colorChess === "black" &&
           board[newStep[1].a + 2][newStep[1].e + 2].check.colorChess === false) ||
          (newStep[1].a + 1 < board.length &&
           newStep[1].e - 1 >= 0 &&
           newStep[1].a + 2 < board.length &&
           newStep[1].e - 2 >= 0 &&
           board[newStep[1].a + 1][newStep[1].e - 1].check.colorChess === "black" &&
           board[newStep[1].a + 2][newStep[1].e - 2].check.colorChess === false) ||
          (newStep[1].a - 1 >= 0 &&
           newStep[1].e + 1 < board[0].length &&
           newStep[1].a - 2 >= 0 &&
           newStep[1].e + 2 < board[0].length &&
           board[newStep[1].a - 1][newStep[1].e + 1].check.colorChess === "black" &&
           board[newStep[1].a - 2][newStep[1].e + 2].check.colorChess === false) ||
          (newStep[1].a - 1 >= 0 &&
           newStep[1].e - 1 >= 0 &&
           newStep[1].a - 2 >= 0 &&
           newStep[1].e - 2 >= 0 &&
           board[newStep[1].a - 1][newStep[1].e - 1].check.colorChess === "black" &&
           board[newStep[1].a - 2][newStep[1].e - 2].check.colorChess === false)
         ) {
          console.log("Еще 1 ход");
          const newServer: Server = {
           board: newBoard,
           hostName: state.hostName,
           serverName: state.serverName,
           step: state.step,
           guest: state.guest,
           id: state.id,
           serverState: state.serverState,
          };
          dispatch(postF({ path: `${servers}`, body: newServer }));
         } else {
          setStep(!step);
          const newServer: Server = {
           board: newBoard,
           hostName: state.hostName,
           serverName: state.serverName,
           step: !state.step,
           guest: state.guest,
           id: state.id,
           serverState: state.serverState,
          };
          dispatch(postF({ path: `${servers}`, body: newServer }));
         }
         soundDeath.play();
         setBoard(newBoard);
        }
       }
       return [];
      } else if (board[newStep[0].a][newStep[0].e].check.colorChess === "white" && board[newStep[0].a][newStep[0].e].check.chessStatus === "king" && step && color === true) {
       console.log("КОРОЛЬ САХАРОК");
       if (Math.abs(newStep[0].a - newStep[1].a) === Math.abs(newStep[0].e - newStep[1].e) && board[newStep[1].a][newStep[1].e].check.chessStatus === false) {
        const newBoard: Board = JSON.parse(JSON.stringify(board));
        const stepsR: number = highestRow();
        const stepsE: number = highestCell();
        const oldChessState = newBoard[newStep[0].a][newStep[0].e];
        const oldStep = {
         ...oldChessState,
         check: {
          ...oldChessState.check,
         },
        };
        if (highestCell() < 0 && newStep[0].a - newStep[1].a < 0) {
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         for (let i = newStep[0].a; i < newStep[1].a && flag !== 2; i++) {
          console.log("I", i);
          for (let j = newStep[0].e + i - newStep[0].a; j < newStep[1].e; j++) {
           console.log("J", j);
           if (newBoard[i][j].check.colorChess !== "white") {
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "black" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "black" && newBoard[i + 1][j + 1].check.colorChess === "black") {
              flag = 2;
              break;
              console.log("WWWWW");
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              console.log("АПЕЛЬСИН");
              break;
             }
            } else {
             newBoard[i][j].check.chessStatus = false;
             newBoard[i][j].check.colorChess = false;
             flag = 0;
             console.log("МАНДАРИН");
             break;
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "white") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }

         if (flag === 2) {
          newBoard[newStep[0].a][newStep[0].e] = oldStep;
         } else {
          newBoard[newStep[1].a][newStep[1].e] = oldStep;
         }
        } else if (highestCell() > 0 && newStep[0].a - newStep[1].a < 0) {
         console.log("ДЖПАОЫЩФТОЛД");
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         for (let i = newStep[0].a; i < newStep[1].a && flag !== 2; i++) {
          console.log("I", i);
          for (let j = newStep[0].e - (i - newStep[0].a); j > newStep[1].e; j--) {
           if (newBoard[i][j].check.colorChess !== "white") {
            console.log("J", j);
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "black" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "black" && newBoard[i + 1][j - 1].check.colorChess === "black") {
              flag = 2;
              break;
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              break;
             }
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "white") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }

         flag === 2 ? (newBoard[newStep[0].a][newStep[0].e] = oldStep) : (newBoard[newStep[1].a][newStep[1].e] = oldStep);
        } else if (highestCell() < 0 && newStep[0].a - newStep[1].a > 0) {
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         console.log("КОРОЛЬ ВПЕРЕД ПРАВО");
         for (let i = newStep[0].a; i > newStep[1].a && flag !== 2; i--) {
          console.log("I", i);
          for (let j = newStep[0].e + newStep[0].a - i; j < newStep[1].e; j++) {
           if (newBoard[i][j].check.colorChess !== "white") {
            console.log("J", j);
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "black" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "black" && newBoard[i - 1][j + 1].check.colorChess === "black") {
              flag = 2;
              break;
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              break;
             }
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "white") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }

         flag === 2 ? (newBoard[newStep[0].a][newStep[0].e] = oldStep) : (newBoard[newStep[1].a][newStep[1].e] = oldStep);
        } else if (highestCell() > 0 && newStep[0].a - newStep[1].a > 0) {
         console.log("ДЖПАОЫЩФТfwefefeffeWWWWWОЛД");
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         for (let i = newStep[0].a; i > newStep[1].a && flag !== 2; i--) {
          console.log("I", i);
          for (let j = newStep[0].e - (newStep[0].a - i); j > newStep[1].e; j--) {
           if (newBoard[i][j].check.colorChess !== "white") {
            console.log("J", j);
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "black" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "black" && newBoard[i - 1][j - 1].check.colorChess === "black") {
              flag = 2;
              break;
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              break;
             }
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "white") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }
         flag === 2 ? (newBoard[newStep[0].a][newStep[0].e] = oldStep) : (newBoard[newStep[1].a][newStep[1].e] = oldStep);
        }
        newBoard.forEach((row: Row) => {
         row.forEach((cube: Cube) => {
          cube.isSelected = false;
         });
        });
        if (
         (newStep[1].a + 1 < board.length &&
          newStep[1].e + 1 < board[0].length &&
          newStep[1].a + 2 < board.length &&
          newStep[1].e + 2 < board[0].length &&
          board[newStep[1].a + 1][newStep[1].e + 1].check.colorChess === "black" &&
          board[newStep[1].a + 2][newStep[1].e + 2].check.colorChess === false) ||
         (newStep[1].a + 1 < board.length &&
          newStep[1].e - 1 >= 0 &&
          newStep[1].a + 2 < board.length &&
          newStep[1].e - 2 >= 0 &&
          board[newStep[1].a + 1][newStep[1].e - 1].check.colorChess === "black" &&
          board[newStep[1].a + 2][newStep[1].e - 2].check.colorChess === false) ||
         (newStep[1].a - 1 >= 0 &&
          newStep[1].e + 1 < board[0].length &&
          newStep[1].a - 2 >= 0 &&
          newStep[1].e + 2 < board[0].length &&
          board[newStep[1].a - 1][newStep[1].e + 1].check.colorChess === "black" &&
          board[newStep[1].a - 2][newStep[1].e + 2].check.colorChess === false) ||
         (newStep[1].a - 1 >= 0 &&
          newStep[1].e - 1 >= 0 &&
          newStep[1].a - 2 >= 0 &&
          newStep[1].e - 2 >= 0 &&
          board[newStep[1].a - 1][newStep[1].e - 1].check.colorChess === "black" &&
          board[newStep[1].a - 2][newStep[1].e - 2].check.colorChess === false)
        ) {
         console.log("Еще 1 ход");
         const newServer: Server = {
          board: newBoard,
          hostName: state.hostName,
          serverName: state.serverName,
          step: state.step,
          guest: state.guest,
          id: state.id,
          serverState: state.serverState,
         };
         dispatch(postF({ path: `${servers}`, body: newServer }));
        } else {
         const newServer: Server = {
          board: newBoard,
          hostName: state.hostName,
          serverName: state.serverName,
          step: !state.step,
          guest: state.guest,
          id: state.id,
          serverState: state.serverState,
         };
         dispatch(postF({ path: `${servers}`, body: newServer }));
         setStep(!step);
         soundDeath.play();
        }

        return [];
       }
      } else if (board[newStep[0].a][newStep[0].e].check.colorChess === "black" && board[newStep[0].a][newStep[0].e].check.chessStatus === "king" && step === false && color === false) {
       console.log("КОРОЛЬ НИГЕР");
       if (Math.abs(newStep[0].a - newStep[1].a) === Math.abs(newStep[0].e - newStep[1].e) && board[newStep[1].a][newStep[1].e].check.chessStatus === false) {
        const newBoard: Board = JSON.parse(JSON.stringify(board));
        const stepsR: number = highestRow();
        const stepsE: number = highestCell();
        const oldChessState = newBoard[newStep[0].a][newStep[0].e];
        const oldStep = {
         ...oldChessState,
         check: {
          ...oldChessState.check,
         },
        };
        if (highestCell() < 0 && newStep[0].a - newStep[1].a < 0) {
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         for (let i = newStep[0].a; i < newStep[1].a && flag !== 2; i++) {
          console.log("I", i);
          for (let j = newStep[0].e + i - newStep[0].a; j < newStep[1].e; j++) {
           console.log("J", j);
           if (newBoard[i][j].check.colorChess !== "black") {
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "white" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "white" && newBoard[i + 1][j + 1].check.colorChess === "white") {
              flag = 2;
              break;
              console.log("WWWWW");
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              console.log("АПЕЛЬСИН");
              break;
             }
            } else {
             newBoard[i][j].check.chessStatus = false;
             newBoard[i][j].check.colorChess = false;
             flag = 0;
             console.log("МАНДАРИН");
             break;
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "black") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }

         if (flag === 2) {
          newBoard[newStep[0].a][newStep[0].e] = oldStep;
         } else {
          newBoard[newStep[1].a][newStep[1].e] = oldStep;
         }
        } else if (highestCell() > 0 && newStep[0].a - newStep[1].a < 0) {
         console.log("ДЖПАОЫЩФТОЛД");
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         for (let i = newStep[0].a; i < newStep[1].a && flag !== 2; i++) {
          console.log("I", i);
          for (let j = newStep[0].e - (i - newStep[0].a); j > newStep[1].e; j--) {
           if (newBoard[i][j].check.colorChess !== "black") {
            console.log("J", j);
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "white" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "white" && newBoard[i + 1][j - 1].check.colorChess === "white") {
              flag = 2;
              break;
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              break;
             }
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "black") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }

         flag === 2 ? (newBoard[newStep[0].a][newStep[0].e] = oldStep) : (newBoard[newStep[1].a][newStep[1].e] = oldStep);
        } else if (highestCell() < 0 && newStep[0].a - newStep[1].a > 0) {
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         console.log("КОРОЛЬ ВПЕРЕД ПРАВО");
         for (let i = newStep[0].a; i > newStep[1].a && flag !== 2; i--) {
          console.log("I", i);
          for (let j = newStep[0].e + newStep[0].a - i; j < newStep[1].e; j++) {
           if (newBoard[i][j].check.colorChess !== "black") {
            console.log("J", j);
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "white" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "white" && newBoard[i - 1][j + 1].check.colorChess === "white") {
              flag = 2;
              break;
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              break;
             }
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "black") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }

         flag === 2 ? (newBoard[newStep[0].a][newStep[0].e] = oldStep) : (newBoard[newStep[1].a][newStep[1].e] = oldStep);
        } else if (highestCell() > 0 && newStep[0].a - newStep[1].a > 0) {
         console.log("ДЖПАОЫЩФТfwefefeffeWWWWWОЛД");
         newBoard[newStep[0].a][newStep[0].e].check.chessStatus = false;
         newBoard[newStep[0].a][newStep[0].e].check.colorChess = false;
         let flag = 0;
         for (let i = newStep[0].a; i > newStep[1].a && flag !== 2; i--) {
          console.log("I", i);
          for (let j = newStep[0].e - (newStep[0].a - i); j > newStep[1].e; j--) {
           if (newBoard[i][j].check.colorChess !== "black") {
            console.log("J", j);
            if (newBoard[i][j].check.chessStatus !== false && newBoard[i][j].check.colorChess === "white" && flag === 0) {
             if (newBoard[i][j].check.colorChess === "white" && newBoard[i - 1][j - 1].check.colorChess === "white") {
              flag = 2;
              break;
             } else {
              newBoard[i][j].check.chessStatus = false;
              newBoard[i][j].check.colorChess = false;
              flag = 0;
              break;
             }
            }
            break;
           } else if (newBoard[i][j].check.colorChess === "black") {
            console.log("Нельщя делать ход когда на диагонали твоя шашка ", i, j);

            flag = 2;
            break;
           }
          }
         }
         flag === 2 ? (newBoard[newStep[0].a][newStep[0].e] = oldStep) : (newBoard[newStep[1].a][newStep[1].e] = oldStep);
        }
        newBoard.forEach((row: Row) => {
         row.forEach((cube: Cube) => {
          cube.isSelected = false;
         });
        });
        if (
         (newStep[1].a + 1 < board.length &&
          newStep[1].e + 1 < board[0].length &&
          newStep[1].a + 2 < board.length &&
          newStep[1].e + 2 < board[0].length &&
          board[newStep[1].a + 1][newStep[1].e + 1].check.colorChess === "white" &&
          board[newStep[1].a + 2][newStep[1].e + 2].check.colorChess === false) ||
         (newStep[1].a + 1 < board.length &&
          newStep[1].e - 1 >= 0 &&
          newStep[1].a + 2 < board.length &&
          newStep[1].e - 2 >= 0 &&
          board[newStep[1].a + 1][newStep[1].e - 1].check.colorChess === "white" &&
          board[newStep[1].a + 2][newStep[1].e - 2].check.colorChess === false) ||
         (newStep[1].a - 1 >= 0 &&
          newStep[1].e + 1 < board[0].length &&
          newStep[1].a - 2 >= 0 &&
          newStep[1].e + 2 < board[0].length &&
          board[newStep[1].a - 1][newStep[1].e + 1].check.colorChess === "white" &&
          board[newStep[1].a - 2][newStep[1].e + 2].check.colorChess === false) ||
         (newStep[1].a - 1 >= 0 &&
          newStep[1].e - 1 >= 0 &&
          newStep[1].a - 2 >= 0 &&
          newStep[1].e - 2 >= 0 &&
          board[newStep[1].a - 1][newStep[1].e - 1].check.colorChess === "white" &&
          board[newStep[1].a - 2][newStep[1].e - 2].check.colorChess === false)
        ) {
         console.log("Еще 1 ход");
        } else {
         setStep(!step);
        }
        soundDeath.play();
        setBoard(newBoard);
       }
      } else {
       return [];
      }
      return [];
     });
     setCountClick(0);
    }
    return newValue;
   });
   setHistorySteps((prevH: { a: number; e: number }[]) => [...prevH, readyCoord]);
   setBoard(ReBoARD);
  } else {
   setHistorySteps([]);
  }
 };

 React.useEffect(() => {
  console.log("renderBoard", board);
  dispatch(calculatePoints(board));
 }, [board]);
 React.useEffect(() => {
  setPoint(points);
 }, [points]);
 React.useEffect(() => {
  document.documentElement.style.background = `url(${wood}) center / cover`;
  document.documentElement.style.animation = "none";
 }, []);

 React.useEffect(() => {
  if (data !== null && data !== undefined) {
   for (const [key, value] of Object.entries(data)) {
    let valueR = value as Server;
    const newValue = { ...valueR, id: key };
    if (newValue.hostName === state.hostName) {
     setServers(key);

     console.log(key, "КЛЮЧ СЕРВЕРА");
     console.log(newValue);
    }
   }
  }
 }, [data]);
 React.useEffect(() => {
  const interval = setInterval(() => {
   dispatch(getF({ path: servers }));

   console.log("КОННЕКТ", state, servers);

   refetch();
  }, 7500);

  return () => clearInterval(interval);
 }, [dispatch, servers]);
 React.useEffect(() => {
  const interval = setTimeout(() => {
   refetch();
  }, 2000);

  return () => clearTimeout(interval);
 }, []);
 return (
  <div className="component">
   <div style={{ marginLeft: "-40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="board__playersInfo">
    <p className="board__step">Ходят {step ? "белые" : "черные"}</p>
    <h1 style={{ fontSize: "30px", fontWeight: "600" }} className="board__players">
     Игроки:{" "}
    </h1>
    <p style={{ background: "white" }} className="board__player1">
     Вы: {state.hostName}
    </p>
    <span>VS</span>
    <p style={{ color: "white", background: "black" }} className="board__player2">
     {state.guest}
    </p>
   </div>
   <p style={{ color: "white", background: "black", position: "absolute", top: "90%", left: "2%" }} className="board__player2">
    ID: {servers}
   </p>
   <Link className="board__close" to="/">
    <AiOutlineCloseSquare size="70" color="black"></AiOutlineCloseSquare>
   </Link>
   <div className="board">
    {board.map((row: Row, index: number) => {
     return (
      <div key={index} className="board__row">
       {row.map((cube: Cube, indexG: number) => {
        return (
         <div
          data-a={cube.color}
          data-f={JSON.stringify({ a: index, e: indexG, color: cube.color })}
          onClick={(event) => handleMakeStep(event)}
          key={indexG}
          style={{
           background: cube.color,
           border: cube.isSelected ? "1px solid blue" : "",
          }}
          className="board__cube"
         >
          {cube.check.chessStatus === chess.default ? (
           <div
            key={indexG}
            style={{
             backgroundColor: cube.check.colorChess === "white" ? "white" : "gray",
            }}
            className="board__chess"
           ></div>
          ) : cube.check.chessStatus === chess.king ? (
           <div
            key={indexG}
            style={{
             backgroundColor: cube.check.colorChess === "white" ? "white" : "gray",
            }}
            className="board__chess"
           >
            <CiMedal color="yellow" size="50" />
           </div>
          ) : null}
         </div>
        );
       })}
      </div>
     );
    })}
   </div>
   <Counter point={point}></Counter>
  </div>
 );
};
export default ServerBoard;
