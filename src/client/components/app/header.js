import React from "react"
require("./header.less");

export default function Header(props) {

	let Login = (
		<a href="/auth/twitter" className="header-link">
			Log In
		</a>
	);

	if ( props.user !== "" ) {
		Login = (
			<a href=`http://twitter.com/${props.user}` className="header-link">
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