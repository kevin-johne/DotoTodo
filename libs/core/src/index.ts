import { Todo } from "./types/types";

export * from "./hue";

/**
 * Generic move an item up or down within a list,
 * receives the current position and a target position the item should be next;
 */
export function move(todos: Todo[], currentPos: number, targetPos: number): Todo[] {
  const currentItem = todos[currentPos];
  let index = targetPos > currentPos ? currentPos + 1 : todos.length - 1;

  if(currentPos === targetPos) {
    return todos;
  }

  for (; index < todos.length && index >= 0; ) {
    const nextItem = todos[index];
    if (targetPos > currentPos) {
      if (nextItem.pos <= currentPos) {
        index++;
        continue;
      }
      if (nextItem.pos > targetPos) break;
    } else {
      if (nextItem.pos > currentPos) {
        index--;
        continue;
      }
      if (nextItem.pos < targetPos) break;
    }

    if (
      currentItem.name !== nextItem.name &&
      currentItem.checked === nextItem.checked
    ) {
      const foundItemPos = currentItem.pos;
      currentItem.pos = nextItem.pos;
      nextItem.pos = foundItemPos;
    }
    targetPos > currentPos ? index++ : index--;
  }

  todos = todos.sort((a, b) => {
    return a.pos - b.pos;
  });

  return todos;
}
