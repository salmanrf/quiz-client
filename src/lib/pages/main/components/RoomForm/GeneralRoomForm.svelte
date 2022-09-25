<script lang="ts">
  import Input from "src/lib/components/form/Input.svelte"
  import type { RoomGeneralData } from "src/lib/interfaces/room/Room.interface";

  export let submit: (values: RoomGeneralData) => void
  
  let title = ""
  let admin_name = ""
  let password = ""
  let quota = 0

  function onSubmit(e: Event) {
    submit({title, admin_name, password, quota})
  }
  
</script>

<form action="" on:submit|preventDefault={onSubmit}>
  <h1 class="text-lg font-bold text-slate-800 text-center">Create New Quiz Room</h1>
  <div class="mt-1 p-2">
    <label for="title" class="w-100 block text-sm mb-1 font-bold">Title</label>
    <Input
      name="title"
      bind:value={title}
    />
  </div>
  <div class="mt-1 p-2">
    <label for="title" class="w-100 block text-sm mb-1 font-bold">Admin Username</label>
    <Input 
      name="admin_name"
      bind:value={admin_name}
    />
  </div>
  <div class="mt-1 p-2">
    <label for="password" class="w-100 block text-sm mb-1 font-bold">Password</label>
    <Input 
      type="password"
      name="password"
      bind:value={password}
    />
  </div>
  <div class="mt-1 p-2">
    <label for="quota" class="w-100 block text-sm mb-1 font-bold">Quota</label>
    <Input 
      type="number"
      name="quota"
      bind:value={quota}
    />
  </div>
  <div class="mt-1 p-2">
    <div class="flex justify-end">
      <button type="submit" class="py-2 px-4 bg-cyan-700 text-slate-200">Create</button>
    </div>
  </div>
</form>