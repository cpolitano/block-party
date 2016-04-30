import { connect } from "react-redux";
import { Component } from "react";
import {
	getMentions
} from "../../actions/async/mentions"
require("./mentions.less");

class Mentions extends Component {

	renderTweets(tweet) {

		return (
			<li>
				{tweet.user.screen_name}<br/>
				{tweet.text}<br/>
				{tweet.created_at}
			</li>
		)
	}

	render() {
		console.log("props", this.props);

		return (
			<div className="mentions">
				<h2>Mentions</h2>
				<div className="mentions-button"
					onClick={this.props.onMentionsClick}>
					Get Mentions
				</div>
				<ul>
					{this.props.mentions.map(this.renderTweets, this)}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let mentions = state.mentions.mentions || [];
	console.log("state", state);

	return {
		mentions
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onMentionsClick: () => {
			dispatch(getMentions("blockdotparty"))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mentions)
