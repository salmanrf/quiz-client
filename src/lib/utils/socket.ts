import type { Message } from "src/lib/models/messages/message.model";
import { socket_store } from "src/lib/stores/socket-store";

let handlers = new Map<string, (e: Message<any>) => void>();

function handle_message(e: MessageEvent) {
  console.log("e.data", e.data);

  const { event, data }: Message<any> = JSON.parse(e.data);

  const handler = handlers.get(event);

  if (handler instanceof Function) {
    handler({ event, data });
  }
}

export function InitSocket(url: string) {
  const socket = new WebSocket(url);

  socket.addEventListener("open", function () {
    this.addEventListener("message", handle_message);

    this.addEventListener("error", function (e) {
      console.log("Error Event", e);
    });

    this.addEventListener("close", function () {
      this.removeEventListener("message", handle_message);
    });
  });

  const socket_handler = {
    on<T>(pattern: string, handler: (message: Message<T>) => void) {
      handlers.set(pattern, handler);
    },
    emit<T>(message: Message<T>) {
      socket.send(JSON.stringify(message));
    },
    close: socket.close,
  };

  socket_store.set(socket_handler);

  return socket_handler;
}
