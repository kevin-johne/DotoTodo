<script lang="ts">
  import type { Todo } from "@core/types/types";
  import List from "./components/List.svelte";
  import { store, add } from "./store/store";

  var backlogItems: Todo[];
  var doneItems: Todo[];
  var newItem: string = "";
  store.subscribe((state) => filterLists(state.todos));

  function filterLists(todos: Todo[]) {
    backlogItems = [];
    doneItems = [];
    for (let index = 0; index < todos.length; index++) {
      const item = todos[index];
      if (item.checked === true) {
        doneItems.push(item);
      } else {
        backlogItems.push(item);
      }
    }

    backlogItems = backlogItems;
    doneItems = doneItems;
  }

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (newItem === "") {
      return;
    }
    add(newItem);
    newItem = "";
  }
</script>

<div class="app">
  <h1>
    A To Do App <br />
    <span class="subtitle">with drag and drop</span>
  </h1>

  <form on:submit={onSubmit}>
    <input
      type="text"
      bind:value={newItem}
      name="newItem"
      maxlength="120"
      placeholder="What do you want to learn?"
    />
  </form>
  <div class="row">
    <List heading="List of Frameworks" items={backlogItems} />
    <List heading="Learned" items={doneItems} />
  </div>
</div>
