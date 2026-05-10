import { apiClient } from "./apiClient.js";

export const authService = {
  async signup(payload) {
    const { data } = await apiClient.post("/auth/signup", payload);
    return data.data;
  },
  async login(payload) {
    const { data } = await apiClient.post("/auth/login", payload);
    return data.data;
  },
  async me() {
    const { data } = await apiClient.get("/auth/me");
    return data.data;
  },
  async forgotPassword(payload) {
    const { data } = await apiClient.post("/auth/forgot-password", payload);
    return data;
  }
};
