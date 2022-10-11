<script lang="ts">
  export let on_click: (e: MouseEvent) => void = () => null
  export let class_names: string = ""
  export let type: "button" | "submit" = "button"
  export let text: string = ""
  export let loading: boolean = false
</script>

<button 
  type={type}
  class={`py-2 px-3 flex justify-center items-center rounded-md bg-teal-500 text-white ${class_names}`}
  on:click={on_click}
>
  {#if loading}
    <i class="fa-solid fa-circle-notch fa-spin"></i>
  {:else if text}
    {text}
  {:else}
    <slot></slot>
  {/if}
</button>