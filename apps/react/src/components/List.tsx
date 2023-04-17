import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { Card } from "./Card";
import { useContext } from "react";
import { AppContext } from "../store/context";
import { dispatchMove, dispatchToggle } from "../store/store";
import { ContextType } from "../types/store";
import { Todo } from "@core/types/types";
import { getHueByPos } from "@core/hue";

type Props = {
  heading: string
  items: Todo[]
}

export function List({ heading, items }: Props) {
  const { dispatch } = useContext(AppContext) as ContextType;
  const lastItem = items.at(-1);
  const lastItemsPosition = lastItem ? lastItem.pos + 1 : 0;
  /**
   * Item dropped with in the list, change status not supported
   */
  function dropped(droppedItem: Todo, targetPosition: number) {
    // we dropped the item in the other list
    if(items.length === 0 || items[0].checked !== droppedItem.checked) {
      dispatch(dispatchToggle(droppedItem.pos));
    }

    // the dropped area is on both sides of the list items: example 0 item 1 item 2 item 3 ...
    // when items new position is higher an offset of 1 is required
    const offset = droppedItem.pos < targetPosition ? -1 : 0;
    dispatch(dispatchMove(droppedItem.pos, targetPosition + offset));
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
            <Droppable onDrop={(droppedItem: Todo) => dropped(droppedItem, item.pos)} backgroundColor={`hsl(${getHueByPos(item.pos)}, 100%, 72%)`}>
              {" "}
            </Droppable>
            <Draggable item={item}>
              <Card item={item} up={() => up(item)} down={() => down(item)} />
            </Draggable>

          </div>
        );
      })}
      <Droppable onDrop={(droppedItem: Todo) => dropped(droppedItem, lastItemsPosition)} backgroundColor={`lightblue`}>{" "}</Droppable>
    </div>
  );
};
