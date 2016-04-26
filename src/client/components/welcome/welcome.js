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
					Sign Up
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)