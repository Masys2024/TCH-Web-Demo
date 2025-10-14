import { apiFetch } from "./baseAPI";

export async function fetchBranches() {
  try {
    return await apiFetch("/api/branches");
  } catch (err) {
    console.log(err);
  }
}

export async function createBranches(data) {
  try {
    return await apiFetch("/api/branches", {
      method: "POST",
      body: data,
    });
  } catch (err) {
    console.log(err);
  }
}
