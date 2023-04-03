import React, { useEffect, useState, useRef } from "react";
import { getHueByPos } from "../hue";

export const Droppable = function ({ onDrop, children, backgroundColor }) {
  const [ref, isOver, droppedItem, reset] = useDroppable();

  const styled = {
    backgroundColor: isOver ? backgroundColor : "",
  };
  
  useEffect(() => {
    if (droppedItem) {
      onDrop(droppedItem);
      reset();
    }
    return () => {
      reset();
    };
  }, [droppedItem, onDrop, reset]);

  return (
    <div ref={ref} className="droppable" style={styled}>
      {children}
    </div>
  );
};

export const useDroppable = () => {
  const dropZone = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const [droppedItem, setDroppedItem] = useState(null);

  const reset = () => setDroppedItem(null);

  useEffect(() => {
    const node = dropZone.current;

    if (node === null) {
      return;
    }

    const onDrop = (event) => {
      const unparsedItem = event.dataTransfer.getData("application/json");
      const item = JSON.parse(unparsedItem);
      setDroppedItem(item);
      setIsOver(false);
      event.preventDefault();
    };

    const onDragOver = (event) => {
      event.preventDefault();
      setIsOver(true);
    };

    const onLeave = (event) => {
      event.preventDefault();
      setIsOver(false);
    };

    const onEnter = (event) => {
      event.preventDefault();
    };

    node.addEventListener("drop", onDrop);

    node.addEventListener("dragover", onDragOver);
    node.addEventListener("dragenter", onEnter);
    node.addEventListener("dragleave", onLeave);

    return () => {
      node.removeEventListener("drop", onDrop);
      node.removeEventListener("dragover", onDragOver);
      node.removeEventListener("dragenter", onEnter);
      node.removeEventListener("dragleave", onLeave);
    };
  }, [dropZone]);
  return [dropZone, isOver, droppedItem, reset];
};
