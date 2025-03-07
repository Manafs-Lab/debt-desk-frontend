import { create } from "zustand";

interface ISchemeFormState {
	name: string;
	schemeType: string;
	entryType: string;
	description: string;
	setField: (
		field: keyof Omit<ISchemeFormState, "setFields" | "reset">,
		value: string,
	) => void;
	setFields: (
		fields: Partial<Omit<ISchemeFormState, "setField" | "reset">>,
	) => void;
	reset: () => void;
}

export const useSchemeFormStore = create<ISchemeFormState>((set) => ({
	name: "",
	schemeType: "",
	entryType: "",
	description: "",

	setField: (field, value) =>
		set((state) => ({
			...state,
			[field]: value,
		})),

	setFields: (fields) =>
		set((state) => ({
			...state,
			...fields,
		})),
	reset: () =>
		set({
			name: "",
			schemeType: "",
			entryType: "",
			description: "",
		}),
}));
