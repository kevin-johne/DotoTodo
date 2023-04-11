import React, { useMemo, useReducer, useState } from "react";
import { List } from "./components/List";
import { reducer, initState, dispatchAdd } from "./store/store";
import { AppContext } from "./store/context";

export function App () {
  const [state, dispatch] = useReducer(reducer, initState);
  const [newItem, setNewItem] = useState("");

  const { todos } = state;
  const backlogItems = todos.filter(({ checked }) => checked === false);
  const doneItems = todos.filter(({ checked }) => checked === true);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newItem !== "") {
      dispatch(dispatchAdd(newItem));
      setNewItem("");
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app">
        <h1>
          A To Do App <br />
          <span className="subtitle">with drag and drop</span>
        </h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="newItem"
            value={newItem}
            max-length="120"
            placeholder="What do you want to learn?"
            onChange={(event) => {
              setNewItem(event.target.value);
            }}
            
          />
        </form>
        <div className="row">
          <List heading="List of Frameworks" items={backlogItems} />
          <List heading="Learned" items={doneItems} />
        </div>
      </div>
    </AppContext.Provider>
  );
};
