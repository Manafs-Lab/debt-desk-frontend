export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const LOGIN_ROUTE = "/auth/login";

export const messages = {
	delete: {
		confirm: (item: string) => `Are you sure you want to delete this ${item}?`,
		notification: {
			success: (item: string) => `${item} deleted successfully`,
			error: (item: string) => `Failed to delete ${item}`,
		},
	},
};
