import type { JoinRoomMessage } from "../models/messages/join-room-message.model";
import type { Message } from "../models/messages/message.model";
import { push_notification } from "../stores/notification-store";

let handlers = new Map<string, (e: Message<any>) => void>();

handlers.set("member_join", handle_member_join);

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

export function register_room_handlers(ws: WebSocket) {
  ws.addEventListener("message", handle_message);

  ws.addEventListener("close", () => unregister_room_handlers(ws));
}

export function unregister_room_handlers(ws: WebSocket) {
  ws.removeEventListener("message", handle_message);
  ws.removeEventListener("error", handle_error);
}

function handle_member_join(message: Message<JoinRoomMessage>) {
  const { data } = message;
  const { id, username, role, room } = data;

  push_notification({
    content: `${id} - ${username} Joined the room !.`,
    ttl: 1000,
  });
}
