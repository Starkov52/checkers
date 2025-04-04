import React, { ChangeEvent } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { updateServerName } from "../state/slices/serverBoardSlice";
import click from "../minecraft_click.mp3";
import { useSendServerMutation } from "../state/slices/ServerApi";
import { RootState } from "../state/store";
const CreateServer = () => {
 const [sendServer] = useSendServerMutation();

 const dispatch = useDispatch();
 const server = useSelector((store: RootState) => store.gameServerBoard);
 const navigator = useNavigate();
 const soundClick = new Audio(click);
 const [inputValue, setInputValue] = React.useState<string>("");
 const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
  const eventTarget = event.target.value;
  setInputValue(eventTarget);
  dispatch(updateServerName(eventTarget));
 };

 return (
  <div className="createServer">
   <h1 className="createServer__information">Информация о сервере</h1>
   <div className="createServer__inputInfo">
    <h2 className="createServer__inputTitle">Название сервера</h2>
    <input onChange={(event) => changeInput(event)} value={inputValue} className="createServer__input"></input>
   </div>
   {inputValue.length > 0 ? (
    <button
     style={{ color: "green" }}
     onClick={() => {
      navigator("/listOnlineGame/createServer/game");
      soundClick.play();

      console.log("ИМЯ", server.serverName);

      server.hostName !== "Сервер"
       ? sendServer({
          board: server.board,
          hostName: server.hostName,
          serverName: server.serverName,
          step: server.step,
          guest: "Присоеденившийся по ID",
          serverState: {
           loading: false,
           server: null,
           error: null,

           success: false,
          },
          id: server.id,
         })
       : null;
     }}
     className="createServer__readyButton"
    >
     Готово
    </button>
   ) : (
    <button
     disabled
     style={{ backgroundColor: "#363535", color: "red" }}
     onClick={() => {
      soundClick.play();
     }}
     className="createServer__readyButton"
    >
     Готово
    </button>
   )}
   <button
    onClick={() => {
     navigator("/listOnlineGame");
     soundClick.play();
    }}
    className="createServer__backButton"
   >
    Отмена
   </button>
  </div>
 );
};
export default CreateServer;
