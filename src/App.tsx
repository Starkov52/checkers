import { useState } from "react";
import reactLogo from "./assets/react.svg";
import React from "react";
import viteLogo from "/vite.svg";
import "./css/main.css";
import Board from "./components/board";
import MainPage from "./components/mainPage";
import Rules from "./components/rules";
import ListServers from "./components/listServers";
import CreateServer from "./components/createServer";
import ServerBoard from "./components/serverBoard";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import JoinBoard from "./components/joinBoard";
import JoinById from "./components/joinById";
function App() {
 const [count, setCount] = useState(0);

 return (
  <div className="AppClass">
   <Router>
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
   </Router>
  </div>
 );
}

export default App;

