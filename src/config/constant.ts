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
	create: {
		notification: {
			success: (item: string) => `${item} created successfully`,
			error: (item: string) => `Failed to create ${item}`,
		},
	},
	update: {
		notification: {
			success: (item: string) => `${item} updated successfully`,
			error: (item: string) => `Failed to update ${item}`,
		},
	},
};

export const schemeOptions = {
	schemeTypes: [
		{ value: "loan", label: "Loan" },
		{ value: "savings", label: "Savings" },
	],
	entryTypes: [
		{ value: "daily", label: "Daily" },
		{ value: "weekly", label: "Weekly" },
		{ value: "monthly", label: "Monthly" },
	],
};
