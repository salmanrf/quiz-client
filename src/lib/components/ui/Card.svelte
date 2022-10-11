<script>
  export let class_names = ""
</script>

<div class={`w-full p-3 rounded-md shadow-sm shadow-slate-800 bg-white overflow-hidden ${class_names}`}>
  <slot></slot>
</div>