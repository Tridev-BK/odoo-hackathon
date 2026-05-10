import { motion } from "framer-motion";
import { CalendarDays, Map, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { useTrips } from "../hooks/useTrips.js";

const fallbackImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
];

export const MyTripsPage = () => {
  const { trips, isLoading, removeTrip } = useTrips();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge>Trip library</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">My Trips</h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Manage every upcoming route, from quick weekend loops to multi-city product retreats.
          </p>
        </div>
        <Button asChild>
          <Link to="/trips/new">
            <Plus className="h-4 w-4" />
            New trip
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      ) : trips.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip, index) => (
            <motion.article
              key={trip.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-44">
                  <img
                    alt={trip.name}
                    className="h-full w-full object-cover"
                    src={trip.coverImageUrl || fallbackImages[index % fallbackImages.length]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <Badge className="absolute left-4 top-4">{trip._count?.stops || 0} stops</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{trip.name}</CardTitle>
                  <p className="line-clamp-2 text-sm leading-6 text-slate-400">{trip.description || "No description yet."}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CalendarDays className="h-4 w-4 text-cyan-200" />
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="secondary">
                      <Map className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="danger" onClick={() => removeTrip(trip.id)} aria-label={`Delete ${trip.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
              <Map className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold">Create your first loop</h2>
            <p className="mt-2 max-w-md text-slate-400">
              Add a trip now, then expand it into cities, activities, budgets, packing, and AI recommendations.
            </p>
            <Button asChild className="mt-6">
              <Link to="/trips/new">
                <Plus className="h-4 w-4" />
                Create trip
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
