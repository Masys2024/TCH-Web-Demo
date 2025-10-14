import { apiFetch } from "./baseAPI";

export async function fetchSchedules() {
  try {
    return await apiFetch("/api/lecture_schedules");
  } catch (err) {
    console.log(err.message);
  }
}

export async function createSchedules(data) {
  try {
    return await apiFetch("/api/lecture_schedules", {
      method: "POST",
      body: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}
