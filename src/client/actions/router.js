import { browserHistory } from "react-router";

export const signup = (state, action) => {
	browserHistory.push("/");
}

export const login = (state, action) => {
	browserHistory.push("/");
}

export const logout = (state, action) => {
	browserHistory.push("/");
}

export const toMentions = (state, action) => {
	browserHistory.push("/mentions");
}