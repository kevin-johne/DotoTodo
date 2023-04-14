import React, { useEffect, useState, useRef } from "react";
import { Todo } from "@core/types/types";

type Props = {
  item: Todo
  children: React.ReactNode
}

/**
 * Draggable implementation using an element wrapper
 */
export function Draggable({ item, children }: Props) {
  const [ref] = useDrag(item);

  return <div ref={ref}>{children}</div>;
};

/**
 * drag hook for an todo item
 */
export function useDrag(item: Todo): [React.MutableRefObject<null>, Boolean] {
  const draggableItem = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const itemNode = draggableItem.current as HTMLElement | null;
    if (itemNode === null) {
      return;
    }
    const onDragStart = (event: DragEvent) => {
      event.dataTransfer?.setData("application/json", JSON.stringify(item));
      setIsDragging(true);
    };

    const onDragEnd = () => {
      setIsDragging(false);
    };

    itemNode.setAttribute("draggable", "true");
    itemNode.addEventListener("dragstart", onDragStart);
    itemNode.addEventListener("dragend", onDragEnd);
    return () => {
      itemNode.removeEventListener("dragstart", onDragStart);
      itemNode.removeEventListener("dragend", onDragEnd);
    };
  }, [item]);

  return [draggableItem, isDragging];
};
