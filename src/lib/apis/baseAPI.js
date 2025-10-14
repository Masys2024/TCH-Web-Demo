import { API_BASE_URL } from "@/constants/urls";

const defaultHeaders = {
  "Content-Type": "application/json",
};

/**
 * Fetch wrapper
 * @param {string} endpoint - API endpoint (e.g., '/users')
 * @param {Object} options - Fetch options (method, body, headers)
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    // Try to parse JSON response
    const data = await response.json().catch(() => null);
    if (data?.returncode !== 200) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log("API fetch error:", error);
    throw error;
  }
}
