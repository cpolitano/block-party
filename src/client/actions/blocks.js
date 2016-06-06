export const loadBlocks = (state, action) => {
	return {
		blocks: action.blocks,
		recentlyFetched: true
	}
}
