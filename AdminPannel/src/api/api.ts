import axios from "axios";

const BASE_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

/* ================= IMAGE URL HELPER ================= */
export const getImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  return `${BASE_URL}/${imagePath}`;
};

export default API;