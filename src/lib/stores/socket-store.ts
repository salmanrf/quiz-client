import { writable } from "svelte/store";

export const socket_store = writable<WebSocket>(null);
