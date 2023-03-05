import { useEffect, useState, useRef } from "react";

export const Draggable = function ({ item, children }) {
  const [ref, isDragging] = useDrag(item);

  return <div ref={ref}>{children}</div>;
};

export const useDrag = function (item) {
  const draggableItem = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const itemNode = draggableItem.current;
    if (itemNode === null) {
      return;
    }
    const onDragStart = (event) => {
      event.dataTransfer.setData("application/json", JSON.stringify(item));
      setIsDragging(true);
    };

    const onDragEnd = (event) => {
      setIsDragging(false);
    };
    itemNode.setAttribute("draggable", true);
    itemNode.addEventListener("dragstart", onDragStart);
    itemNode.addEventListener("dragend", onDragEnd);
    return () => {
      itemNode.removeEventListener("dragstart", onDragStart);
      itemNode.removeEventListener("dragend", onDragEnd);
    };
  }, [item]);

  return [draggableItem, isDragging];
};
