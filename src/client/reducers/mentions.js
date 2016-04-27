import * as actions from "../actions/mentions";

const initialState = {
	mentions: []
}

const actionsMap = {
	"LOAD_MENTIONS": actions.loadMentions
}

export default function (state = initialState, action) {
	const fn = actionsMap[action.type];
	if (!fn) return state;
	const newState = Object.assign({}, state, fn(state, action))
	return newState
}
