
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

export const unblock = (screen_name) => {
	return (dispatch) => {
		fetch(`/api/blocks`, {
			credentials: "same-origin",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({screen_name: screen_name})
		})
		.then((res) => res.json())
		.then((responseData) => {
			if (responseData.success) {
				dispatch({
					type: "UPDATE_BLOCKS",
					screen_name: screen_name
				});
			}
		})
	}
}