<script lang="ts">
  export let value: string | number = null
  export let group: string | number = null
  export let checked: boolean = false
  export let name: string = ""
  export let type: "text" | "checkbox" | "radio" | 
  "number" | "password" = "text"
  export let classNames = ""
  export let placeHolder = ""
  let input_type = "text"

  $: {
    const types = [
      "radio", 
      "checkbox", 
      "number", 
      "text", 
      "textarea", 
      "password"
    ];

    if(types.includes(type)) {
      input_type = type
    }
  }

</script>

{#if type === "text"}
  <input 
    type="text"
    name={name} 
    class={`w-full block py-2 px-2 bg-transparent text-slate-800 text-md border rounded-md focus:border-cyan-600 outline-none ${classNames}`} 
    placeholder={placeHolder}
    bind:value={value}
  >
{/if}

{#if type === "checkbox"}
  <input 
    type="checkbox"
    name={name} 
    class={`w-full block py-2 px-2 bg-transparent text-slate-800 text-md border rounded-md focus:border-cyan-600 outline-none ${classNames}`} 
    bind:checked={checked}
  >
{/if}

{#if type === "radio"}
  <input 
    type="radio"
    name={name} 
    class={`py-2 px-2 bg-transparent text-slate-800 text-md border rounded-md focus:border-cyan-600 outline-none ${classNames}`} 
    bind:group={group}
    value={value}
  >
{/if}

{#if type === "number"}
  <input 
    type="number"
    name={name} 
    class="w-full block py-2 px-2 bg-transparent text-slate-800 text-md border rounded-md focus:border-cyan-600 outline-none" 
    placeholder={placeHolder}
    bind:value={value}
  >
{/if}

{#if type === "password"}
  <input
    type="password"
    name={name} 
    class="w-full block py-2 px-2 bg-transparent text-slate-800 text-md border rounded-md focus:border-cyan-600 outline-none" 
    placeholder={placeHolder}
    bind:value={value}
  >
{/if}
