import { writable } from "svelte/store";
import data from "@data/init.json";
import * as core from "@core/index";
import type { State } from "../types/store";

export const store = writable<State>({
  todos: data.todos,
});

export function move(currentPos: number, targetPos: number) {
  store.update((state) => {
    state.todos = core.move(state.todos, currentPos, targetPos);
    return state;
  });
}

export function toggle(currentPos: number) {
  store.update((state) => {
    state.todos = core.toggle(state.todos, currentPos);
    return state;
  });
}

export function remove(currentPos: number) {
  store.update((state) => {
    state.todos = core.remove(state.todos, currentPos);
    return state;
  });
}

export function add(name: string) {
  store.update((state) => {
    state.todos.push({
      name,
      pos: state.todos.length,
      checked: false,
    });
    state.todos = state.todos;
    return state;
  });
}
