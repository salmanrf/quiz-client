<script lang="ts">
  import { fetchFindRooms } from "src/lib/api/room-api";
  import type { Room } from "src/lib/interfaces/room/Room.interface";
  import { promiseTuplify } from "src/lib/utils/promise-utils";
  import { onMount } from "svelte";
  import JoinQuizForm from "./JoinQuizForm.svelte";
  import RoomItem from "./RoomItem.svelte";

  let rooms: Room[] = []
  
  onMount(findOpenRooms)
  
  async function findOpenRooms() {
    const [res, error] = await promiseTuplify(fetchFindRooms())

    if(error) {
      return
    }

    const {items} = res;

    rooms = items;
  }
</script>

<div class="w-96 mr-4 p-3 rounded-md shadow-sm shadow-slate-800 bg-white">
  <div class="flex justify-between">
    <h1 class="text-lg font-bold text-slate-800">Open Rooms</h1>
    <div class="flex items-center">
      <span>10 Online</span>
    </div>
  </div>
  <div class="mt-6">
    <JoinQuizForm />
  </div>
  <div class="mt-6 flex flex-col">
    {#each rooms as room}
      <RoomItem {...{room}} />
    {/each}
  </div>
</div>