import * as actions from "../actions/router"

const initialState = {
	mention_id: null,
	block_id: null
};

const actionsMap = {
	"CLICK_SIGNUP": actions.signup,
	"CLICK_LOGIN": actions.login,
	"CLICK_LOGOUT": actions.logout,
	"CLICK_MENTIONS": actions.toMentions,
	"CLICK_BLOCKS": actions.toBlocks
};

export default function placeholder (state = initialState, action) {
	const fn = actionsMap[action.type];
	if (!fn) return state;
	return Object.assign({}, state, fn(state, action));
}