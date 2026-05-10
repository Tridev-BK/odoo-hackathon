import { motion } from "framer-motion";
import { ArrowUpRight, CalendarPlus, MapPinned, Sparkles, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { useAuthStore } from "../context/authStore.js";
import { useTrips } from "../hooks/useTrips.js";

const destinations = [
  { city: "Kyoto", tag: "Culture", score: "96" },
  { city: "Lisbon", tag: "Budget", score: "91" },
  { city: "Bali", tag: "Wellness", score: "89" }
];

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const { trips, isLoading } = useTrips();
  const upcoming = trips.slice(0, 3);

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-panel backdrop-blur-xl"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Badge>Phase 1 live</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Welcome back, {user?.name?.split(" ")[0] || "traveler"}.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Turn a messy trip idea into a structured itinerary with stops, budgets, packing, notes, maps, and AI planning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/trips/new">
                <CalendarPlus className="h-4 w-4" />
                Create trip
              </Link>
            </Button>
            <Button variant="secondary">
              <Sparkles className="h-4 w-4" />
              AI draft soon
            </Button>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPinned className="h-4 w-4 text-cyan-200" />
              Active trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{trips.length}</p>
            <p className="mt-1 text-sm text-slate-400">Ready for itinerary building</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <WalletCards className="h-4 w-4 text-purple-200" />
              Budget status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">$0</p>
            <p className="mt-1 text-sm text-slate-400">Budget modules arrive in Phase 2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              AI readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">Next</p>
            <p className="mt-1 text-sm text-slate-400">Structured itinerary generation contract is planned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent trips</CardTitle>
            <Link className="inline-flex items-center gap-1 text-sm text-cyan-200" to="/trips">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </>
            ) : upcoming.length ? (
              upcoming.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-semibold">{trip.name}</p>
                    <p className="text-sm text-slate-400">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                  </div>
                  <Badge>{trip._count?.stops || 0} stops</Badge>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-slate-400">
                No trips yet. Start with a flagship itinerary.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {destinations.map((item) => (
              <div key={item.city} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <div>
                  <p className="font-medium">{item.city}</p>
                  <p className="text-xs text-slate-400">{item.tag}</p>
                </div>
                <span className="text-sm text-cyan-200">{item.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
