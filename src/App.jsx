import React, { useState } from "react";
import { Card } from "./Card";

import { Draggable } from "./Draggable";
import { Dropable } from "./Dropable";

export const App = function () {
  const [todo, setTodo] = useState([
    {
      checked: false,
      name: "React",
      pos: 0
    },
    {
      checked: false,
      name: "Angular",
      pos: 1
    },
    {
      checked: false,
      name: "Svelte",
      pos: 2
    },
    {
      checked: false,
      name: "Vue",
      pos: 3
    },
    {
      checked: false,
      name: "Qwik",
      pos: 4
    }
  ]);

  const sortedTodo = todo.sort((a, b) => {
    return a.pos > b.pos;
  });

  const toggle = (item) => {
    const copy = [...todo];
    const foundItem = copy.find((copiedItem) => item.name === copiedItem.name);
    foundItem.checked = !foundItem.checked;
    setTodo(copy);
  };

  /**
   * Move a card from on position to a target position
   */
  const move = (currentPos, targetPos) => {
    const copy = [...todo];
    const foundItem = copy.find((copiedItem) => copiedItem.pos === currentPos);
    let index = targetPos > currentPos ? currentPos + 1 : currentPos - 1;

    for (; index < sortedTodo.length && index >= 0; ) {
      if (targetPos > currentPos) {
        // targetPos >= index continue
        if (targetPos < index) break;
      } else {
        // index >= targetPos continue
        if (targetPos > index) break;
      }

      const nextItem = sortedTodo[index];
      if (
        foundItem.name !== nextItem.name &&
        foundItem.checked === nextItem.checked
      ) {
        const nextFoundItem = copy.find(
          (copiedItem) => nextItem.name === copiedItem.name
        );
        const foundItemPos = foundItem.pos;
        foundItem.pos = nextFoundItem.pos;
        nextFoundItem.pos = foundItemPos;
      }
      targetPos > currentPos ? index++ : index--;
    }

    setTodo(copy);
  };

  const dropped = (droppedItem, targetItem) => {
    if (droppedItem.pos < targetItem.pos) {
      move(droppedItem.pos, targetItem.pos - 1);
    } else {
      move(droppedItem.pos, targetItem.pos);
    }
  };

  return (
    <div className="App">
      <h1>React Refresher</h1>

      <h2>List of Frameworks</h2>
      {sortedTodo.map((item, index, array) => {
        if (item.checked === true) return null;
        return (
          <>
            <Dropable
              key={"before" + index}
              onDrop={(droppedItem) => dropped(droppedItem, item)}
            >
              here
            </Dropable>
            <Draggable key={"draggable" + index} item={item}>
              <Card item={item} toggle={toggle} move={move} />
            </Draggable>
          </>
        );
      })}
      <Dropable
        onDrop={(droppedItem) =>
          dropped(droppedItem, { pos: sortedTodo.length })
        }
      >
        here
      </Dropable>

      <h2>Learned</h2>
      {todo.map((item, index) => {
        if (item.checked === false) return null;
        return <Card key={index} item={item} toggle={toggle} move={move} />;
      })}
    </div>
  );
};
