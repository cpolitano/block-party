export const login = () => {
	return (dispatch) => {
		fetch(`/auth/twitter`, {
			credentials: "same-origin"
		})
		.then((res) => res.json())
		.then((responseData) => {
			console.log(responseData);
		})
	}
}