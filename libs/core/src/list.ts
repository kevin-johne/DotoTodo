import { Todo } from "./types/types";

/**
 * Generic move an item up or down within a list,
 * receives the current position and a target position the item should be next;
 */
export function move(
  todos: Todo[],
  currentPos: number,
  targetPos: number
): Todo[] {
  if (currentPos === targetPos) {
    return todos;
  }

  const currentItem = todos[currentPos];
  let index = currentPos;

  while (index < todos.length && index >= 0) {
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

export function toggle(todos: Todo[], currentPos: number) {
  if (currentPos < 0 || todos.length <= currentPos) return todos;
  todos[currentPos].checked = !todos[currentPos].checked;
  return todos;
}

export function remove(todos: Todo[], pos: number) {
  todos.splice(pos, 1);

  for (let index = pos; index < todos.length; index++) {
    todos[index].pos = todos[index].pos - 1;
  }
return todos;
}
