import React, { useContext } from "react";
import { AppContext } from "../context";

export const Card = function ({ up, down,item }) {
  const {toggle} = useContext(AppContext);

  const startHue = 280;
  const hue = startHue - item.pos * 10;
  return (
    <div className="card" style={{backgroundColor: `hsl(${hue}, 100%, 72%)`}}>
      <input
        type="checkbox"
        id={item.name}
        onClick={() => toggle(item)}
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
