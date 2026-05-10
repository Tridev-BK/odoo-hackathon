import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/errors.js";
import { signToken } from "../utils/jwt.js";

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true
};

const serializeAuth = (user) => ({
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  },
  token: signToken({ sub: user.id, role: user.role })
});

export const signup = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { ...publicUserSelect, passwordHash: true }
  });

  return serializeAuth(user);
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  return serializeAuth(user);
};
