export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface FindResponse<T> {
  items: T[];
}
