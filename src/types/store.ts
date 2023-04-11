export type ContextType = {
  state: State,
  dispatch: (value: Action) => void;
};

export type State = {
  todos: Todo[]
}

export type Todo = {
  checked: boolean,
  name: string,
  pos: number
}

export type Action = {
  type: string,
  payload: any,
}

