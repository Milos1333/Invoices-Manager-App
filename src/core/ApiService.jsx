const ApiService = async () => {
  try {
    const response = await fetch(
      "https://run.mocky.io/v3/53723b67-57fc-4472-8d41-fd82d3a95641"
    );
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

export default ApiService;
