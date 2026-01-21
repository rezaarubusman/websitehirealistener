import axios from "axios";
import { useAuth } from "~/components/stores/useAuth";

export const axiosInstance = axios.create({
  baseURL: `https://api.backendless.com/${import.meta.env.VITE_BACKENDLESS_APP_ID}/${import.meta.env.VITE_BACKENDLESS_REST_KEY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers["user-token"] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuth.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);