import { prisma } from "../config/prisma.js";
import { AppError, notFound } from "../utils/errors.js";

const tripInclude = {
  _count: {
    select: {
      stops: true,
      activities: true,
      packingItems: true,
      notes: true
    }
  }
};

export const listTrips = async (userId) => {
  return prisma.trip.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: tripInclude
  });
};

export const createTrip = async (userId, payload) => {
  if (new Date(payload.endDate) < new Date(payload.startDate)) {
    throw new AppError("End date must be after start date", 422);
  }

  return prisma.trip.create({
    data: {
      userId,
      name: payload.name,
      description: payload.description,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      coverImageUrl: payload.coverImageUrl
    },
    include: tripInclude
  });
};

export const getTrip = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    include: {
      ...tripInclude,
      stops: { orderBy: [{ position: "asc" }, { startDate: "asc" }] },
      activities: { include: { activity: true }, orderBy: { scheduledAt: "asc" } },
      packingItems: { orderBy: [{ isPacked: "asc" }, { createdAt: "desc" }] },
      notes: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!trip) throw notFound("Trip");
  return trip;
};

export const deleteTrip = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({ where: { id: tripId, userId } });
  if (!trip) throw notFound("Trip");

  await prisma.trip.delete({ where: { id: tripId } });
  return { id: tripId };
};
