import * as actions from "../actions/blocks";

const initialState = {
	blocks: [],
	recentlyFetched: false
}

const actionsMap = {
	"LOAD_BLOCKS": actions.loadBlocks
}

export default function (state = initialState, action) {
	const fn = actionsMap[action.type];
	if (!fn) return state;
	const newState = Object.assign({}, state, fn(state, action))
	return newState
}
