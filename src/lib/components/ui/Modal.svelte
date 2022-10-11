<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import Card from "./Card.svelte";

  export let shown: boolean
  export let close: () => void
</script>

{#if shown}
  <div
    class="fixed top-0 left-0 bottom-0 right-0 bg-slate-900 bg-opacity-50"
    on:click={close}
    transition:fade={{duration: 250}}
  >
  </div>
  <div 
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 md:w-1/2"
    transition:fly={{y: 100, duration: 500}}
  >
    <Card>
      <slot></slot>
    </Card>
  </div>
{/if}
