import { LOGIN_ROUTE } from "@/config/constant";
import { Route, Switch, Router as WouterRouter } from "wouter";
import Landing from "./routes/landing";
import LoginPage from "./routes/login";
import Signup from "./routes/signup";

const AppRouter = () => {
	return (
		<WouterRouter>
			<Switch>
				<Route path="/" component={Landing} />
				<Route path={LOGIN_ROUTE} component={LoginPage} />
				<Route path="/auth/signup" component={Signup} />
			</Switch>
		</WouterRouter>
	);
};

export default AppRouter;
