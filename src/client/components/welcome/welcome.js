import { connect } from "react-redux";
import { Component } from "react";
require("./welcome.less");

class Welcome extends Component {

	render() {

		return (
			<div className="welcome">
				<h1>welcome to the block party</h1>
				<div className="welcome-button"
					onClick={this.props.onSignUpClick}>
					sign up
				</div>
				<div className="welcome-button"
					onClick={this.props.onMentionsClick}>
					go to mentions
				</div>
				<div className="welcome-button"
					onClick={this.props.onBlocksClick}>
					go to blocks
				</div>
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
		onSignUpClick: () => {
			// sign up
		},
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