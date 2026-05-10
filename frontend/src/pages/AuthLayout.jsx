import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export const AuthLayout = ({ title, subtitle, children }) => (
  <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
    <section className="hidden min-h-screen flex-col justify-between overflow-hidden p-10 lg:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-bold">TRAVELOOP</p>
          <p className="text-xs text-slate-400">AI travel planning</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">Odoo Hackathon MVP</p>
        <h1 className="text-6xl font-semibold leading-none tracking-normal text-white">
          Multi-city travel planning with startup-grade flow.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
          Build trips, shape budgets, map the route, and let AI turn scattered ideas into a polished itinerary.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {["AI itinerary", "Budget view", "Public sharing"].map((item) => (
          <div key={item} className="glass rounded-lg p-4 text-sm text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </section>

    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md rounded-lg p-6"
      >
        <div className="mb-7">
          <p className="text-sm text-cyan-200">TRAVELOOP</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </section>
  </div>
);
