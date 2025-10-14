import { apiFetch } from "./baseAPI";

export async function fetchBatches() {
  try {
    const data = await apiFetch("/api/batches");
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function createBatches(data) {
  try {
    return await apiFetch("/api/batches", {
      method: "POST",
      body: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}
