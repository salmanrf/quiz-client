import { writable } from "svelte/store";
import type { Room } from "../models/room/Room.interface";

export const room_store = writable<Room>({
  title: "",
  quota: 0,
  used_quota: 0,
  admin_name: "",
  code: "",
  quiz_code: "",
});
