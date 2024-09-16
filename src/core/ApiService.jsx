const BASE_URL = "http://localhost:3000";

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

export const putData = async (endpoint, id, payload) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    return null;
  }
};

export const deleteData = async (endpoint, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete data");
    }

    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
};
