import React, { useCallback, useMemo, useState } from "react";
import { List } from "./components/List";
import { AppContext } from "./context";

export const App = function () {
  const [todos, setTodos] = useState([
    {
      checked: false,
      name: "React",
      pos: 0
    },
    {
      checked: false,
      name: "Angular",
      pos: 1
    },
    {
      checked: false,
      name: "Svelte",
      pos: 2
    },
    {
      checked: false,
      name: "Vue",
      pos: 3
    },
    {
      checked: false,
      name: "Qwik",
      pos: 4
    }
  ]);

  const sortedTodo = todos.sort((a, b) => {
    return a.pos > b.pos;
  });

  const backlogItems = sortedTodo.filter(({checked}) => checked === false );
  const doneItems = sortedTodo.filter(({checked}) => checked === true);

  const toggle = useCallback((item) => {
    const copy = [...todos];
    const foundItem = copy.find((copiedItem) => item.name === copiedItem.name);
    if(!foundItem) return;
    foundItem.checked = !foundItem.checked;
    setTodos(copy);
  },[todos, setTodos]);

  const contextValue = useMemo(() => ({
    todos,
    setTodos,
    toggle
  }), [todos, setTodos, toggle])

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
