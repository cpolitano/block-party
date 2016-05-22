export const fetchUser = () => {
	const user = window.__USER__;
	return {
		user: user
	}
}
