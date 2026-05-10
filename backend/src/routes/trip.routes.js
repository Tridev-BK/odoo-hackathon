import { Router } from "express";
import { z } from "zod";
import * as tripController from "../controllers/trip.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

const tripIdParams = z.object({
  tripId: z.string().min(10)
});

const createTripSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120),
    description: z.string().max(800).optional().nullable(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    coverImageUrl: z.string().url().optional().nullable()
  })
});

router.use(requireAuth);
router.get("/", tripController.listTrips);
router.post("/", validate(createTripSchema), tripController.createTrip);
router.get("/:tripId", validate(z.object({ params: tripIdParams })), tripController.getTrip);
router.delete("/:tripId", validate(z.object({ params: tripIdParams })), tripController.deleteTrip);

export default router;
