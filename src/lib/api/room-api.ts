import type { ApiResponse, FindResponse } from "../interfaces/api/Response.interface";
import type { Room } from "../interfaces/room/Room.interface";

const ROOM_URL = "http://localhost:8080/api/room";

export async function fetchCreateRooms() {}

export async function fetchFindRooms(): Promise<FindResponse<Room>> {
  try {
    const res = await fetch(ROOM_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: ApiResponse<Room> = await res.json();
    const { data } = result;

    return data;
  } catch (error) {
    throw error;
  }
}
