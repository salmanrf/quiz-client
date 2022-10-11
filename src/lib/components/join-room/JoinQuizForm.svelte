<script lang="ts">
import { fetchFindQuizzes } from "src/lib/api/quiz-api";

import { InitSocket } from "src/lib/utils/socket";


  let socket: WebSocket = null
  let quiz_code = "";
  let loading = false
  
  $: {
    if(socket) {
      socket.addEventListener("open", (e) => {
        console.log('e', e);
      })
    }
    if(socket) {
      socket.addEventListener("error", (e) => {
        console.log('error', e);
      })
    }
  }

  async function submit(e: Event) {
    try {
      loading = true
      
      interface Message<T> {
        name: string;
        data: T; 
      }
      
      const message: Message<{quiz_code: string}> = {
        name: "join",
        data: {
          quiz_code
        }
      }

      socket = InitSocket("wss://localhost:8080/ws/room/?quiz_code=ashquiz")
    } catch(error) {
      console.log("error", error);
    } finally {
      loading = false
    }
  }

  async function findQuiz() {
    const res = await fetchFindQuizzes();

    console.log(res);
  }
</script>

<div class="p-3 rounded-md shadow-sm shadow-slate-800 ">
  <form action="" on:submit|preventDefault={submit}>
    <h1 class="text-lg font-bold text-slate-800">Enter quiz code</h1>
    <h3 class="text-md text-slate-400">To play with your friends.</h3>
    <div class="mt-3 flex p-1 bg-slate-500">
      <input class="py-2 px-2 flex-grow bg-transparent text-white text-md outline-none" type="text" bind:value={quiz_code}>
      <button type="submit" class="py-2 px-4 bg-cyan-700 text-slate-200">Enter</button>
    </div>
  </form>
</div>