import * as tripService from "../services/trip.service.js";
import { created, ok } from "../utils/apiResponse.js";

export const listTrips = async (req, res, next) => {
  try {
    const trips = await tripService.listTrips(req.user.id);
    return ok(res, trips);
  } catch (error) {
    next(error);
  }
};

export const createTrip = async (req, res, next) => {
  try {
    const trip = await tripService.createTrip(req.user.id, req.body);
    return created(res, trip, "Trip created");
  } catch (error) {
    next(error);
  }
};

export const getTrip = async (req, res, next) => {
  try {
    const trip = await tripService.getTrip(req.user.id, req.params.tripId);
    return ok(res, trip);
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const result = await tripService.deleteTrip(req.user.id, req.params.tripId);
    return ok(res, result, "Trip deleted");
  } catch (error) {
    next(error);
  }
};
