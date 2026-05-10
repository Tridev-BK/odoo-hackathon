import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { authService } from "../services/authService.js";
import { AuthLayout } from "./AuthLayout.jsx";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await authService.forgotPassword({ email });
      toast.success(result.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to request reset");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Reset password" subtitle="Request a secure password reset link. Email delivery can be wired during deployment.">
      <form className="space-y-4" onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>
      <Link className="mt-5 block text-sm font-medium text-cyan-200 hover:text-cyan-100" to="/login">
        Back to sign in
      </Link>
    </AuthLayout>
  );
};
