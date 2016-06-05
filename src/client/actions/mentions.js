export const loadMentions = (state, action) => {
	return {
		mentions: action.mentions,
		recentlyFetched: true
	}
}

export const addRecentBlocks = (state, action) => {
	return {
		recentlyBlocked: action.recentlyBlocked
	}
}
