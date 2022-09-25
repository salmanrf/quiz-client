export interface ApiResponse<T> {
  message: string;
  data: FindResponse<T>;
}

export interface FindResponse<T> {
  items: T[];
}
