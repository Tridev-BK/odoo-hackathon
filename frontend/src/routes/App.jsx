import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell.jsx";
import { useAuthStore } from "../context/authStore.js";
import { CreateTripPage } from "../pages/CreateTripPage.jsx";
import { DashboardPage } from "../pages/DashboardPage.jsx";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { MyTripsPage } from "../pages/MyTripsPage.jsx";
import { SignupPage } from "../pages/SignupPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

const App = () => {
  const bootstrap = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/trips/new" element={<CreateTripPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
