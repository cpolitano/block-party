import React from "react"
require("./header.less");

export default function Header(props) {

	let Login = (
		<a href="/auth/twitter" className="header-link">
			Log In
		</a>
	);

	if ( props.user !== "" ) {
		let twitterLink = "http:\/\/twitter.com\/" + props.user;
		Login = (
			<a href={twitterLink} className="header-link">
				Logged in as {props.user}
			</a>
		);
	}

	return (
		<header className="header">
			<div className="header-group">
				{Login}
			</div>
		</header>
	)
}