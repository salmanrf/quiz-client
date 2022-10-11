import type { Room } from "../room/Room.interface";

export interface JoinRoomMessage {
  id: string;
  username: string;
  role: number;
  room: Room;
}
