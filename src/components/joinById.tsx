import React from "react";
import { UseSelector } from "react-redux";
import { updateServerName } from "../state/slices/serverBoardSlice";
import click from "../minecraft_click.mp3";
import { useSendServerMutation } from "../state/slices/ServerApi";
import { RootState } from "../state/store";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const JoinById = () => {
 const dispatch = useDispatch();
 const path = useLocation();
 const soundClick = new Audio(click);
 const [inputValue, setInputValue] = React.useState<string>("");
 const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  const eventTarget = event.target.value;
  setInputValue(eventTarget);
 };
 const navigator = useNavigate();
 return (
  <div className="joinById">
   <h1 className="joinById__information">Информация о сервере</h1>
   <div className="joinById__inputInfo">
    <h2 className="joinById__inputTitle">ID адресс сервера</h2>
    <input onChange={(event) => changeInput(event)} value={inputValue} className="joinById__input"></input>
   </div>
   {inputValue.length > 0 ? (
    <button
     style={{ color: "green" }}
     onClick={() => {
      navigator(`/listOnlineGame/joinServer/${inputValue}`);
      soundClick.play();
     }}
     className="joinById__readyButton"
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
     className="joinById__readyButton"
    >
     Готово
    </button>
   )}
   <button
    onClick={() => {
     navigator("/listOnlineGame");
     soundClick.play();
    }}
    className="joinById__backButton"
   >
    Отмена
   </button>
  </div>
 );
};
export default JoinById;
