import React, { useEffect, useState, useRef } from "react";
import { Todo } from "@core/types/types";

type Props = {
  onDrop: (item: Todo) => void,
  children: React.ReactNode
  backgroundColor: string
}

export function Droppable({ onDrop, children, backgroundColor }: Props) {
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

export function useDroppable(): [React.MutableRefObject<null>, Boolean, Todo | null, () => void ] {
  const dropZone = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const [droppedItem, setDroppedItem] = useState(null);

  const reset = () => setDroppedItem(null);

  useEffect(() => {
    const node = dropZone.current as HTMLElement | null;

    if (node === null) {
      return;
    }

    const onDrop = (event: DragEvent) => {
      const unparsedItem = event.dataTransfer?.getData("application/json");
      if (!unparsedItem) {
        return;
      }
      const item = JSON.parse(unparsedItem);
      setDroppedItem(item);
      setIsOver(false);
      event.preventDefault();
    };

    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      setIsOver(true);
    };

    const onLeave = (event: DragEvent) => {
      event.preventDefault();
      setIsOver(false);
    };

    const onEnter = (event: DragEvent) => {
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
