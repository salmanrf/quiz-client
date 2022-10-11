<script lang="ts">
  import Input from "src/lib/components/form/Input.svelte"
  import type { Question } from "src/lib/models/quiz/Quiz.interface";
  import type { RoomQuizData } from "src/lib/models/room/Room.interface";
  import { fade } from "svelte/transition";

  export let submit: (values: RoomQuizData) => void
  export let step: number;
  
  let submitted = 0;
  let error_messages = "";
  
  let questions: Question[] = [
    {
      answers: [
        {
          label: "A",
          value: "",
        },
        {
          label: "B",
          value: "",
        },
        {
          label: "C",
          value: "",
        },
        {
          label: "D",
          value: "",
        },
      ],
      description: "",
      type: "",
      correct_answer: null
    }
  ]

  function createQuestion() {
    questions = [
      ...questions, 
      {
        answers: [
          {
            label: "A",
            value: ""
          },
          {
            label: "B",
            value: ""
          },
          {
            label: "C",
            value: ""
          },
          {
            label: "D",
            value: ""
          },
        ],
      description: "",
      type: "",
      correct_answer: null
    }
  ]
  }

  function onSubmit(e: Event) {
    submitted += 1
    
    const valid = validateForm();

    if(valid) {
      submit({questions})
    }
    
  }

  function validateForm() {
    for(let index = 0; index < questions.length; index++) {
      const {description, answers, correct_answer} = questions[index];

      if(!description) {
        error_messages = `Question ${index + 1} has empty description.`
        return false;
      }

      if(answers.some(({value}) => !value)) {
        error_messages = `Question ${index + 1} has empty answer.`
        return false;
      }

      if(!correct_answer) {
        error_messages = `Question ${index + 1} doesn't have correct answer.`
        return false;
      }
    }

    error_messages = null
    return true
  }
</script>

{#if step === 1}
  <form action="" on:submit|preventDefault={onSubmit} transition:fade={{duration: 750}}>
    <h1 class="text-lg font-bold text-slate-800 text-center">Quiz Questions</h1>
    {#each questions as q, index (index)}
      <div class="mt-4 p-2 border">
        <div class="flex items-center">
          <label for="title" class="w-100 block text-sm mb-1 mr-2 font-bold">{index + 1}.</label>
          <Input
            name={`question-${index}`}
            bind:value={q.description}
            placeHolder={`Question ${index + 1}`}
          />
        </div>
          <div class="mt-3 grid grid-cols-1 gap-2">
            {#each q.answers as answer (answer.label)}
              <div class="flex justify-content-start items-center">
                <label for="title" class="w-100 block text-sm mb-1 mr-2 font-bold">{answer.label}.</label>
                <Input
                  classNames="mr-2"
                  name={`question-${index}-${answer.label}`}
                  bind:value={answer.value}
                  placeHolder={answer.label}
                />
                <Input 
                  type="radio"
                  name={`question-${index}-answer`}
                  bind:group={q.correct_answer}
                  value={answer.label}
                />
              </div>
            {/each}
        </div>
      </div>
    {/each}
    <div class="mt-3 flex flex-col">
      <button 
        type="button" 
        class="py-2 px-4 flex-grow bg-cyan-700 text-slate-200"
        on:click={createQuestion}
      >
        <span class="text-2xl">+</span>
      </button>
      {#if submitted > 0 && error_messages}
        <div class="my-3 text-center text-base text-red-400">
          {error_messages}
        </div>
      {/if}
      <button 
        type="submit" 
        class="mt-3 py-2 px-4 flex-grow bg-cyan-700 text-slate-200"
      >
        <span class="">Submit</span>
      </button>
    </div>
  </form>
{/if}