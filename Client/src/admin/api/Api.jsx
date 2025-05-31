import axios from "axios";

// Optional: Create axios instance with baseURL
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

export const productAllData = async () => {
  try {
    const response = await axiosInstance.get("/product-data");

    if (response.status !== 200) {
      console.warn("Unexpected response status:", response.status);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch product data:", error.message);
    return null; // or return []
  }
};
