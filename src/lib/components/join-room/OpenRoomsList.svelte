<script lang="ts">
  import { fetchFindRooms, fetchJoinRoom } from "src/lib/api/room-api";
  import type { Room } from "src/lib/models/room/Room.interface";
  import RoomItem from "src/lib/pages/main/components/RoomItem.svelte";
  import { promiseTuplify } from "src/lib/utils/promise-utils";
  import { onMount } from "svelte";
  import Input from "src/lib/components/form/Input.svelte";
  import JoinQuizForm from "src/lib/components/join-room/JoinQuizForm.svelte";
  import Modal from "src/lib/components/ui/Modal.svelte";
  import ActionButton from "src/lib/components/ui/ActionButton.svelte";

  let rooms: Room[] = [];
  let loading = false;
  let selected_room: Room; 
  
  let username = ""
  let password = ""
  
  onMount(findOpenRooms)
  
  async function findOpenRooms() {
    const [res, error] = await promiseTuplify(fetchFindRooms())

    if(error) {
      return;
    }

    const {items} = res;

    rooms = items;
  }

  async function submitJoin() {
    if(!username || !password) {
      return  
    }

    loading = true;

    fetchJoinRoom(selected_room.code, username, password)
  }
</script>

<div class="w-96 mb-3 p-3 rounded-md shadow-sm shadow-slate-800 bg-white">
  <div class="flex justify-between">
    <h1 class="text-lg font-bold text-slate-800">Open Rooms</h1>
    <div class="flex items-center">
      <span>10 Online</span>
    </div>
  </div>
  <Modal
    shown={Boolean(selected_room)}
    close={() => selected_room = null}
  >
  <form action="" class="flex flex-col" on:submit|preventDefault={submitJoin}>
    <h2 class="font-bold text-center text-base">Join {selected_room.title}</h2>
    <div class="mt-3 flex flex-col">
      <div class="flex flex-col items-center">
        <div class="w-full text-left">
          <label for="title" class="w-100 block text-sm mb-1 mr-2 font-bold">Username</label>
        </div>
        <Input
          name={`username`}
          bind:value={username}
          placeHolder={`Salman...`}
        />
      </div>
      <div class="mt-3 flex flex-col items-center">
        <div class="w-full text-left">
          <label for="title" class="w-100 block text-sm mb-1 mr-2 font-bold">Password</label>
        </div>
        <Input
          name={`password`}
          type="password"
          bind:value={password}
          placeHolder={`******`}
        />
      </div>
    </div>
    <div class="mt-3 flex justify-end">
      <ActionButton 
        loading={loading}
        class_names="w-24"
        type={"submit"}
        text="Join"
      />
    </div>
  </form>
  </Modal>
  <div class="mt-6">
    <JoinQuizForm />
  </div>
  <div class="mt-6 flex flex-col">
    {#each rooms as room}
      <RoomItem 
        {
          ...{
            room, 
            loading,
            select_room: () => selected_room = {...room}
          }
        } 
      />
    {/each}
  </div>
</div>