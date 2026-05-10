import { Router } from "express";
import { z } from "zod";
import * as authController from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(80),
    email: z.string().email().toLowerCase(),
    password: z.string().min(8).max(72)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(8).max(72)
  })
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase()
  })
});

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.get("/me", requireAuth, authController.me);

export default router;
