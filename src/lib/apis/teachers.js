import { apiFetch } from "./baseAPI";

export async function fetchTeachers() {
  try {
    return await apiFetch("/api/teachers");
  } catch (err) {
    console.log(err.message);
  }
}

export async function createTeachers(userData) {
  try {
    return await apiFetch("/api/teachers", {
      method: "POST",
      body: userData,
    });
  } catch (err) {
    console.log(err.message);
  }
}
