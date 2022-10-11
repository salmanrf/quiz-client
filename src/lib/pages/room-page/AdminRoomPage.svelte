<script lang="ts">
  import ActionButton from "src/lib/components/ui/ActionButton.svelte";
import Card from "src/lib/components/ui/Card.svelte";
  import { room_store } from "src/lib/stores/room-store";
  import { user_store } from "src/lib/stores/user.store";
  import { fade } from "svelte/transition";

  $: {
    console.log('user', $user_store);
  }

  $: {
    console.log('room', $room_store);
  }
  
</script>

<div class="flex-grow flex flex-col px-4" transition:fade={{duration: 750}}>
  <Card
    class_names=""
  >
    <div class="text-base text-center font-bold">
      <h2 class="">ROOM</h2>
    </div>
    <div class="flex items-center">
      <div class="text-base">
        <span class="font-bold">Admin:</span>
        <span class="font-semibold">{$user_store.username}</span>
      </div>
    </div>
    <div class="mt-1 flex items-center">
      <div class="text-base">
        <span class="font-bold">Title:</span>
        <span class="font-semibold">{$room_store.title}</span>
      </div>
    </div>
    <div class="mt-1 flex items-center">
      <div class="text-base">
        <span class="font-bold">Code:</span>
        <span class="font-semibold">{$room_store.code}</span>
      </div>
    </div>
  </Card>

  <Card
    class_names="mt-4"
  >
    <div class="text-base text-center font-bold">
      <h2 class="">MEMBERS</h2>
      <div class="">2 / 5</div>
    </div>
    <div class="mt-3 flex flex-col">
      
    </div>
  </Card>

  <Card
    class_names="mt-4 flex justify-center"
  >
    <ActionButton 
      text="START"
      class_names="w-24 h-9 font-bold"
    />
  </Card>
</div>


