import type { JoinRoomMessage } from "../models/messages/join-room-message.model";
import type { Message } from "../models/messages/message.model";
import { room_store } from "../stores/room-store";
import { user_store } from "../stores/user.store";

let handlers = new Map<string, (e: Message<any>) => void>();

handlers.set("room_join", handle_join_room);

function handle_message(e: MessageEvent) {
  const { event, data }: Message<any> = JSON.parse(e.data);

  const handler = handlers.get(event);

  if (handler instanceof Function) {
    handler({ event, data });
  }
}

function handle_error(e: Event) {
  console.log("e", e);
}

export function register_join_handlers(ws: WebSocket) {
  ws.addEventListener("message", handle_message);

  ws.addEventListener("close", () => unregister_join_handlers(ws));
}

export function unregister_join_handlers(ws: WebSocket) {
  ws.removeEventListener("message", handle_message);
  ws.removeEventListener("error", handle_error);

  handlers = new Map<string, (e: Message<any>) => void>();
}

function handle_join_room(message: Message<JoinRoomMessage>) {
  const { data } = message;
  const { id, username, role, room } = data;

  room_store.set({ ...room });
  user_store.set({ id, role, username });
}
