import React, { useContext } from "react";
import { AppContext } from "../store/context";
import { dispatchRemove, dispatchToggle } from "../store/store";
import { getHueByPos } from "../hue";

export const Card = function ({ up, down,item }) {
  const {dispatch} = useContext(AppContext);

  function onRemove() {
    dispatch(dispatchRemove(item.pos));
  }

  return (
    <div className="card" style={{backgroundColor: `hsl(${getHueByPos(item.pos)}, 100%, 72%)`}}>
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
        <button onClick={onRemove}>👋</button>
      </div>
    </div>
  );
};
