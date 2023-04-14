import { Todo } from "@core/types/types"

export type ContextType = {
  state: State,
  dispatch: (value: Action) => void;
};

export type State = {
  todos: Todo[]
}

export type Action = {
  type: string,
  payload: any,
}

