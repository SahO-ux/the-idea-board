import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:4000`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Generic wrappers
export const getIdeas = async (url = "/api/ideas", config = {}) => {
  const res = await api.get(url, config);
  return res.data;
};

export const post = async (url, data = {}, config = {}) => {
  const res = await api.post(url, data, config);
  return res.data;
};

export default api;
