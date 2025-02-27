import PrivateRoute from "@/components/layouts/private-route";
import { LOGIN_ROUTE } from "@/config/constant";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ConfigurationScheme from "./routes/configuration/scheme";
import Dashboard from "./routes/dashboard";
import Landing from "./routes/landing";
import LoginPage from "./routes/login";
import NotFoundRoute from "./routes/not-found";
import OnboardingForm from "./routes/onboarding";
import Signup from "./routes/signup";

const AppRouter = () => {
	return (
		<WouterRouter>
			<Switch>
				<Route path="/" component={Landing} />
				<Route path={LOGIN_ROUTE} component={LoginPage} />
				<Route path="/auth/signup" component={Signup} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute
					path="/configuration/schemes"
					component={ConfigurationScheme}
				/>
				<Route path="/business/verify" component={OnboardingForm} />
				<Route path="*" component={NotFoundRoute} />
			</Switch>
		</WouterRouter>
	);
};

export default AppRouter;
