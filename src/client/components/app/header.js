import React from "react"
require("./header.less");

export default function Header(props) {

	return (
		<header className="header">
			<div className="header-group">
				<div className="header-link"
					onClick={props.onLogInClick}>
					Log In
				</div>
				<div className="header-link"
					onClick={props.onSignUpClick}>
					Sign Up
				</div>
				<div className="header-link"
					onClick={props.onLogOutClick}>
					Log Out
				</div>
			</div>
		</header>
	)
}