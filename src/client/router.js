import { Router, IndexRoute, Route, browserHistory } from "react-router";

import { 
	App,
	Welcome,
	Mentions,
	Blocks
} from "./components";

const router = (
	<Router history={ browserHistory }>
		<Route path="/" component={ App }>
			<IndexRoute component={ Welcome } />
			<Route path="mentions" component={ Mentions }></Route>
			<Route path="blocks" component={ Blocks }></Route>
		</Route>
	</Router>
);

export default router;