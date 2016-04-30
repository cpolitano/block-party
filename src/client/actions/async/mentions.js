
export const getMentions = (screen_name) => {
	return (dispatch) => {
		fetch(`/api/mentions/${screen_name}`, {
			credentials: "same-origin"
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
