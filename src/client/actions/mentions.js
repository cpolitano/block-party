export const loadMentions = (state, action) => {
	return {
		mentions: action.mentions,
		recentlyFetched: true
	}
}

export const addRecentBlocks = (state, action) => {
	let safeMentions = state.mentions.filter((mention) => {
		return action.recentlyBlocked.indexOf(mention.user.screen_name) < 0
	});

	return {
		recentlyBlocked: action.recentlyBlocked,
		mentions: safeMentions
	}
}
