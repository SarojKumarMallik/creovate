import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.VITE_API_URL?.startsWith('http') ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : '');

const API = axios.create({
  baseURL: API_URL,
});

/* ================= IMAGE URL HELPER ================= */
export const getImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BASE_URL}${cleanPath}`;
};

export default API;