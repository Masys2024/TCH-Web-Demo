import { apiFetch } from "./baseAPI";

export async function fetchStandards() {
  try {
    return await apiFetch("/api/standards");
  } catch (err) {
    console.log(err.message);
  }
}

export async function createStandards(data) {
  try {
    return await apiFetch("/api/standards", {
      method: "POST",
      body: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}
