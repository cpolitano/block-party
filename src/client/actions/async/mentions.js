
export const getMentions = () => {
	return (dispatch) => {
		fetch(`/api/mentions`, {
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
