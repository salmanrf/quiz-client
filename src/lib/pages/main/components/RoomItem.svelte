<script lang="ts">
  import ActionButton from "src/lib/components/ui/ActionButton.svelte";
  import type { Room } from "src/lib/models/room/Room.interface";

  export let select_room: () => void
  export let room: Room;
  export let loading: boolean = false

</script>

<div class="mb-4 p-2 rounded-md shadow-sm shadow-slate-800 text-slate-800">
  <div class="flex justify-between">
    <h2 class="text-lg font-bold">{room.title}</h2>
    <div class="flex items-center">
      <span class="w-3 h-3 mr-2 rounded-full bg-emerald-500" />
      <span>{room.used_quota} / {room.quota}</span>
    </div>
  </div>
  <div class="mt-2 flex justify-between items-center text-base">
    <div class="font-medium">
      Code: {room.code}
    </div>
    <ActionButton 
      text="Join" 
      loading={loading}
      on_click={select_room}
    />
  </div>
</div>