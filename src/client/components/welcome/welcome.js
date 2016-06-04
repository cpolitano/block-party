import { connect } from "react-redux";
import { Component } from "react";
require("./welcome.less");

class Welcome extends Component {

	render() {

		return (
			<div className="welcome">
				<h1 className="welcome-header">block party</h1>
				<h2 className="welcome-subheader">Let's make Twitter fun again!</h2> 
      			<h3 className="welcome-subheader">We auto-block the jerks so you can focus on the important stuff.</h3>
				<div className="welcome-button">
					<a href="/auth/twitter" className="welcome-link">log in with Twitter</a>
				</div>
				<div className="welcome-button">tell me more</div>
			</div>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		// 
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onMentionsClick: () => {
			dispatch({
				type: "CLICK_MENTIONS"
			})
		},
		onBlocksClick: () => {
			dispatch({
				type: "CLICK_BLOCKS"
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)