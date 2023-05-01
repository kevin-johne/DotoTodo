<script lang="ts">
  import type { Todo } from "@core/types/types";
  export let item: Todo;
  export let backgroundColor: string;
  
  export let up = (item: Todo): void => {};
  export let toggle = (item: Todo): void => {};
  export let down = (item: Todo): void => {};
  export let remove = (item: Todo): void => {};
</script>

<div class="card" style:background-color={backgroundColor}>
  <input
    type="checkbox"
    bind:checked={item.checked}
    on:click={() => toggle(item)}
    id={item.name}
  />
  <label for={item.name}>{item.name}</label>
  <div class="navigation">
    <button on:click={() => up(item)}>👍</button>
    <button on:click={() => down(item)}>👎</button>
    <button on:click={() => remove(item)}>👋</button>
  </div>
</div>
