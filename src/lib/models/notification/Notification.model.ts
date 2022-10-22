export interface Notification {
  id: string;
  content: string;
  ttl: number;
  show: boolean;
  config: NotificationConfig;
}

export interface NotificationConfig {
  variant: "normal" | "warning" | "danger" | "success";
}
