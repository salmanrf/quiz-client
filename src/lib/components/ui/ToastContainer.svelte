<script lang="ts">
  import { notification_store } from "src/lib/stores/notification-store";
  import ToastNotification from "./ToastNotification.svelte";

</script>

<div class="fixed bottom-8 w-full flex flex-col-reverse justify-center items-center z-10 shadow-md">
  {#each $notification_store as notification (notification.id)}
    {#if notification.show}
      <ToastNotification notification={notification} />
    {/if}
  {/each}
</div>