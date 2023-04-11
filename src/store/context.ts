import { createContext } from "react";
import { ContextType } from "../types/store";

export const AppContext = createContext<ContextType>({
  state: {
    todos: []
  },
  dispatch: () => {}
});
