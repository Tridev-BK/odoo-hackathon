import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { tripService } from "../services/tripService.js";

export const useTrips = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await tripService.list();
      setTrips(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load trips");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeTrip = async (tripId) => {
    const previous = trips;
    setTrips((current) => current.filter((trip) => trip.id !== tripId));
    try {
      await tripService.remove(tripId);
      toast.success("Trip deleted");
    } catch (error) {
      setTrips(previous);
      toast.error(error.response?.data?.message || "Unable to delete trip");
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { trips, isLoading, refresh, removeTrip };
};
