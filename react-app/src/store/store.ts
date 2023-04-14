import { Action, State } from "../types/store";

export const initState = {
  todos: [
    {
      checked: true,
      name: "React",
      pos: 0,
    },
    {
      checked: false,
      name: "Angular",
      pos: 1,
    },
    {
      checked: false,
      name: "Svelte",
      pos: 2,
    },
    {
      checked: false,
      name: "Vue",
      pos: 3,
    },
    {
      checked: false,
      name: "Qwik",
      pos: 4,
    },
  ],
};

/**
 * Generic move an item up or down within a list,
 * receives the current position and a target position the item should be next;
 */
function move(state: State, currentPos: number, targetPos: number) {
  let todos = [...state.todos];
  const currentItem = todos[currentPos];
  let index = targetPos > currentPos ? currentPos + 1 : todos.length - 1;

  if(currentPos === targetPos) {
    return state;
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

  return {
    ...state,
    todos,
  };
}

/**
 * toggle the state of an item
 */
function toggle(state: State, currentPos: number): State {
  if (currentPos < 0 || state.todos.length <= currentPos) return state;

  const todos = [...state.todos];
  todos[currentPos].checked = !todos[currentPos].checked;

  return {
    ...state,
    todos,
  };
}

/**
 * add a new item to the end of the list
 */
function add(state:State, name: string) {
  return {
    ...state,
    todos: [
      ...state.todos,
      {
        checked: false,
        name,
        pos: state.todos.length,
      },
    ],
  };
}

/**
 * removes the item from the list
 */
function remove(state: State, pos: number) {
  const copy = [...state.todos];
  copy.splice(pos, 1);

  for(let index = pos; index < copy.length; index++) {
    copy[index].pos = copy[index].pos - 1;
  }

  return {
    ...state,
    todos: copy
  }
}

export function dispatchMove(currentPosition: number, newPosition: number): Action {
  return {
    type: "move",
    payload: {
      currentPosition,
      newPosition,
    },
  };
}

export function dispatchToggle(currentPosition: number): Action {
  return {
    type: "toggle",
    payload: {
      currentPosition,
    },
  };
}

export function dispatchAdd(name: string): Action {
  return {
    type: "add",
    payload: {
      name,
    },
  };
}

export function dispatchRemove(pos: number): Action {
  return {
    type: "remove",
    payload: {
      pos
    }
  }
}

export function reducer(state: State, action: Action): State {
  if (action.type === "move") {
    return move(
      state,
      action.payload.currentPosition,
      action.payload.newPosition
    );
  }
  if (action.type === "toggle") {
    return toggle(state, action.payload.currentPosition);
  }
  if (action.type === "add") {
    return add(state, action.payload.name);
  }
  if(action.type === "remove") {
    return remove(state, action.payload.pos);
  }
  return state;
}
