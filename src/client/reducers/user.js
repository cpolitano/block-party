import * as actions from "../actions/user"

const initialState = {
	user: ""
};

const actionsMap = {
	"FETCH_USER": actions.fetchUser
};

export default function placeholder (state = initialState, action) {
	const fn = actionsMap[action.type];
	if (!fn) return state;
	return Object.assign({}, state, fn(state, action));
}