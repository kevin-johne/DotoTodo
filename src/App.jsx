import React, { useMemo, useReducer } from "react";
import { List } from "./components/List";
import * as store from "./store/store";
import { AppContext } from "./store/context";

export const App = function () {
  const [state, dispatch] = useReducer(store.reducer, store.initState);
  const {todos} = state;
  const backlogItems = todos.filter(({checked}) => checked === false );
  const doneItems = todos.filter(({checked}) => checked === true);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
  }), [state, dispatch])

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app">
        <h1>A To Do App <br/><span className="subtitle">with drag and drop</span> </h1>
        
        <div className="row">
          <List heading="List of Frameworks" items={backlogItems}/>
          <List heading="Learned" items={doneItems}/>
        </div>
      </div>
    </AppContext.Provider>
  );
};
