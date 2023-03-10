import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { Card } from "./Card";
import React, {  useContext } from "react";
import { AppContext } from "../store/context";
import { dispatchMove } from "../store/store";

export const List = ({heading, items}) => {
  const {dispatch} = useContext(AppContext);

  /**
   * Item dropped with in the list, change status not supported
   * @param {object} droppedItem 
   * @param {object} targetItem 
   */
  const dropped = (droppedItem, targetItem) => {
    if (droppedItem.pos < targetItem.pos) {
      dispatch(dispatchMove(droppedItem.pos, targetItem.pos - 1));
    } else {
      dispatch(dispatchMove(droppedItem.pos, targetItem.pos));
    }
  };

  /**
   * Item moved up by one
   * @param {object} item 
   */
  const up = (item) => {
    const index = items.findIndex(({pos}) => item.pos === pos);

    if(index !== 0 ) {
      dispatch(dispatchMove(item.pos, items[index -1].pos));
    }
  }

  /**
   * Item moved down by one
   * @param {object} item 
   */
  const down = (item) => {
    const index = items.findIndex(({pos}) => item.pos === pos);
    if(index + 1 !== items.length ) {
      dispatch(dispatchMove(item.pos, items[index + 1].pos));
    }
  }

  return (
    <div className="list">
      <h3>{heading}</h3>
      {items.map((item) => {
        return (
          <div key={item.pos}>
            <Droppable
              onDrop={(droppedItem) => dropped(droppedItem, item)}
            > </Droppable>
            <Draggable item={item}>
              <Card item={item} up={() => up(item)} down={() => down(item)} />
            </Draggable>
          </div>
        );
      })}
      <Droppable
        onDrop={(droppedItem) =>
          dropped(droppedItem, { pos: items.length })
        }
      >
      </Droppable>
    </div>
  )
}
