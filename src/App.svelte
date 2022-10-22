<script lang="ts">
  import { onDestroy } from "svelte";
  import JoinRoomPage from "src/lib/pages/main/components/JoinRoomPage.svelte";
  import AdminRoomPage from "src/lib/pages/room-page/AdminRoomPage.svelte";
  import MemberRoomPage from "src/lib/pages/room-page/MemberRoomPage.svelte";
  import { socket_store } from "src/lib/stores/socket-store";
  import { user_store } from "src/lib/stores/user.store";
  import ToastContainer from "src/lib/components/ui/ToastContainer.svelte";
  import type { Message } from "src/lib/models/messages/message.model";
  import type { JoinRoomMessage } from "src/lib/models/messages/join-room-message.model";
  import { room_store } from "src/lib/stores/room-store";
  import { push_notification } from "src/lib/stores/notification-store";

  let transition_to: Promise<number> = null;
  
  $: {
    if($socket_store) {
      $socket_store.on("room_join", (message: Message<JoinRoomMessage>) => {
        const { data } = message;
        const { id, username, role, room } = data;

        room_store.set({ ...room });
        user_store.set({ id, role, username });
        push_notification({content: "Connected!", ttl: 2500})
      })
    }
  }

  $: {
    transition_to = createTimeout($user_store.role, 750)
  }
  
  function createTimeout(to: number, duration: number): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(to)
      }, duration)
    }) 
  }

  onDestroy(() => {
    if($socket_store) {
      $socket_store.close()
    }
  })
</script>

<!-- ? Notification Container -->
<ToastContainer />
<!-- ? Notification Container -->

<main class="flex justify-center items-center">
  {#if !$user_store.role}
    <JoinRoomPage />
  {/if}
  {#await transition_to}
    {null}
  {:then role}
    {#if role === 1}
      <AdminRoomPage />
    {/if}
  {/await}
  {#await transition_to}
    {null}
  {:then role}
    {#if role === 2}
      <MemberRoomPage />
    {/if}
  {/await}
</main>

<style>
  main {
    min-height: 100vh;
  }
</style>