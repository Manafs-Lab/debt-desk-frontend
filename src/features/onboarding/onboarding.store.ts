import { create } from "zustand";

interface FormState {
	step: number;
	businessName: string;
	businessType: string;
	businessAddress: string;
	userName: string;
	email: string;
	userPhone: string;
	userAddress: string;
	password: string;
	confirmPassword: string;
	setField: (
		field: keyof Omit<
			FormState,
			"step" | "nextStep" | "prevStep" | "reset" | "setFields"
		>,
		value: string,
	) => void;
	setFields: (
		fields: Partial<
			Omit<
				FormState,
				"step" | "nextStep" | "prevStep" | "reset" | "setField" | "setFields"
			>
		>,
	) => void;
	nextStep: () => void;
	prevStep: () => void;
	reset: () => void;
}

export const useFormStore = create<FormState>((set) => ({
	step: 1,
	businessName: "",
	businessType: "",
	businessAddress: "",
	userName: "",
	email: "",
	userPhone: "",
	userAddress: "",
	password: "",
	confirmPassword: "",

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

	nextStep: () =>
		set((state) => ({
			step: state.step < 3 ? state.step + 1 : state.step,
		})),

	prevStep: () =>
		set((state) => ({
			step: state.step > 1 ? state.step - 1 : state.step,
		})),

	reset: () =>
		set({
			step: 1,
			businessName: "",
			businessType: "",
			email: "",
			businessAddress: "",
			userName: "",
			userPhone: "",
			userAddress: "",
			password: "",
			confirmPassword: "",
		}),
}));
