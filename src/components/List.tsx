import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { Card } from "./Card";
import { useContext } from "react";
import { AppContext } from "../store/context";
import { dispatchMove, dispatchToggle } from "../store/store";
import { getHueByPos } from "../hue";
import { ContextType, Todo } from "../types/store";

type Props = {
  heading: string
  items: Todo[]
}

export const List = ({ heading, items }: Props) => {
  const { dispatch } = useContext(AppContext) as ContextType;

  /**
   * Item dropped with in the list, change status not supported
   */
  function dropped(droppedItem: Todo, currentPosition: number) {
    // we dropped the item in the other list
    if(items.length === 0 || items[0].checked !== droppedItem.checked) {
      dispatch(dispatchToggle(droppedItem.pos));
    }

    dispatch(dispatchMove(droppedItem.pos, currentPosition));
  };

  /**
   * Item moved up by one
   */
  function up(item: Todo) {
    const index = items.findIndex(({ pos }) => item.pos === pos);

    if (index !== 0) {
      dispatch(dispatchMove(item.pos, items[index - 1].pos));
    }
  };

  /**
   * Item moved down by one
   */
  function down(item: Todo) {
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
            <Droppable onDrop={(droppedItem: Todo) => dropped(droppedItem, item.pos - 1)} backgroundColor={`hsl(${getHueByPos(item.pos)}, 100%, 72%)`}>
              {" "}
            </Droppable>
            <Draggable item={item}>
              <Card item={item} up={() => up(item)} down={() => down(item)} />
            </Draggable>

          </div>
        );
      })}
      <Droppable onDrop={(droppedItem: Todo) => dropped(droppedItem, items.at(-1)?.pos || 0)} backgroundColor={`lightblue`}>{" "}</Droppable>
    </div>
  );
};
