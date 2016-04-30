import { connect } from "react-redux";
import { Component } from "react";
import {
	getMentions
} from "../../actions/async/mentions"
require("./mentions.less");

class Mentions extends Component {

	renderTweets(tweet) {
		const tweetUrl = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;

		return (
			<li key={tweet.id}>
				<span className="mentions-user">{tweet.user.screen_name}</span>
				{tweet.text}<br/>
				<a href={tweetUrl} target="_blank">{tweet.created_at}</a>
			</li>
		)
	}

	render() {

		return (
			<div className="mentions">
				<h2>Mentions</h2>
				<div className="mentions-button"
					onClick={this.props.onMentionsClick}>
					Get Mentions
				</div>
				<ul className="mentions-list">
					{this.props.mentions.map(this.renderTweets, this)}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let mentions = state.mentions.mentions || [];

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
