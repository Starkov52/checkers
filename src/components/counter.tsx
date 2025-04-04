import React from "react";
type point = {
 point?: {
  white: number;
  black: number;
 };
};
const Counter = ({ point }: point) => {
 return (
  <div className="board__counter">
   <div className="board__blackCount">
    <div style={{ margin: "10px 10px 10px 10px", borderRadius: "50%", width: "50px", height: "50px", backgroundColor: "gray" }} className="board__blackCircle"></div>
    <p className="board__count">{`x${point?.black}`}</p>
   </div>
   <div className="board__whiteCount">
    <div style={{ borderRadius: "50%", width: "50px", height: "50px", backgroundColor: "white" }} className="board__whiteCircle"></div>
    <p className="board__count">{`x${point?.white}`}</p>
   </div>
  </div>
 );
};
export default Counter;
