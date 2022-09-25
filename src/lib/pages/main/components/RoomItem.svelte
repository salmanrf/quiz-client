<script lang="ts">
  import type { Room } from "src/lib/interfaces/room/Room.interface";
  export let room: Room;

  $: {
    console.log('room', room);
  }
  
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
    <button class="py-2 px-3 rounded-md bg-teal-500 text-white">Join</button>
  </div>
</div>