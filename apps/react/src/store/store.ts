import { Action, State } from "../types/store";
import * as core from "@core/index";
import data from "@data/init.json";

export const initState = data;

function move(state: State, currentPos: number, targetPos: number) {
  return {
    ...state,
    todos: [...core.move(state.todos, currentPos, targetPos)],
  };
}

/**
 * toggle the state of an item
 */
function toggle(state: State, currentPos: number): State {
  const todos = core.toggle(state.todos, currentPos);
  return {
    ...state,
    todos: [...todos],
  };
}

/**
 * add a new item to the end of the list
 */
function add(state: State, name: string) {
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
  return {
    ...state,
    todos: [...core.remove(state.todos, pos)],
  };
}

export function dispatchMove(
  currentPosition: number,
  newPosition: number
): Action {
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
      pos,
    },
  };
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
  if (action.type === "remove") {
    return remove(state, action.payload.pos);
  }
  return state;
}
