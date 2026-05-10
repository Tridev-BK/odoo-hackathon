import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { useAuthStore } from "../context/authStore.js";

export const ProtectedRoute = () => {
  const { token, isBootstrapping } = useAuthStore();

  if (isBootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};
