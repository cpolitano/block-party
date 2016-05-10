import { connect } from "react-redux";
import { Component } from "react";
import Header from "./header";
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
		onLogOutClick: () => {
			// log out
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)