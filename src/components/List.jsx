import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { Card } from "./Card";
import React, { useContext } from "react";
import { AppContext } from "../context";

export const List = ({heading, items}) => {
  const {todos, setTodos} = useContext(AppContext);
  /**
   * Move a card from on position to a target position
   */
  const move = (currentPos, targetPos) => {
    const copy = [...todos];
    const foundItem = copy.find((copiedItem) => copiedItem.pos === currentPos);
    let index = targetPos > currentPos ? currentPos + 1 : currentPos - 1;
    if(!foundItem) return;
    
    for (; index < items.length && index >= 0; ) {
      if (targetPos > currentPos) {
        // targetPos >= index continue
        if (targetPos < index) break;
      } else {
        // index >= targetPos continue
        if (targetPos > index) break;
      }

      const nextItem = items[index];
      if (
        foundItem.name !== nextItem.name &&
        foundItem.checked === nextItem.checked
      ) {
        const nextFoundItem = copy.find(
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

  const dropped = (droppedItem, targetItem) => {
    if (droppedItem.pos < targetItem.pos) {
      move(droppedItem.pos, targetItem.pos - 1);
    } else {
      move(droppedItem.pos, targetItem.pos);
    }
  };

  return (
    <div>
      <h3>{heading}</h3>
      {items.map((item, index) => {
        return (
          <div key={item.pos}>
            <Droppable
              onDrop={(droppedItem) => dropped(droppedItem, item)}
            ></Droppable>
            <Draggable item={item}>
              <Card item={item} move={move} />
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
