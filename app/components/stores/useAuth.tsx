import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  objectId: string;
  email: string;
  name?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (data: any) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (data) => {
        set({
          user: {
            objectId: data.objectId,
            email: data.email,
            name: data.name,
          },
          token: data["user-token"],
        });

        localStorage.setItem("user-token", data["user-token"]);
      },

      logout: () => {
        localStorage.removeItem("user-token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
