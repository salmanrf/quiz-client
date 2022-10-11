import { writable } from "svelte/store";
import type { Notification } from "src/lib/models/notification/Notification.model";
import { nanoid } from "nanoid";

export const notification_store = writable<Notification[]>([]);

export function push_notification(options: { content: string; ttl: number }) {
  const new_notification = {
    id: nanoid(4),
    ttl: options.ttl,
    show: true,
    content: options.content,
  };

  notification_store.update((prev) => [
    ...prev,
    {
      ...new_notification,
    },
  ]);

  setTimeout(() => {
    notification_store.update((prev) => {
      const temp = [...prev];

      const ntf_index = prev.findIndex(({ id }) => id === new_notification.id);

      if (ntf_index > -1) {
        const item = temp[ntf_index];

        temp[ntf_index] = { ...item, show: false };
      }

      return temp;
    });
  }, new_notification.ttl);
}
