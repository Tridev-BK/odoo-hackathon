import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      throw new AppError("Authentication token required", 401);
    }

    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    if (!user) {
      throw new AppError("User account no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new AppError("Invalid or expired token", 401));
  }
};
