import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { useAuthStore } from "../context/authStore.js";
import { authService } from "../services/authService.js";
import { AuthLayout } from "./AuthLayout.jsx";

export const SignupPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const auth = await authService.signup(form);
      setAuth(auth);
      toast.success("Account created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start with Phase 1 foundations, then add AI, budgets, maps, and sharing.">
      <form className="space-y-4" onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" value={form.name} onChange={update} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" minLength={8} autoComplete="new-password" value={form.password} onChange={update} required />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </form>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <span>Already have an account?</span>
        <Link className="font-medium text-cyan-200 hover:text-cyan-100" to="/login">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};
