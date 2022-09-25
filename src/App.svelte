<script lang="ts">
import JoinQuizForm from "src/lib/pages/main/components/JoinQuizForm.svelte";
import { InitSocket } from "src/lib/utils/socket";
import Index from "./lib/pages/main/components/Index.svelte";
import OpenRoomsList from "./lib/pages/main/components/OpenRoomsList.svelte";

  let socket: WebSocket = null
  
  $: {
  }

  $: {
    if(socket) {
      socket.addEventListener("open", (e) => {
        console.log('open', e);

        socket.addEventListener("message", (e) => {
          console.log('message', JSON.parse(e.data));
        })

        socket.send(JSON.stringify({event: "start", data: {test: "123", }}))
      })

      socket.addEventListener("error", (e) => {
        console.log('JOIN ERROR', e);
      })
    }
  }
</script>

<main class="flex justify-center items-center">
  <Index />
</main>

<style>
  main {
    min-height: 100vh;
  }
</style>