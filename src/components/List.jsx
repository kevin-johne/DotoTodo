import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { Card } from "./Card";
import React, {  useContext } from "react";
import { AppContext } from "../context";

export const List = ({heading, items}) => {
  const {todos, setTodos} = useContext(AppContext);
  /**
   * Generic move an item up or down within a list,
   * receives the current position and a target position the item should be next;
   * @param {number} currentPos
   * @param {number} targetPos
   */
  const move = (currentPos, targetPos) => {
    const copy = [...todos];
    const foundItem = copy.find((copiedItem) => copiedItem.pos === currentPos);
    let index = targetPos > currentPos ? 0 : items.length - 1;
    if(!foundItem) return;
    
    for (; index < items.length && index >= 0; ) {
      const nextItem = items[index];
      if (targetPos > currentPos) {
        if(nextItem.pos <= currentPos) {
          index++;
          continue;
        };
        if (nextItem.pos > targetPos) break;
      } else {
        if(nextItem.pos > currentPos) {
          index--;
          continue;
        };
        if (nextItem.pos < targetPos) break;
      }
      
      if (
        foundItem.name !== nextItem.name &&
        foundItem.checked === nextItem.checked
      ) {
        const nextFoundItem = items.find(
          (copiedItem) => nextItem.name === copiedItem.name
        );
        if(!nextFoundItem) return;
        const foundItemPos = foundItem.pos;
        foundItem.pos = nextFoundItem.pos;
        nextFoundItem.pos = foundItemPos;
      }
      targetPos > currentPos ? index++ : index--;
    }

    setTodos(copy);
  };

  /**
   * Item dropped with in the list, change status not supported
   * @param {object} droppedItem 
   * @param {object} targetItem 
   */
  const dropped = (droppedItem, targetItem) => {
    if (droppedItem.pos < targetItem.pos) {
      move(droppedItem.pos, targetItem.pos - 1);
    } else {
      move(droppedItem.pos, targetItem.pos);
    }
  };

  /**
   * Item moved up by one
   * @param {object} item 
   */
  const up = (item) => {
    const index = items.findIndex(({pos}) => item.pos === pos);

    if(index !== 0 ) {
      move(item.pos, items[index -1].pos);
    }
  }

  /**
   * Item moved down by one
   * @param {object} item 
   */
  const down = (item) => {
    const index = items.findIndex(({pos}) => item.pos === pos);
    if(index + 1 !== items.length ) {
      move(item.pos, items[index + 1].pos);
    }
  }

  return (
    <div className="list">
      <h3>{heading}</h3>
      {items.map((item, index) => {
        return (
          <div key={item.pos}>
            <Droppable
              onDrop={(droppedItem) => dropped(droppedItem, item)}
            ></Droppable>
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
