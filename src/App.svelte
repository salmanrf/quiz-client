<script lang="ts">
  import { onDestroy } from "svelte";
  import { register_room_handlers, unregister_room_handlers } from "./lib/handlers/room-handlers";
  import JoinRoomPage from "src/lib/pages/main/components/JoinRoomPage.svelte";
  import AdminRoomPage from "src/lib/pages/room-page/AdminRoomPage.svelte";
  import MemberRoomPage from "src/lib/pages/room-page/MemberRoomPage.svelte";
  import { socket_store } from "src/lib/stores/socket-store";
  import { user_store } from "src/lib/stores/user.store";
  import { notification_store } from "./lib/stores/notification-store";
  import { fly } from "svelte/transition";

  $: {
    if($socket_store) {
      register_room_handlers($socket_store)
    }
  }

  onDestroy(() => {
    if($socket_store) {
      unregister_room_handlers($socket_store)
    }
  })
</script>

<!-- ? Notification Container -->
<div class="fixed bottom-8 w-full flex flex-col-reverse justify-center items-center z-10 shadow-md">
  {#each $notification_store as notification}
    {#if notification.show}
      <div 
        class="mt-3 py-3 px-6 bg-white rounded"
        transition:fly={{y: 32, duration: 500}}
      >
        {notification.content}
      </div>
    {/if}
  {/each}
</div>
<!-- ? Notification Container -->

<main class="flex justify-center items-center">
  {#if !$user_store.role}
    <JoinRoomPage />
  {/if}
  {#if $user_store.role === 1}
    <AdminRoomPage />
  {/if}
  {#if $user_store.role === 2}
    <MemberRoomPage />
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
  }
</style>