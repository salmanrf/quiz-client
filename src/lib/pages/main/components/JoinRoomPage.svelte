<script>
  import CreateRoomForm from "src/lib/components/join-room/CreateRoomForm.svelte";
  import OpenRoomsList from "src/lib/components/join-room/OpenRoomsList.svelte";
  import { fade, fly } from "svelte/transition";
</script>

<div 
  class="my-8" 
  transition:fly={{y: 250, duration: 750}}
>
  <div 
    class="grid grid-cols-1 md:grid-cols-2 md:gap-6"
    transition:fade={{duration: 750}}
  >
    <OpenRoomsList />
    <CreateRoomForm />
  </div>
</div>