import { createContext } from "react";

/** kinda like an interface for the AppContext  */
export const AppContext = createContext({
  state: {
    todos: []
  },
  dispatch: (object) => {},
});
