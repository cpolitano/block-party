import { browserHistory } from "react-router";

export const signup = (state, action) => {
	browserHistory.push("/");
}

export const login = (state, action) => {
	browserHistory.push("/auth/twitter");
}

export const logout = (state, action) => {
	browserHistory.push("/");
}

export const toMentions = (state, action) => {
	browserHistory.push("/mentions");
}

export const toBlocks = (state, action) => {
	browserHistory.push("/blocks");
}