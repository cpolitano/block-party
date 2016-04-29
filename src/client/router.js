import { Router, IndexRoute, Route } from "react-router";

import { 
	App,
	Welcome,
	Mentions
} from "./components";

const router = (
	<Router>
		<Route path="/" component={ App }>
			<IndexRoute path="" component={ Mentions } />
		</Route>
	</Router>
);

export default router;