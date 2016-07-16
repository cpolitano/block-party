import { connect } from "react-redux";
import { Component } from "react";
import Header from "./header";
require("./app.less");

class App extends Component {

	componentWillMount() {
		this.props.onMount();
	}

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
		user: state.user.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onMount: () => {
			dispatch({
				type: "FETCH_USER"
			})
		},
		toMentions: () => {
			dispatch({
				type: "CLICK_MENTIONS"
			})
		},
		toBlocks: () => {
			dispatch({
				type: "CLICK_BLOCKS"
			})
		},
		onLogOutClick: () => {
			// log out
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)