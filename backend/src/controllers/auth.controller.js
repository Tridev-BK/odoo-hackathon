import * as authService from "../services/auth.service.js";
import { ok, created } from "../utils/apiResponse.js";

export const signup = async (req, res, next) => {
  try {
    const auth = await authService.signup(req.body);
    return created(res, auth, "Welcome to TRAVELOOP");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const auth = await authService.login(req.body);
    return ok(res, auth, "Login successful");
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  return ok(res, req.user);
};

export const forgotPassword = async (req, res) => {
  return ok(
    res,
    { email: req.body.email },
    "If an account exists for this email, password reset instructions will be sent."
  );
};
