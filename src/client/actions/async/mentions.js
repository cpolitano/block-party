
export const getMentions = () => {
	return (dispatch) => {
		fetch(`/api/mentions`, {
			credentials: "same-origin",
			"Content-Type": "application/json",
		})
		.then((res) => res.json())
		.then((responseData) => {
			if (responseData.success) {
				dispatch({
					type: "LOAD_MENTIONS",
					mentions: responseData.tweets
				});

				if (responseData.tweets.length > 0) {
					dispatch(analyzeMentions(responseData.tweets));
				}
			}
		})
	}
}

export const analyzeMentions = (mentions) => {
	return (dispatch) => {
		fetch(`/api/mentions`, {
			credentials: "same-origin",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify(mentions)
		})
		.then((res) => res.json())
		.then((responseData) => {
			if (responseData.success) {
				if (responseData.blocks.length > 0) {
					dispatch({
						type: "ADD_RECENT_BLOCKS",
						recentlyBlocked: responseData.blocks
					});
				}
				// if new blocks, remove tweets from mentions
				// save removed tweets somewhere
			}
		})
	}
}
