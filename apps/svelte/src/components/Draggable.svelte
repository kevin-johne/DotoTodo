<script lang="ts">
  import type { Todo } from "@core/types/types";
  import {  onDestroy, onMount } from "svelte";

  export let item: Todo;
  export let isDragging: boolean = false;
  let dragNode: HTMLElement;

  function onDragStart(event: DragEvent) {
    event.dataTransfer?.setData("application/json", JSON.stringify(item));
    isDragging = true;
  }

  function onDragEnd() {
    isDragging = false;
  }

  onMount(() => {
    if (dragNode === null) return;
    dragNode.setAttribute("draggable", "true");
    dragNode.addEventListener("dragstart", onDragStart);
    dragNode.addEventListener("dragend", onDragEnd);
  });

  onDestroy(() => {
    if (dragNode === null) return;
    dragNode.setAttribute("draggable", "false");
    dragNode.removeEventListener("dragstart", onDragStart);
    dragNode.removeEventListener("dragend", onDragEnd);
  });
</script>

<div bind:this={dragNode}><slot /></div>
