import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { useAuthStore } from "../context/authStore.js";
import { authService } from "../services/authService.js";
import { AuthLayout } from "./AuthLayout.jsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const auth = await authService.login(form);
      setAuth(auth);
      toast.success("Welcome back");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue planning trips that feel calm, complete, and ready to share.">
      <form className="space-y-4" onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-xs font-medium text-cyan-200 hover:text-cyan-100" to="/forgot-password">
              Forgot?
            </Link>
          </div>
          <Input id="password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={update} required />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <span>New here?</span>
        <Link className="font-medium text-cyan-200 hover:text-cyan-100" to="/signup">
          Create account
        </Link>
      </div>
    </AuthLayout>
  );
};
