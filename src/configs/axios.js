import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Bắt lỗi API toàn cục
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Lỗi từ API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
