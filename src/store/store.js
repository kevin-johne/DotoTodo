/**
 * Generic move an item up or down within a list,
 * receives the current position and a target position the item should be next;
 * @param {object} state
 * @param {number} currentPos
 * @param {number} targetPos
 */
function move(state, currentPos, targetPos) {
  let todos = [...state.todos];
  const currentItem = todos[currentPos];
  let index = targetPos > currentPos ? 0 : todos.length - 1;

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
    return a.pos > b.pos;
  });

  return {
    ...state,
    todos,
  };
}

/**
 * toggle the state of an item
 * @param {object} state
 * @param {number} currentPos
 * @returns
 */
function toggle(state, currentPos) {
  if (currentPos < 0 || state.todos.length <= currentPos) return state;

  const todos = [...state.todos];
  todos[currentPos].checked = !todos[currentPos].checked;

  return {
    ...state,
    todos,
  };
}

function add(state, name) {
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

export function dispatchMove(currentPostion, newPosition) {
  return {
    type: "move",
    payload: {
      currentPostion,
      newPosition,
    },
  };
}

export function dispatchToggle(currentPosition) {
  return {
    type: "toggle",
    payload: {
      currentPosition,
    },
  };
}

export function dispatchAdd(name) {
  return {
    type: "add",
    payload: {
      name,
    },
  };
}

export function reducer(state, action) {
  if (action.type === "move") {
    return move(
      state,
      action.payload.currentPostion,
      action.payload.newPosition
    );
  }
  if (action.type === "toggle") {
    return toggle(state, action.payload.currentPosition);
  }
  if (action.type === "add") {
    return add(state, action.payload.name);
  }
  return state;
}
