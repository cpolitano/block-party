export const loadBlocks = (state, action) => {
	return {
		blocks: action.blocks,
		recentlyFetched: true
	}
}

export const updateBlocks = (state, action) => {
	let remainingBlocks = state.blocks.filter((block) => {
		return block.screen_name !== action.screen_name
	});

	return {
		blocks: remainingBlocks
	}
}
