import { API_BASE_URL, LOGIN_ROUTE } from "@/config/constant";
import useAuthStore from "@/features/auth/auth.store";
import axios from "axios";

export const publicApiClient = axios.create({
	baseURL: API_BASE_URL,
});

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
			return Promise.reject({
				...new Error(),
				message: error.response.data?.message,
				redirect: LOGIN_ROUTE,
			});
		}
		return Promise.reject(error);
	},
);
