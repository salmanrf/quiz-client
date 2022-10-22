import { writable } from "svelte/store";
import type { Message } from "src/lib/models/messages/message.model";

export interface SocketHandler {
  on<T>(pattern: string, handler: (message: Message<T>) => void): void;
  emit<T>(message: Message<T>): void;
  close(code?: number, reason?: string): void;
}

export const socket_store = writable<SocketHandler>(null);
