import { connect } from "react-redux";
import { Component } from "react";
import {
	getMentions
} from "../../actions/async/mentions"

class Mentions extends Component {

	render() {

		return (
			<div className="mentions">
				<h2>Mentions</h2>
				<div className="mentions-button"
					onClick={this.props.onMentionsClick}>
					Get Mentions
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
		onMentionsClick: () => {
			dispatch(getMentions())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mentions)
