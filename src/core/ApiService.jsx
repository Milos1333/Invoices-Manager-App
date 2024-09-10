// src/core/ApiService.jsx

const BASE_URL = "http://localhost:3000";

// GET method to fetch data from a specific endpoint
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// POST method to send data to a specific endpoint
export const postData = async (endpoint, payload) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to post data");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

// Default export for general purpose fetch
export default fetchData;
