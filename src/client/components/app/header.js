import React from "react"
require("./header.less");

export default function Header(props) {

	return (
		<header className="header">
			<div className="header-group">
				<a href="/auth/twitter" className="header-link">
					Log In
				</a>
			</div>
		</header>
	)
}