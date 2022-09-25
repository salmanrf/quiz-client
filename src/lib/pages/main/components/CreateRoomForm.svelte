<script lang="ts">
  import type { Question } from "src/lib/interfaces/quiz/Quiz.interface";
  import type { RoomGeneralData, RoomQuizData } from "src/lib/interfaces/room/Room.interface";
  import GeneralRoomForm from "./RoomForm/GeneralRoomForm.svelte";
  import RoomQuizForm from "./RoomForm/RoomQuizForm.svelte";

  let step = 0

  let room: RoomGeneralData = null;
  let questions: Question[] = null;
  
  $: {
    if(room && questions instanceof Array) {
      submitRoom()
    }
  }
  
  function submitGeneral(values: RoomGeneralData) {
    step += 1

    room = {...values}
  }

  function submitQuestions(values: RoomQuizData) {
    step += 1

    questions = [...values.questions]
  }

  async function submitRoom() {
    console.log('room submitted');
  }
</script>

<div class="w-96 p-3 rounded-md shadow-sm shadow-slate-800 bg-white">
  {#if step === 0}
    <GeneralRoomForm submit={submitGeneral} />
  {/if}
  {#if step === 1}
    <RoomQuizForm  submit={submitQuestions} />
  {/if}
  {#if step === 2}
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-slate-800 text-center">Creating Room</h1>
      <div class="mt-5">
        <i class="fa-solid fa-circle-notch fa-spin text-2xl"></i>
      </div>
    </div>
  {/if}
</div>