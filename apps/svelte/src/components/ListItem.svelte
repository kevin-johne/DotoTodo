<script lang="ts">
  import Droppable from "./Droppable.svelte";
  import * as store from "../store/store";
  import type { Todo } from "@core/types/types";
  import Draggable from "./Draggable.svelte";
  import { getHueByPos } from "@core/index";

  export let item: Todo;
  let isOver: boolean = false;
  let backgroundColor: string;

  function onDropped(event: CustomEvent<Todo>) {
    // we dropped the item in the other list
    // if(items.length === 0 || items[0].checked !== droppedItem.checked) {
    // dispatch(dispatchToggle(droppedItem.pos));
    // }

    // the dropped area is on both sides of the list items: example 0 item 1 item 2 item 3 ...
    // when items new position is higher an offset of 1 is required
    const droppedItem = event.detail;
    const offset = droppedItem.pos < item.pos ? -1 : 0;
    store.move(event.detail.pos, item.pos + offset);
  }

  $: {
    backgroundColor = isOver
      ? `hsl(${getHueByPos(item.pos)},100%, 72%)`
      : "transparent";
  }
</script>

<Droppable on:dropped={onDropped} bind:isOver {backgroundColor} />
<Draggable {item}>
  <slot /></Draggable
>
