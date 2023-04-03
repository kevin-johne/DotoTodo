import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { Card } from "./Card";
import React, { useContext } from "react";
import { AppContext } from "../store/context";
import { dispatchMove, dispatchToggle } from "../store/store";
import { getHueByPos } from "../hue";

export const List = ({ heading, items }) => {
  const { dispatch } = useContext(AppContext);

  /**
   * Item dropped with in the list, change status not supported
   * @param {object} droppedItem
   * @param {number} currentPosition
   */
  const dropped = (droppedItem, currentPosition) => {
    // we dropped the item in the other list
    if(items.length === 0 || items[0].checked !== droppedItem.checked) {
      dispatch(dispatchToggle(droppedItem.pos));
    }

    // when lower than current position than it is always before the element
    if (droppedItem.pos < currentPosition) {
      dispatch(dispatchMove(droppedItem.pos, currentPosition - 1));
    } else {
      dispatch(dispatchMove(droppedItem.pos, currentPosition));
    }
  };

  /**
   * Item moved up by one
   * @param {object} item
   */
  const up = (item) => {
    const index = items.findIndex(({ pos }) => item.pos === pos);

    if (index !== 0) {
      dispatch(dispatchMove(item.pos, items[index - 1].pos));
    }
  };

  /**
   * Item moved down by one
   * @param {object} item
   */
  const down = (item) => {
    const index = items.findIndex(({ pos }) => item.pos === pos);
    if (index + 1 !== items.length) {
      dispatch(dispatchMove(item.pos, items[index + 1].pos));
    }
  };

  return (
    <div className="list">
      <h3>{heading}</h3>
      {items.map((item) => {
        return (
          <div key={item.pos}>
            <Droppable onDrop={(droppedItem) => dropped(droppedItem, item.pos)} backgroundColor={`hsl(${getHueByPos(item.pos)}, 100%, 72%)`}>
              {" "}
            </Droppable>
            <Draggable item={item}>
              <Card item={item} up={() => up(item)} down={() => down(item)} />
            </Draggable>

          </div>
        );
      })}
      <Droppable onDrop={(droppedItem) => dropped(droppedItem, items.length)} backgroundColor={`lightblue`}>{" "}</Droppable>
    </div>
  );
};
