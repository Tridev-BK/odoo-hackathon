import { motion } from "framer-motion";
import { ImagePlus, Loader2, PlaneTakeoff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import { tripService } from "../services/tripService.js";

const toIsoDate = (value) => new Date(`${value}T00:00:00.000Z`).toISOString();

export const CreateTripPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    coverImageUrl: ""
  });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await tripService.create({
        name: form.name,
        description: form.description || null,
        startDate: toIsoDate(form.startDate),
        endDate: toIsoDate(form.endDate),
        coverImageUrl: form.coverImageUrl || null
      });
      toast.success("Trip created");
      navigate("/trips");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create trip");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <Badge>Trip setup</Badge>
        <h1 className="text-4xl font-semibold tracking-normal">Create a trip that is ready to become an itinerary.</h1>
        <p className="text-slate-400">
          Phase 1 captures the high-level trip. Phase 2 attaches cities, activities, budgets, and day-by-day structure.
        </p>
        <div className="glass rounded-lg p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
              <PlaneTakeoff className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Architected for expansion</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Trips already connect to stops, activities, packing items, notes, and sharing fields in the database.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <Card>
        <CardHeader>
          <CardTitle>Trip details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="name">Trip name</Label>
              <Input id="name" name="name" placeholder="Tokyo design sprint" value={form.name} onChange={update} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="What is the vibe, goal, or story of this trip?"
                value={form.description}
                onChange={update}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start date</Label>
                <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={update} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End date</Label>
                <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={update} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">Cover image URL</Label>
              <div className="relative">
                <ImagePlus className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <Input
                  id="coverImageUrl"
                  name="coverImageUrl"
                  className="pl-9"
                  placeholder="https://images.unsplash.com/..."
                  value={form.coverImageUrl}
                  onChange={update}
                />
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlaneTakeoff className="h-4 w-4" />}
              {isSubmitting ? "Creating trip..." : "Create trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
