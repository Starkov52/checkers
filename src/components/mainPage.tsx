import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import photo from "../freepik__expand__41379.png";
import backgroundSound from "../C418 Mice On Venus.mp3";
import click from "../minecraft_click.mp3";
const MainPage = () => {
 const [show, setShow] = React.useState<boolean>(false);
 const title = React.useRef<HTMLHeadingElement>(null);
 const sound = new Audio(backgroundSound);
 const soundClick = new Audio(click);

 React.useEffect(() => {
  document.documentElement.style.background = `url(${photo}) bottom / cover`;
  document.documentElement.style.animation = "board 222s linear infinite";
 }, []);

 const f = () => {
  sound.volume = 1;
  sound.play();
 };
 return (
  <div data-testid="mainPage" className="mainPage">
   <div className="mainPage__title">
    <h1 ref={title} onClick={f} className="mainPage__titleT">
     Checkers
    </h1>
    <h2 className="mainPage__titleD">deluxe edition</h2>
   </div>
   <div className="mainPage__buttons">
    <Link to="/localGame">
     <button
      data-testid="localGame"
      onClick={() => {
       sound.volume = 1;
       soundClick.play();
       f;
      }}
      className="mainPage__gameFriendBtn"
     >
      Игра друг с другом
     </button>
    </Link>
    <Link to="/listOnlineGame">
     <button
      data-testid="serverBtn"
      onClick={() => {
       f;
       soundClick.play();
      }}
      className="mainPage__gameOnlineBtn"
     >
      Сетевая игрa
     </button>
    </Link>
    <Link to="/rules">
     <button
      data-testid="rulesBtn"
      onClick={() => {
       f;
       soundClick.play();
      }}
      className="mainPage__gameRulesBtn"
     >
      Правила
     </button>
    </Link>
   </div>
   <p className="mainPage__programmer">
    By <span style={{ color: "black" }}> Starkov </span>03.<span style={{ fontFamily: "monospace", color: "black" }}>2025</span>
   </p>
  </div>
 );
};
export default MainPage;
