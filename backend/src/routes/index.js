import { Router } from "express";
import authRoutes from "./auth.routes.js";
import tripRoutes from "./trip.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ data: { status: "ok", service: "traveloop-api" } });
});

router.use("/auth", authRoutes);
router.use("/trips", tripRoutes);

export default router;
