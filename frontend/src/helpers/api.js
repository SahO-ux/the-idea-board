import axios from "axios";

const getApiBaseUrl = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    `${window.location.protocol}//${window.location.hostname}:4000`;
  return API_BASE_URL;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
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
