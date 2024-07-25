import React, { useState } from "react";
import Operator from "../Operator/Operator";
import "./Counter.css";
function Counter() {
  const [count, setCount] = useState(0);
  const changeCount = (val) => {
    if (val < 0 && count + val < 0) return;
    setCount((x) => x + val);
  };
  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <div className="operators">
        <Operator val={5} setCount={changeCount} />
        <Operator val={2} setCount={changeCount} />
        <Operator val={1} setCount={changeCount} />
      </div>
      <span className="count">{count}</span>
      <button className="reset" onClick={resetCount}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
