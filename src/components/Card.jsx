import React, { useContext } from "react";
import { AppContext } from "../context";

export const Card = function ({ move, item }) {
  const {toggle} = useContext(AppContext);

  return (
    <div className="card">
      <label>
        <input
          type="checkbox"
          onClick={() => toggle(item)}
          defaultChecked={item.checked}
        />
        {item.name}
      </label>
      <div className="navigation">
        <button onClick={() => move(item.pos, item.pos - 1)}>▲</button>
        <button onClick={() => move(item.pos, item.pos + 1)}>▼</button>
      </div>
    </div>
  );
};
