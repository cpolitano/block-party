
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
			}
		})
	}
}

export const analyzeMentions = () => {
	return (dispatch, getState) => {
		const mentions = getState().mentions.mentions;

		fetch(`/api/mentions`, {
			credentials: "same-origin",
			"Content-Type": "application/json",
			method: "POST",
			body: mentions
		})
		.then((res) => res.json())
		.then((responseData) => {
			if (responseData.success) {
				console.log(responseData);
			}
		})
	}
}
