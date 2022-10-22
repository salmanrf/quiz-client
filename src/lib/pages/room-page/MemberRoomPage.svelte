<script lang="ts">
  import Card from "src/lib/components/ui/Card.svelte";
  import type { JoinRoomMessage } from "src/lib/models/messages/join-room-message.model";
  import type { Message } from "src/lib/models/messages/message.model";
  import { push_notification } from "src/lib/stores/notification-store";
  import { room_store } from "src/lib/stores/room-store";
  import { socket_store } from "src/lib/stores/socket-store";
  import { user_store } from "src/lib/stores/user.store";
  import { fade } from "svelte/transition";

  $: {
    if($socket_store) {
      $socket_store.on("member_join", (message: Message<JoinRoomMessage>) => {
        const { data } = message;
        const { username, room } = data;

        room_store.update((prev) => ({ ...prev, ...room }));
        push_notification({ content: `${username} has joined the room !`, ttl: 2500 });
      }) 
    }
  }
  
</script>

<div class="flex-grow flex flex-col px-4" transition:fade={{duration: 750}}>
  <Card
    class_names=""
  >
    <div class="text-base text-center font-bold">
      <h2 class="">ROOM</h2>
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
    <div class="flex items-center">
      <div class="text-base">
        <span class="font-bold">Admin:</span>
        <span class="font-semibold">{$room_store.admin_name}</span>
      </div>
    </div>
  </Card>

  <Card
    class_names="mt-4"
  >
    <div class="text-base text-center font-bold">
      <h2 class="">STATUS</h2>
    </div>
    <div class="flex items-center">
      <div class="text-base">
        <span class="font-bold">Username:</span>
        <span class="font-semibold">{$user_store.username}</span>
      </div>
    </div>
    <div class="mt-1 flex items-center">
      <div class="text-base">
        <span class="font-bold">Score:</span>
        <span class="font-semibold">{0}</span>
      </div>
    </div>
  </Card>

  <Card
    class_names="mt-4"
  >
    <div class="text-base text-center font-bold">
      <h2 class="">MEMBERS</h2>
      <div class="">{$room_store.used_quota} / {$room_store.quota}</div>
    </div>
    <div class="mt-3 flex flex-col">
      
    </div>
  </Card>
</div>


