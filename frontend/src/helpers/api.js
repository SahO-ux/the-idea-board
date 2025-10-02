import axios from "axios";

const getApiBaseUrl = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    `${window.location.protocol}//${window.location.hostname}:4000`;
  return API_BASE_URL;
};

// Generic wrappers
export const getIdeas = async (url = "/api/ideas", config = {}) => {
  const res = await axios.get(getApiBaseUrl() + url, {
    headers: { "Content-Type": "application/json" },
    ...config,
  });
  return res.data;
};

export const post = async (url = "", data = {}, config = {}) => {
  const res = await axios.post(getApiBaseUrl() + url, data, {
    headers: { "Content-Type": "application/json" },
    ...config,
  });
  return res.data;
};
