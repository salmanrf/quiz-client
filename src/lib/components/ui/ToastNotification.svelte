<script lang="ts">
  import type { Notification } from "src/lib/models/notification/Notification.model";
  import { fly } from "svelte/transition";

  export let notification: Notification
  const {content, config} = notification;
</script>

{#if notification.show}
  <div 
    class="mt-3 py-3 px-6 bg-white rounded"
    transition:fly={{y: 32, duration: 500}}
  >
    {notification.content}
  </div>
{/if}