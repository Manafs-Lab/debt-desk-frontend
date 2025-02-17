import PublicLayout from "@/components/layouts/public-layout";
import OnboardingMultiStepForm from "@/features/onboarding/components/onboarding-form";

const OnboardingForm = () => {
	return (
		<PublicLayout>
			<div className="d-flex justify-content-center align-items-center h-100">
				<OnboardingMultiStepForm />
			</div>
		</PublicLayout>
	);
};

export default OnboardingForm;
