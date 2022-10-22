<script lang="ts">
  import { fetchCreateQuiz } from "src/lib/api/quiz-api";
  import { fetchCreateRoom, fetchJoinRoom } from "src/lib/api/room-api";
  import type { Question } from "src/lib/models/quiz/Quiz.interface";
  import type { Room, RoomQuizData } from "src/lib/models/room/Room.interface";
  import { fade } from "svelte/transition";
  import GeneralRoomForm from "src/lib/components/join-room/RoomForm/GeneralRoomForm.svelte";
  import RoomQuizForm from "src/lib/components/join-room/RoomForm/RoomQuizForm.svelte";

  let step = 0

  let room: Room = null;
  let questions: Question[] = null;
  let loading = false;
  
  let transition_to: Promise<number> = null;
  
  $: {
    if(room && questions instanceof Array) {
      submitRoom()
    }
  }

  $: {
    transition_to = createTimeout(step, 750)
  }
  
  function createTimeout(to: number, duration: number): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(to)
      }, duration)
    }) 
  }
  
  function submitGeneral(values: Room) {
    step += 1

    room = {...values}
  }

  function submitQuestions(values: RoomQuizData) {
    step += 1

    questions = [...values.questions]
  }

  async function submitRoom() {
    loading = true;
    
    try {
      const quiz_res = await fetchCreateQuiz({
        title: room.title,
        questions
      })

      const {data: quiz_data} = quiz_res;
      
      const room_res = await fetchCreateRoom({
        ...room,
        quiz_code: quiz_data.code
      })

      const {code} = room_res.data
      
      fetchJoinRoom(code, room.admin_name, room.password)
    } catch(error) {
      console.log('error', error);
    } finally {
      loading = false
    }
  }
</script>

<div class="w-96 p-3 rounded-md shadow-sm shadow-slate-800 bg-white overflow-hidden">
  <GeneralRoomForm step={step} submit={submitGeneral} />
  {#await transition_to}
    <div></div>
  {:then next_step} 
  <RoomQuizForm step={next_step} submit={submitQuestions} />
  {/await}
  {#await transition_to}
    <div></div>
  {:then next_step} 
    {#if next_step === 2}
      <div class="h-80 flex flex-col justify-center items-center" transition:fade={{duration: 750}}>
        <h1 class="text-2xl font-bold text-slate-800 text-center">Creating Room</h1>
        {#if loading}
          <div class="mt-10">
            <i class="fa-solid fa-circle-notch fa-spin text-2xl"></i>
          </div>
        {:else}
          <div class="mt-10">
            <h1 class="text-base font-bold text-slate-800 text-center">Redirecting to newly created room...</h1>
          </div>
        {/if}
      </div>
    {/if}
  {/await}
</div>