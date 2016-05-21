
export const getBlocks = () => {
	return (dispatch) => {
		fetch(`/api/blocks`, {
			credentials: "same-origin"
		})
		.then((res) => res.json())
		.then((responseData) => {
			if (responseData.success) {
				dispatch({
					type: "LOAD_BLOCKS",
					blocks: responseData.blocks
				});
			}
		})
	}
}
