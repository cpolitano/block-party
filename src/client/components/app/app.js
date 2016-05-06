import { connect } from "react-redux";
import { Component } from "react";
import Header from "./header";
import {
	login
} from "../../actions/async/router"
require("./app.less");

class App extends Component {
	render() {

		return (
			<div className="app-container">
				<Header
					{...this.props}/>
				<div>
					{this.props.children}
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
		onLogInClick: () => {
			dispatch(login())
		},
		onSignUpClick: () => {
			// sign up
		},
		onLogOutClick: () => {
			// log out
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)