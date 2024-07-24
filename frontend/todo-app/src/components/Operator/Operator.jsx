import React from "react";

function Operator(props) {
  return (
    <div className="operation-val">
      <button
        className="counter-button"
        onClick={() => props.setCount(props.val)}
      >
        +{props.val}
      </button>
      <button
        className="counter-button"
        onClick={() => props.setCount(-props.val)}
      >
        -{props.val}
      </button>
    </div>
  );
}

export default Operator;
