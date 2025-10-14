import { apiFetch } from "./baseAPI";

export async function fetchRooms() {
  try {
    return await apiFetch("/api/rooms");
  } catch (err) {
    console.log(err.message);
  }
}

export async function createRooms(data) {
  try {
    return await apiFetch("/api/rooms", {
      method: "POST",
      body: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}
