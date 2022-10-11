import type { ApiResponse, FindResponse } from "src/lib/models/api/Response.interface";
import type { Room } from "src/lib/models/room/Room.interface";
import { InitSocket } from "src/lib/utils/socket";

const API_URL = "http://192.168.0.16:8080";
const ROOM_URL = `${API_URL}/api/room`;
const WS_ROOM_URL = `ws://192.168.0.16:8080/ws/room`;

export interface CreateRoomRes {
  code: string;
  title: string;
}

export async function fetchCreateRoom(room: Room): Promise<ApiResponse<CreateRoomRes>> {
  try {
    const res = await fetch(ROOM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function fetchFindRooms(): Promise<FindResponse<Room>> {
  try {
    const res = await fetch(ROOM_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: ApiResponse<FindResponse<Room>> = await res.json();
    const { data } = result;

    return data;
  } catch (error) {
    throw error;
  }
}

export function fetchJoinRoom(room_code: string, username: string, password: string): WebSocket {
  try {
    const socket = InitSocket(
      `${WS_ROOM_URL}?room_code=${room_code}&username=${username}&password=${password}`
    );

    return socket;
  } catch (error) {
    console.error("Error", error);
  }
}
