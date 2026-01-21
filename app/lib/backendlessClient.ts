import axios from "axios";
import { useAuth } from "~/components/stores/useAuth";

const BASE_URL = `https://api.backendless.com/${import.meta.env.VITE_BACKENDLESS_APP_ID}/${import.meta.env.VITE_BACKENDLESS_REST_KEY}`;

export const backendlessClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// auto attach user-token
backendlessClient.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers["user-token"] = token;
  }
  return config;
});
