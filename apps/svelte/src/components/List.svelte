<script lang="ts">
  import type { Todo } from "@core/types/types";
  import Card from "./Card.svelte";
  import * as store from "../store/store";
  import { getHueByPos } from "@core/hue";
  import Draggable from "./Draggable.svelte";
  import Droppable from "./Droppable.svelte";
  import ListItem from "./ListItem.svelte";

  export let items: Todo[];
  export let heading: string = "default heading";
  let dragging: boolean;

  /**
   * Item moved up by one
   */
  function up(item: Todo) {
    const index = items.findIndex(({ pos }) => item.pos === pos);

    if (index !== 0) {
      store.move(item.pos, items[index - 1].pos);
    }
  }

  /**
   * Item moved down by one
   */
  function down(item: Todo) {
    const index = items.findIndex(({ pos }) => item.pos === pos);
    if (index + 1 !== items.length) {
      store.move(item.pos, items[index + 1].pos);
    }
  }

  /**
   * toggle Item
   * @param item
   */
  function toggle(item: Todo) {
    store.toggle(item.pos);
  }

  /**
   * remove item
   * @param item
   */
  function remove(item: Todo) {
    store.remove(item.pos);
  }

</script>

<div class="list">
  <h3>{heading}</h3>
  {#each items as item}
    <div>
      <ListItem {item}>
        <Card
          backgroundColor={`hsl(${getHueByPos(item.pos)}, 100%, 72%)`}
          {item}
          {up}
          {down}
          {toggle}
          {remove}
        />
      </ListItem>
    </div>
  {/each}
</div>
