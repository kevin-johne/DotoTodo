<script lang="ts">
  import type { Todo } from "@core/types/types";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  export let backgroundColor: string = "";
  export let isOver: boolean = false;
  let node: HTMLElement;
  const dispatch = createEventDispatcher<{ dropped: Todo }>();

  function onDrop(event: DragEvent) {
    const unparsedItem = event.dataTransfer?.getData("application/json");
    if (!unparsedItem) {
      return;
    }
    const item = JSON.parse(unparsedItem);
    dispatch("dropped", item);
    isOver = false;
    event.preventDefault();
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
    isOver = true;
  }

  function onLeave(event: DragEvent) {
    event.preventDefault();
    isOver = false;
  }

  function onEnter(event: DragEvent) {
    event.preventDefault();
  }

  onMount(() => {
    if (node === null) {
      return;
    }

    node.addEventListener("drop", onDrop);
    node.addEventListener("dragover", onDragOver);
    node.addEventListener("dragenter", onEnter);
    node.addEventListener("dragleave", onLeave);
  });
  onDestroy(() => {
    return () => {
      node.removeEventListener("drop", onDrop);
      node.removeEventListener("dragover", onDragOver);
      node.removeEventListener("dragenter", onEnter);
      node.removeEventListener("dragleave", onLeave);
    };
  });
</script>

<div
  class="droppable"
  style:background-color={backgroundColor}
  bind:this={node}
>
  <slot />
</div>
