import React from "react";
import { BrowserRouter as Router, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import click from "../minecraft_click.mp3";
import { FaChessBoard } from "react-icons/fa6";
import { useGetServerQuery, useGetDataByIdQuery } from "../state/slices/ServerApi";
import { Server } from "../state/slices/serverBoardSlice";
import { useDispatch } from "react-redux";
import { postF } from "../state/slices/serverBoardSlice";
import { RootDispatxh } from "../state/store";
const ListServers = () => {
 const navigator = useNavigate();
 const soundClick = new Audio(click);
 const [name, setName] = React.useState<string>(`Аноним__ ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`);
 const path = useLocation();
 console.log(path);
 const { error, data, isLoading, isSuccess, isError } = useGetServerQuery("");
 const dispatch = useDispatch<RootDispatxh>();
 const [servers, setServers] = React.useState<Server[]>([]);
 const [selectServer, setSelectServer] = React.useState<Set<Server>>(new Set());
 const handleConnect = async () => {
  const DBID: string = [...selectServer][0].id;
  navigator(`${path.pathname}/joinServer/${DBID}`);

  const response: Server = await fetch(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/checkers/${DBID}.json`).then((response) => {
   if (response.ok) {
    return response.json();
   }
  });

  console.log(response, "СЕРВАЧОК");

  const newServer: Server = {
   board: response.board,
   hostName: response.hostName,
   serverName: response.serverName,
   step: response.step,
   guest: name,
   id: response.id,
   serverState: response.serverState,
  };

  dispatch(postF({ path: DBID, body: newServer }));
  setSelectServer(new Set());
 };
 React.useEffect(() => {
  const array: Server[] = [];
  if (data !== null && data !== undefined) {
   for (const [key, value] of Object.entries(data)) {
    let valueR = value as Server;
    const newValue = { ...valueR, id: key };

    array.push(newValue);
    console.log(newValue);
   }
   setServers(array);
  }
 }, [data]);
 console.log(data, "ДАННЫЕ");

 return (
  <div data-testid="server" className="list">
   <p className="list__nameInfo">Твое имя в данной сессии: {name}</p>
   <h1 className="list__title">Сетевая игра</h1>
   <div className="list__list">
    {isLoading ? (
     <p>Загрузка...</p>
    ) : (
     servers?.map((item: Server, index) => {
      return (
       <div
        style={{
         backgroundColor:
          selectServer &&
          Array.from(selectServer).some((itemg) => {
           return itemg.serverName === item.serverName;
          })
           ? "#323333"
           : "",
        }}
        data-f={item.id}
        onClick={(event) => {
         setSelectServer(new Set([item]));
        }}
        key={index}
        className="list__item"
       >
        <div className="list__icon">
         <FaChessBoard color="black" size="40"></FaChessBoard>
        </div>
        <h3 className="list__titleItem">{item.serverName}</h3>
        <h3 className="list__titleItemAuthor">создатель: {item.hostName}</h3>
        <p className="list__players">1/2</p>
       </div>
      );
     })
    )}
   </div>
   <div className="list__btns">
    <button
     onClick={(event) => {
      handleConnect();
      soundClick.play();
     }}
     className="list__joinBtn"
    >
     Подключиться
    </button>
    <Link className="list__createBtnS" to={`${path.pathname}/createServer`}>
     <button
      onClick={() => {
       soundClick.play();
      }}
      className="list__createBtn"
     >
      Добавить
     </button>
    </Link>
    <Link className="list__closeBtnS" to="/">
     <button
      data-testid="serverClose"
      onClick={() => {
       soundClick.play();
      }}
      className="list__closeBtn"
     >
      Назад
     </button>
    </Link>
    <Link className="list__idBtnS" to={`${path.pathname}/joinById`}>
     <button
      onClick={() => {
       soundClick.play();
      }}
      className="list__idBtn"
     >
      По адресу
     </button>
    </Link>
   </div>

   <p className="list__onlineInfo">Онлайн: {servers.length} сервер (а/ов)</p>
  </div>
 );
};
export default ListServers;
