import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService.js";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isBootstrapping: true,
      setAuth: ({ user, token }) => set({ user, token }),
      logout: () => set({ user: null, token: null, isBootstrapping: false }),
      bootstrap: async () => {
        const token = get().token;
        if (!token) {
          set({ isBootstrapping: false });
          return;
        }

        try {
          const user = await authService.me();
          set({ user, isBootstrapping: false });
        } catch {
          set({ user: null, token: null, isBootstrapping: false });
        }
      }
    }),
    {
      name: "traveloop-auth",
      partialize: (state) => ({ user: state.user, token: state.token })
    }
  )
);
