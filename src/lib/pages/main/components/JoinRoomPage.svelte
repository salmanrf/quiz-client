<script>
  import CreateRoomForm from "src/lib/components/join-room/CreateRoomForm.svelte";
  import OpenRoomsList from "src/lib/components/join-room/OpenRoomsList.svelte";
</script>

<div class="my-8 grid grid-cols-1 md:grid-cols-2 md:gap-6">
  <OpenRoomsList />
  <CreateRoomForm />
</div>