import { apiFetch } from "./baseAPI";

export async function fetchSubjects() {
  try {
    return await apiFetch("/api/subjects");
  } catch (err) {
    console.log(err.message);
  }
}

export async function createSubjects(data) {
  try {
    return await apiFetch("/api/subjects", {
      method: "POST",
      body: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}
