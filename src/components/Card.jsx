import React, { useContext } from "react";
import { AppContext } from "../store/context";
import { dispatchToggle } from "../store/store";

export const Card = function ({ up, down,item }) {
  const {dispatch} = useContext(AppContext);

  const startHue = 280;
  const hue = startHue - item.pos * 10;
  return (
    <div className="card" style={{backgroundColor: `hsl(${hue}, 100%, 72%)`}}>
      <input
        type="checkbox"
        id={item.name}
        onClick={() => dispatch(dispatchToggle(item.pos))}
        defaultChecked={item.checked}
      />
      <label htmlFor={item.name}>
        {item.name}
      </label>
      <div className="navigation">
        <button onClick={up}>👍</button>
        <button onClick={down}>👎</button>
      </div>
    </div>
  );
};
