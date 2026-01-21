// src/lib/authService.ts
import { backendlessClient } from "./backendlessClient";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await backendlessClient.post("/users/register", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await backendlessClient.post("/users/login", data);
  return res.data;
};

export const logoutUser = async () => {
  await backendlessClient.get("/users/logout");
};