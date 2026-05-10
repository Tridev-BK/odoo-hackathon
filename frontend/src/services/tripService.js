import { apiClient } from "./apiClient.js";

export const tripService = {
  async list() {
    const { data } = await apiClient.get("/trips");
    return data.data;
  },
  async create(payload) {
    const { data } = await apiClient.post("/trips", payload);
    return data.data;
  },
  async remove(tripId) {
    const { data } = await apiClient.delete(`/trips/${tripId}`);
    return data.data;
  }
};
