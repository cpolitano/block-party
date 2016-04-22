import { Router, IndexRoute, Route } from "react-router";

import { 
	App,
	Welcome
} from "./components";

const router = (
	<Router>
		<Route path="/" component={ App }>
			<IndexRoute path="" component={ Welcome } />
		</Route>
	</Router>
);

export default router;