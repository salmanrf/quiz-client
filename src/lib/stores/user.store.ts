import type { User } from "src/lib/models/user/user.model";
import { writable } from "svelte/store";

export const user_store = writable<User>({ id: "", role: 0, username: "" });
