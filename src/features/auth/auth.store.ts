import { apiClient } from "@/lib/api-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBusiness {
	business_id: string | null;
	business_name: string | null;
}

interface User {
	id: string;
	name: string;
	business: IBusiness;
	email: string;
	token: string;
}

type TLoginResponse = {
	data: User;
};

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,

			login: async (email, password) => {
				try {
					const response = await apiClient.post<TLoginResponse>("/auth/login", {
						email,
						password,
					});
					const userData = response.data?.data;
					set({ user: userData as User, isAuthenticated: true });
					return true;
				} catch (error) {
					return false;
				}
			},

			logout: () => {
				set({ user: null, isAuthenticated: false });
				localStorage.removeItem("auth-storage");
			},

			setUser: (user) => set({ user, isAuthenticated: !!user }),
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);

export default useAuthStore;
