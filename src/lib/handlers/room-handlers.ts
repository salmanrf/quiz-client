import type { JoinRoomMessage } from "../models/messages/join-room-message.model";
import type { Message } from "../models/messages/message.model";
import { push_notification } from "../stores/notification-store";
import { room_store } from "../stores/room-store";
import { user_store } from "../stores/user.store";

let handlers = new Map<string, (e: Message<any>) => void>();

handlers.set("room_join", handle_join_room);
handlers.set("member_join", handle_member_join);

function handle_message(e: MessageEvent) {
  console.log("e.data", e.data);

  const { event, data }: Message<any> = JSON.parse(e.data);

  const handler = handlers.get(event);

  if (handler instanceof Function) {
    handler({ event, data });
  }
}

function handle_error(e: Event) {
  console.log("e", e);
}

export function register_room_handlers(ws: WebSocket) {
  ws.addEventListener("message", handle_message);

  ws.addEventListener("close", () => unregister_room_handlers(ws));
}

export function unregister_room_handlers(ws: WebSocket) {
  ws.removeEventListener("message", handle_message);
  ws.removeEventListener("error", handle_error);
}

function handle_join_room(message: Message<JoinRoomMessage>) {
  const { data } = message;
  const { id, username, role, room } = data;

  room_store.set({ ...room });
  user_store.set({ id, role, username });
}

function handle_member_join(message: Message<JoinRoomMessage>) {
  const { data } = message;
  const { username, room } = data;

  room_store.update((prev) => ({ ...prev, ...room }));
  push_notification({ content: `${username} has joined the room !`, ttl: 2500 });
}
