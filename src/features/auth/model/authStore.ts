import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout, register } from "../api/authService";
import { User } from "../types";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    register: (data: {
        name: string;
        email: string;
        password: string;
        phone: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthstore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await login({ email, password });
                    console.log("user fetched", user)
                    set({ user });
                } catch (error: any) {
                    set({
                        error: error?.response?.data?.message || "Login failed",
                    });
                }
                finally {
                    set({ isLoading: false });
                }
            },

            register: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await register(data);
                    set({ user });
                } catch (error: any) {
                    set({
                        error: error?.response?.data?.message || "Registration failed",
                    });
                } finally {
                    set({ isLoading: false });
                }
            },

            logout: async () => {
                set({ isLoading: true });
                await logout();
                set({ user: null, isLoading: false });
            },
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => AsyncStorage), // ✅ this wraps AsyncStorage properly
            partialize: (state) => ({ user: state.user }),
        }
    )
);
